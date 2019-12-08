+++
type = "article"
title = "Emulating Haiku in Xen"
date = "2019-12-7"
tags = []
+++

Virtual instances of operating systems are perfect for all kinds of testing purposes that need to be done in a safe and isolated environment. Installing Haiku in a virtual machine is a solution for people who do not want to install it on their physical computers but want to become familiar with it.

In this guide, the Haiku operating system is being run under virtual circumstances using Ubuntu Linux, Xen and Virt-Manager. but you can use any distribution of Linux that supports Xen.

This tutorial, for demonstration purposes, uses an Anyboot image. It can be obtained [here](/get-haiku). Both the ISO and Anyboot images are available there. Verify the checksums to make sure the downloaded files are not corrupted.

##### Go to section

* [Installing Xen](#part_xen)
* [Installing and running Haiku from an Anyboot image](#part_iso)
* [Additional steps](#part_additional)
* [Troubleshooting](#part_trouble)

### Installing Xen <a name="part_xen"></a>

#### Ubuntu Linux

If you are using Ubuntu Linux (18.04 and below), you can enter the following commands in order to set up Xen and virt-manager:

```sh
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install xen-hypervisor xen-utils virt-manager libvirt-bin bridge-utils
```

However, if you are using a more recent version of Ubuntu (18.10 or up), then you will have to use this command instead as `libvirt-bin` has been replaced:

```sh
sudo apt-get update && sudo apt-get upgrade
sudo apt-get xen-hypervisor xen-utils libvirt-daemon-system libvirt-clients virt-manager
```

Do not forget to enable the `libvirtd` daemon, as it is not enabled by default.

```sh
sudo systemctl enable libvirtd
```

Your machine should now boot into Xen by default. If it doesn't, reboot your machine and access GRUB. make sure to select the Xen kernel in your boot menu. To boot into Xen, choose `Ubuntu GNU/Linux, with Xen hypervisor`

You can find more Ubuntu Linux-specific information regarding Xen in [Ubuntu's official documentation](https://help.ubuntu.com/community/Xen).

#### Arch Linux

As Xen is not currently officially available in the official repositories, you will have to use the [Arch User Repository (AUR)](https://aur.archlinux.org/) in order to install Xen.

Of course, you can use an [AUR helper](https://wiki.archlinux.org/index.php/AUR_helpers) in order to install the `xen` package. However, the most universal way of installing Xen in Arch Linux would be the following:

```sh
pacman -Syu
git clone https://aur.archlinux.org/xen.git
makepkg -csi
pacman -S bridge-utils
```

Alternatively, you may want to [compile Xen from source.](https://wiki.xenproject.org/wiki/Compiling_Xen_From_Source)

Moreover, you will have to install either the `seabios` package and/or the `ovmf` package, depending on whether you want to boot your virtual machine in BIOS or UEFI mode respectively. It should be added that Haiku does [support UEFI booting](https://www.haiku-os.org/guides/uefi_booting/).

```sh
# you're not obligated to run both of these commands!
pacman -S seabios
pacman -S ovmf
```

Lastly, you will have to enable the `libvirtd` daemon, as it is not enabled by default.

```sh
sudo systemctl enable libvirtd
```

Reboot your machine and make sure to select the Xen kernel in your boot menu. To boot into Xen, choose `Arch Linux, with Xen hypervisor`.

You may also want to consult Arch Linux's [wiki](https://wiki.archlinux.org/index.php/Xen).

#### Fedora

If you're using Fedora, the commands you will need to run the following commands:

```sh
yum update
yum install xen virt-manager
```

Also, make sure to enable the `libvirtd` daemon, which is not enabled by default.

```sh
sudo systemctl enable libvirtd
```

To boot into Xen on Fedora's boot menu, choose `Fedora, with Xen hypervisor`. Consulting the [Xen wiki](https://wiki.xen.org/wiki/Fedora_Host_Installation) is generally a good idea.

### Installing and running Haiku from an Anyboot image <a name="part_iso"></a>

The following guide will describe the installation of Haiku on Virtual Machine, using an Anyboot image as an ISO.
Once Xen is running and the Anyboot image is downloaded, you can start the installation.

First, create a new virtual machine.

![](/files/guides/virtualizing/xen/virt_manager.png)

Then, choose the method of OS installation, which is **`Local install media`** in this case and click **`Forward`**

![](/files/guides/virtualizing/xen/create_machine.png)

Choose `Use ISO image`, and browse to the image you downloaded. Then, click **`Forward`**

![](/files/guides/virtualizing/xen/select_media.png)

Here is where you adjust the memory and CPU settings. It is best to assign more than 256M of RAM for smoother performance; too little may cause lag. After choosing the memory size and CPU, click **`Forward`**

![](/files/guides/virtualizing/xen/memory_cpu.png)

Here, we can adjust the size of the disk image, or existing disk images. After making any necessary changes, click **`Forward`**

![](/files/guides/virtualizing/xen/hard_disk.png)

Name the virtual machine, verify the settings of the VM, then click **`Finish`**

![](/files/guides/virtualizing/xen/confirm_create.png)

After clicking **`Finish`**, the VM will boot to the Haiku image. You can choose to install Haiku or boot to the desktop. Follow the guides [on this page](/get-haiku/installation-guide) if you are not familiar with installing Haiku.

### Additional steps <a name="part_additional"></a>

#### Networking

By default, this VM does not have networking. To create a virtual network, you can follow the steps below. If you want to create a bridged network instead, consult your distribution's documentation.

First, on the virt-manager window, choose `Edit` > `Connection Details`. The Connection Details window will appear. Click on the Add button in the lower left corner to add a virtual network.

![](/files/guides/virtualizing/xen/virtual_network_1.png)

Name the virtual network that will be created.

![](/files/guides/virtualizing/xen/net_name.png)

Here, you can customize the network address range. If you are fine with the default settings, simply click **`Forward`**

![](/files/guides/virtualizing/xen/ip_range.png)

If you want to enable the IPv6 address range, you can customize it here. Otherwise, just click **`Forward`**

![](/files/guides/virtualizing/xen/ipv6.png)

Here, you can forward the network packets of the VM to a physical network, or keep the virtual network isolated. If you need Internet connection on the VM, you should forward to a physical network connected to the Internet. When you are done, click **`Finish`**

![](/files/guides/virtualizing/xen/connect_physical.png)

The virtual network will then be created. Now, close the Connection Details window.

On the virt-manager window, right-click on the Haiku VM, and choose **`Open`**. Then, click on the button with the light-bulb icon to switch to the VM configuration tab.

![](/files/guides/virtualizing/xen/vm_settings.png)

If there's no NIC hardware in the VM, click the **`Add Hardware`**, then choose **`Network`**

After that, go to the **`NIC`** hardware on the VM, then choose the network source to be the virtual network.

![](/files/guides/virtualizing/xen/vm_settings_net.png)

Now the VM should have a network connection.

### Troubleshooting <a name="part_trouble"></a>

##### Unable to connect to libvirt.

- Ensure that the libvirt daemon is running by issuing ```sudo systemctl enable --now libvirtd```
- Make sure that you are a member of the `libvirtd` group by running ```sudo usermod -a -G libvirtd $(whoami)```

##### Unable to connect to libvirt xen:///.

- Ensure that you are using a Xen host kernel. If you are using [GRUB](https://www.gnu.org/software/grub/) and the kernel does not appear, try running `update-grub` in your terminal.
