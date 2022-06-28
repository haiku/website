+++
type = "blog"
title = "[GSoC 2022] ARM port and device tree support Phase 1"
author = "Zhihong Niu"
date = "2022-06-24"
tags = ["haiku", "software", "gsoc2022", "arm", "device driver"]

+++


In the first stage of work, the following content was completed:

1. Compile and run arm haiku on osx
2. Fixed some runtime errors

The following will show how to compile haiku on osx and run it on qemu (my version: hrev56168)


# Build and run Haiku on OSX (Intel)

## Preparation

在开始前，由于 osx 默认的 apfs 文件系统不区分大小小写，所以首先得新建一块大小写敏感的 volume。
Before starting, since the default file system(APFS) is not case-sensitive, you must first create a case-sensitive volume.

1. Open Disk Utility.app and press partition

![volume_1](.2022-06-24_%5Bgsoc_2022%5D_arm_port_and_device_tree_support_phase_1.assets/volume_1.png)

2. Add an new partition

    ![volume_2](.2022-06-24_%5Bgsoc_2022%5D_arm_port_and_device_tree_support_phase_1.assets/volume_2.png)

    Click `Add Partition` in the pop-up selection

    ![volume_3](.2022-06-24_%5Bgsoc_2022%5D_arm_port_and_device_tree_support_phase_1.assets/volume_3.png)
Set the name, format, size. Note that a case-sensitive format needs to be selected, case-sensitive APFS is used here, and the partition size is at least 15GB.
    
    ![volume_4](.2022-06-24_%5Bgsoc_2022%5D_arm_port_and_device_tree_support_phase_1.assets/volume_4.png)

    after setting, click `Apply` to start partitioning.

3. Wait for the partition to complete

    Once the partition is complete, this partition can be find at `/Volumes/haiku/`, where **all work happens**.

## Get the source code

### Configure git and review.haiku

Basically you can refer to https://www.haiku-os.org/guides/building/get-source-git to get the source code, here I briefly describe the steps.

