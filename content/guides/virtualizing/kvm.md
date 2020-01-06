+++
type = "article"
title = "Emulating Haiku in KVM"
date = "2019-12-21"
tags = []
+++

For Google Code In 2019, Vrondir created a [video on how to install Haiku in KVM](http://haiku-files.org/files/media/GCI-2019_KVM_Vrondir.mp4) [79 MiB].

Virtual instances of operating systems are perfect for all kinds of testing purposes that need to be done in a safe and isolated environment. Installing Haiku in a virtual machine is a solution for people who do not want to install it on their physical computers, but wish to become familiar with it.

In this guide the Haiku operating system is being run under virtual circumstances using Manjaro Linux, KVM, and Virtual Machine Manager. but you can use any distribution of Linux that supports KVM.

In this guide, we will be using a **nightly** ``anyboot`` image because nightlies contain the latest Haiku changes - it can be obtained [here](https://download.haiku-os.org/). However, to enjoy more stability, the  [official release of Haiku](https://www.haiku-os.org/get-haiku) is recommended.

##### Go to section

* [Installing KVM](#part_kvm)
* [Installing and running Haiku from an anyboot image](#part_iso)
* [Troubleshooting](#part_trouble)

### Installing KVM <a name="part_kvm"></a>

If you are using Arch Linux, you can enter the following into the terminal and set up KVM and virt-manager.

```sh
sudo pacman -S qemu virt-manager
```

If you are using Ubuntu, you can enter the following into the terminal instead and set up KVM and virt-manager:

```sh
sudo apt-get install qemu-kvm libvirt-bin virt-manager
```

As of Ubuntu 18.10, the `libvirt-bin` package has been replaced, so the necessary command is a little different:

```sh
sudo apt-get install qemu-kvm libvirt-daemon-system libvirt-clients virt-manager
```

To enable libvirtd on boot, enter the following command in the terminal:

```sh
sudo systemctl enable libvirtd
```

### Installing and running Haiku from an anyboot image <a name="part_iso"></a>

Once the archive with the anyboot image is downloaded and unpacked, you can start the installation.

First, create a new virtual machine.

![virt_machine_manager2](/files/guides/virtualizing/kvm/virt_machine_manager2.png)

Then, choose the method of OS installation, which is **`Local install media`** in this case and click **`Forward`**.

![step_one](/files/guides/virtualizing/kvm/step_one.png)

Browse to the **``anyboot``** image you have unpacked and select the operating system you are installing. By default, it should automatically detect the OS after you have selected the image. In case it doesn't, just uncheck the **`Automatically detect`** checkbox and just type in the OS name. Then, click **`Forward`**.

![step_two](/files/guides/virtualizing/kvm/step_two.png)

Here, we choose the memory and CPU settings. What you should select here, depends on the system you have. It is better to assign more than 256MiB of RAM for smooth running; too much, on the other hand, may cause a lag for the host. After choosing the memory size and CPU, click **`Forward`**.

![step_three](/files/guides/virtualizing/kvm/step_three.png)

Here, we can adjust the size of the disk image. When done, click **`Forward`**.

![step_four](/files/guides/virtualizing/kvm/step_four.png)

Name the virtual machine, verify the settings of the VM, then click **`Finish`**

![step_five](/files/guides/virtualizing/kvm/step_five.png)

After clicking **`Finish`**, a popup saying `Virtual Network is not active` may appear. Don't worry, it's just asking you to enable the ``'default'`` network. Just click `Yes` and everything should be fine, if not, see the [Troubleshooting section](#part_trouble).
The VM will now start and boot the Haiku image. You can choose to install Haiku or boot to the desktop. Installation is simple and does not differ really from a physical one (follow the guides [on this page](/get-haiku/installation-guide) if you are not familiar with installing Haiku).

### Troubleshooting <a name="part_trouble"></a>

After finishing the installation of your VM, if you run into an error that says **``Unable to complete install: network default is not active``** or something along those lines, make sure that `libvirtd` is running by entering ``sudo systemctl start libvirtd`` in terminal.
If the error still occurs do the following steps:

##### Step 1. Check if you have the network defined by running:

```sh
sudo virsh net-list --all
```

If you got the following output then proceed to Step 2. If you don't and the ``'default'`` network exists, proceed to Step 3.

```sh
Name                 State      Autostart     Persistent
----------------------------------------------------------
```

##### Step 2. Create the ``'default'`` network by copy-pasting the following lines into a file called ``default.xml``, which can be found in the ``libvirt`` directory.

```sh
<network>
  <name>default</name>
  <uuid>9a05da11-e96b-47f3-8253-a3a482e445f5</uuid>
  <forward mode='nat'/>
  <bridge name='virbr0' stp='on' delay='0'/>
  <mac address='52:54:00:0a:cd:21'/>
  <ip address='192.168.122.1' netmask='255.255.255.0'>
    <dhcp>
      <range start='192.168.122.2' end='192.168.122.254'/>
    </dhcp>
  </ip>
</network>
```

Now, to add that network permanently to our KVM host, run the following:

```sh
sudo virsh net-define --file default.xml
```

##### Step 3. To manually start the network, run:

```sh
sudo virsh net-start default
```

To have the network automatically start up in future, run:

```sh
sudo virsh net-autostart --network default
```
