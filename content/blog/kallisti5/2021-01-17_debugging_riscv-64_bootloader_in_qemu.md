+++
type = "blog"
title = "Debugging RISCV-64 bootloader in QEMU"
author = "kallisti5"
date = "2021-01-17 09:36:04-06:00"
tags = ["haiku", "software", "riscv64", "qemu"]
+++

Debugging early bootloader code can be extremely difficult. The lack of printf and other classical black-box debugging tools means you're limited to one of the following methods of debugging lockups:

1. Arm chair debugging, Changing code, compiling, booting, repeat.
2. Using GDB or another debugger tool and stepping through code watching outcome.

Obviously #2 above is more ideal than #1.  Welcome to debugging by attaching gdb to qemu!

The steps below really should apply to any architecture. Just replace riscv64 with your architecture of choice.

## Pre-requirements

* All of the Haiku compiling [pre-requisite software](/guides/building/pre-reqs) installed.
* ArchLinux and Fedora offer riscv64 toolchains.
  * I recommend installing them. (ex: riscv64-elf-gdb, riscv64-elf-gcc, riscv64-elf-binutils)

### Compiling Haiku (with debug symbols)

Overall, this is the easier step for most folks with any Haiku development experience.

1. Get the [haiku and buildtools git repos](/guides/building/get-source-git).
2. Compile your toolchain.
   1. ```cd haiku; mkdir generated.riscv64; cd generated.riscv64```
   1. ```../configure -j2 --cross-tools-source ../../buildtools --build-cross-tools riscv64```
3. Enable debugging symbols in bootloader.
   1. Create an empty UserBuildConfig in haiku/build/jam/
   2. Add ```SetConfigVar DEBUG : HAIKU_TOP src system boot : 1 : global ;```
4. Compile haiku for riscv64 ```jam -q @minimum-mmc```

### Install GEF

[GEF](https://github.com/hugsy/gef) is an extension for gdb making it a lot more friendly and will help visualize what's going on.

### Compile u-boot

u-boot is the early loader of choice for RISCV64 and ARM platforms.  You can use Haiku's firmware CI/CD tools to simplify getting and compiling u-boot.

1. Clone Haiku's [firmware repo](https://github.com/haiku/firmware/)
2. Build riscv64 qemu u-boot
   1. ```cd firmware; cd u-boot; ./tools/build riscv64 qemu```

After you have the firmware, we're less interested in the newly generated changes to the firmware repository, and more interested in /tmp/riscv64-build/ which contains all of the u-boot artifacts. (u-boot.bin for qemu, u-boot (elf, debugging sybmols) for GDB)

## Get ready to debug

Now we have all the componenents needed to begin debugging Haiku's bootloader.

### Boot u-boot + Haiku in qemu-system-riscv64

```bash
qemu-system-riscv64 -bios /tmp/riscv64-build/u-boot.bin \
  -M virt -m 4G \
  -drive file=haiku-mmc.image,format=raw,id=hd0 -device virtio-blk-device,drive=hd0 \
  -s -S
```

  * ```-bios ...```
    * The bios is the u-boot bios you compiled
  * ```-M virt```
    * A standardized "qemu riscv64 machine"
  * ```-m 4G```
    * 4 GiB of memory
  * ```-drive```
    * Haiku's disk image (contains our EFI bootloader, and Haiku's filesystem)
  * ```-s```
    * Listen for GDB connections on 127.0.0.1:1234
  * ```-S```
    * Halt boot until GDB says to begin running
  
**At this point, qemu will "wait" for your command to start running.**

### Attach GDB

Now, we attach to qemu from GDB, and start debugging!

*TIP: The hex addresses below could change over time. If you don't get debugging symbols (aka source-code view of what's happening) you'll need to "figure the new addresses out". I've included some basic information on how I got them.*

1. Start gdb for your architecture
   1. ```riscv64-elf-gdb /tmp/riscv64-build/u-boot``` on ArchLinux
2. Connect to qemu
   1. ```target extended-remote 127.0.0.1:1234```
3. Tell gdb where u-boot symbols should be loaded
   1. ```add-symbol-file /tmp/riscv64-build/u-boot 0xfff66000```
   2. This hex value came from booting u-boot, and typing ```bdinfo``` for the "reloc addr"
4. Tell gdb where our EFI bootloader symbols should be loaded
   1. ```add-symbol-file .../generated.riscv64/objects/haiku/riscv64/debug_1/system/boot/efi/boot_loader_efi 0xfe6b0000```
   2. This hex value came from compiling u-boot with full tracing, and looking where u-boot puts our EFI bootloader in memory.
   3. ```EFI: Entry efi_load_image, ..., EFI: efi_add_memory_map_pg: 0xfe6b0000 0x60 1 yes```

These important commands can be placed into a text file, and passed to gdb on every startup via:
  ```
  riscv64-elf-gdb -x (file) /tmp/riscv64-build/u-boot
  ```

## Start debugging!

You'll generally get "one shot" at debugging.
If you hit a hard lockup, you'll likely need to exit gdb, and qemu, and repeat the two sections above.

I've heard there are some "extended-remote" commands allowing you to restart from within gdb, however I haven't figured them out yet :-)

### Breakpoints

You can set a breakpoint to "stop" execution at a fixed function. Since we have u-boot's symbols *AND* Haiku's bootloader symbols you can pass any function from the two.

  * ```break _relocate``` -- Stop when GDB sees Haiku's EFI relocate function getting called.

### Watchpoints

You can set a watchpoint to "stop" when a value is read, written, or matches an expression.

  * ```watch foo``` -- Stop when the program writes to a variable called "foo"
  * ```rwatch foo``` -- Stop when the program reads from a variable called "foo"

### Cleanup

Sometimes you'll want to adjust breakpoints/watchpoints

  * ```info watchpoints``` -- Show all watchpoints
  * ```info breakpoints``` -- Show all breakpoints
  * ```delete``` -- Delete all watchpoints/breakpoints

### Begin Debugging

Now that you have defined some "stuff to do", you can start execution.

  * ```continue``` / ```c```
    * Start qemu running until GDB "stops" based on conditions above, or user presses ```<ctl> + <c>``` in GDB
  * ```<ctl> + <c>```
    * Pause qemu, return control to GDB
  * ```step``` / ```s```
    * Continue until control reaches a different source line, then stop it and return control to GDB

More details on how to use GDB controls can be found in their [online docs](https://sourceware.org/gdb/current/onlinedocs/gdb/Continuing-and-Stepping.html)


Happy Debugging!