1. First of all, you should have [git](https://git-scm.com/download/mac) installed on your computer, and make sure that these two values have been set correctly `user.name` and `user.email` , if not, you can set it like this

    ```shell
    git config --global user.name "yourname"
    git config --global user.email "youremail"
    ````

    Also need to set `core.precomposeunicode` to true

    ```shell
    git config core.precomposeunicode true
    ````

2. haiku is not hosted directly using [github](https://github.com), you need to use your github account to login at https://review.haiku-os.org/, remember your username, It will be used in later steps.

### Get code

The code is divided into two parts: buildtools and haiku, the former is haiku's customized compilation tools, including gcc and build tool jam; the latter is haiku's source code,

```shell
# get buildtools
git clone "ssh://<login>@git.haiku-os.org/buildtools" && scp -p <login>@git.haiku-os.org:hooks/commit-msg "buildtools/.git/hooks/ "
# get haiku
git clone "ssh://<login>@git.haiku-os.org/haiku"
# install commit tool
scp -p <login>@git.haiku-os.org:hooks/commit-msg "haiku/.git/hooks/"
````

Replace \<login\> with your username, for example, my username is `MRNIU`, then the command should be written like this

```shell
# get buildtools
git clone "ssh://MRNIU@git.haiku-os.org/buildtools" && scp -p MRNIU@git.haiku-os.org:hooks/commit-msg "buildtools/.git/hooks/"
# get haiku
git clone "ssh://MRNIU@git.haiku-os.org/haiku"
# install commit tool
scp -p MRNIU@git.haiku-os.org:hooks/commit-msg "haiku/.git/hooks/"
````

Before compiling, there are a few small changes that need to be made

PS: At the time of writing this is using hrev56168, some issues may have been fixed with the latest code.

1. gcc/gcc/config/host-darwin.c

    Add the macro on the last line

    ```c
    #if defined(__aarch64__)
    const struct host_hooks host_hooks = HOST_HOOKS_INITIALIZER;
    #endif
    ```

2. src/system/kernel/device_manager/device_manager.cpp

    add #L1732 _AddPath(*stack, "busses/virtio");

    Add virtio bus to search path

With the above preparations in place, we can start compiling.

### Compile

Install dependencies

```shell
brew install autoconf zstd xorriso gawk wget nasm less mpfr gmp libmpc bison libffi
```

Install the build tool jam

```shell
cd /Volumes/haiku/buildtools/jam
make
sudo ./jam0 install
```

First compile the toolchain

```shell
cd haiku
mkdir generated.arm
cd generated.arm
../configure -j8 --cross-tools-source ../../buildtools --build-cross-tools arm
```

After compiling, execute `jam -v` to see the following output

```shell
> jam -v
Jam 2.5-haiku-20211029. OS=MACOSX. Copyright 1993-2002 Christopher Seiwald.
```

Next compile the haiku image that can run on qemu

```shell
jam -j8 -q @minimum-mmc
```

### Run

After the compilation is completed, it is ready to run. We use u-boot to boot, and u-boot.bin can be found [here](https://github.com/haiku/firmware/tree/master/u-boot/arm/qemu), copy it to the `generated.arm` directory.

We use [qemu](https://www.qemu.org) for simulation, but note that we are using version 6.0.0.

Use brew to install version 6.0.0 of qemu:

```shell
curl https://raw.githubusercontent.com/Homebrew/homebrew-core/b1268a3ecd418df8f7360c46ce3ee62a0599a1be/Formula/qemu.rb > /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core/Formula/qemu.rb
brew install qemu
```

Everything is up and running!

```shell
> qemu-system-arm -bios u-boot.bin -M virt -cpu cortex-a15 -m 2048 \
    -device virtio-blk-device,drive=x0,bus=virtio-mmio-bus.0 \
    -drive file="haiku-mmc.image",if=none,format=raw,id=x0 \
    -device ramfb -usb -device qemu-xhci,id=xhci -device usb-mouse -device usb-kbd -serial stdio
```

# Problems and solutions

## buildtools

Encountered when first compiling buildtools for arm

```shell
> ../configure -j8 --cross-tools-source ../../buildtools --build-cross-tools arm

...

/Volumes/haiku/buildtools/gcc/gcc/config/host-darwin.c:83:25: error: variable has incomplete type 'const struct host_hooks'
const struct host_hooks host_hooks = HOST_HOOKS_INITIALIZER;
                        ^
/Volumes/haiku/buildtools/gcc/gcc/config/host-darwin.c:83:14: note: forward declaration of 'host_hooks'
const struct host_hooks host_hooks = HOST_HOOKS_INITIALIZER;
             ^
/Volumes/haiku/buildtools/gcc/gcc/config/host-darwin.c:83:38: error: use of undeclared identifier 'HOST_HOOKS_INITIALIZER'
const struct host_hooks host_hooks = HOST_HOOKS_INITIALIZER;
                                     ^
1 warning and 2 errors generated.
make[2]: *** [host-darwin.o] Error 1
make[2]: *** Waiting for unfinished jobs....
1 warning generated.
140 warnings generated.
25 warnings generated.
25 warnings generated.
110 warnings generated.
25 warnings generated.
434 warnings generated.
rm gcc.pod
make[1]: *** [all-gcc] Error 2
make: *** [all] Error 2
ERROR: Building gcc failed.
```

Solution: https://review.haiku-os.org/c/buildtools/+/5302

## KDiskDeviceManager::InitialDeviceScan() returned error

```shell
> qemu-system-arm -bios u-boot.bin -M virt -cpu cortex-a15 -m 2048 \
    -device virtio-blk-device,drive=x0,bus=virtio-mmio-bus.0 \
    -drive file="haiku-mmc.image",if=none,format=raw,id=x0 \
    -device ramfb -usb -device qemu-xhci,id=xhci -device usb-mouse -device usb-kbd -serial stdio

...

get_boot_partitions(): boot volume message:
KMessage: buffer: 0x8240ad40 (size/capacity: 255/255), flags: 0xa
  field: "partition offset"  (LLNG): 54520832 (0x33fec00)
  field: "packaged"          (BOOL): true
  field: "boot method"       (LONG): 0 (0x0)
  field: "disk identifier"   (RAWT): data at 0x8240adf0, 79 bytes
get_boot_partitions(): boot method type: 0
intel: ep_std_ops(0x1)
intel: ep_std_ops(0x2)
intel: pm_std_ops(0x1)
intel: pm_std_ops(0x2)
dos_std_ops()
dos_std_ops()
module: Search for bus_managers/pci/x86/v1 failed.
ahci: failed to get pci x86 module
module: Search for bus_managers/pci/x86/v1 failed.
ahci: failed to get pci x86 module
module: Search for bus_managers/pci/x86/v1 failed.
ahci: failed to get pci x86 module
  name: Generic
KDiskDeviceManager::InitialDeviceScan() returned error: No such file or directory
PANIC: did not find any boot partitions!
Welcome to Kernel Debugging Land...
Thread 14 "main2" running on CPU 0
frame            caller     <image>:function + offset
 0 801bd9d0 (+2145658416) 801ba870   <kernel_arm>  (nearest) + 0x00
initial commands:  syslog | tail 15
get_boot_partitions(): boot method type: 0
intel: ep_std_ops(0x1)
intel: ep_std_ops(0x2)
intel: pm_std_ops(0x1)
intel: pm_std_ops(0x2)
dos_std_ops()
dos_std_ops()
module: Search for bus_managers/pci/x86/v1 failed.
ahci: failed to get pci x86 module
module: Search for bus_managers/pci/x86/v1 failed.
ahci: failed to get pci x86 module
module: Search for bus_managers/pci/x86/v1 failed.
ahci: failed to get pci x86 module
  name: Generic
KDiskDeviceManager::InitialDeviceScan() returned error: No such file or directory
kdebug>
```

Solution:

```shell
diff --git a/src/system/kernel/device_manager/device_manager.cpp b/src/system/kernel/device_manager/device_manager.cpp
index ffc539a23b..882590ae39 100644
--- a/src/system/kernel/device_manager/device_manager.cpp
+++ b/src/system/kernel/device_manager/device_manager.cpp
@@ -1731,6 +1731,7 @@ device_node::_GetNextDriverPath(void*& cookie, KPath& _path)
                                        _AddPath(*stack, "drivers", sGenericContextPath);
                                        _AddPath(*stack, "busses/i2c");
                                        _AddPath(*stack, "busses/scsi");
+                                       _AddPath(*stack, "busses/virtio");
                                        _AddPath(*stack, "busses/random");
                                        _AddPath(*stack, "bus_managers/pci");
                                }
```

## Data Abort

If you are using a later version of qemu, a Data Abort may appear:

```shell
> qemu-system-arm -bios u-boot.bin -M virt -cpu cortex-a15 -m 2048 \
    -device virtio-blk-device,drive=x0,bus=virtio-mmio-bus.0 \
    -drive file="haiku-mmc.image",if=none,format=raw,id=x0 \
    -device ramfb -usb -device qemu-xhci,id=xhci -device usb-mouse -device usb-kbd -serial stdio

...


Identified boot partition by partition offset.
bfs: mounted "Haiku" (root node at 131072, device = /dev/disk/virtual/virtio_block/0/1)
Mounted boot partition: /dev/disk/virtual/virtio_block/0/1
unknown [0:    14] Adding packages from "/boot/system/packages"
unknown [0:    14] Failed to open packages activation file: No such file or directory
unknown [0:    14] Loading packages from activation file failed. Loading all packages in packages directory.
Exception: Data Abort
R00=00010015 R01=00000000 R02=0000ffff R03=00000032
R04=80df4049 R05=00000f85 R06=00000003 R07=00000f9d
R08=80b961c0 R09=80006003 R10=80007029 R11=8244680e
R12=801bde94 SP=824467e8 LR=8224bba4  PC=82265304 CPSR=a0000053
FAR: 80df4051, isWrite: 1, thread: main2
```

Solution: use qemu 6.0.0.

DFSR: 0x600001d3 (b0110...1 1101 0011) when `Exception: Data Abort` occurs, which means an Access flag fault error occurred while reading. See: [armv7-dfsr](https://developer.arm.com/documentation/ddi0211/k/system-control-coprocessor/system-control-coprocessor-register-descriptions/c5--data-fault-status-register --dfsr).
