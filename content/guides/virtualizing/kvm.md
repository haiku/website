+++
type = "article"
title = "Emulating Haiku in KVM"
date = "2017-01-25"
tags = []
+++

For Google Code In 2017, Arnav Bhatt created a [video on how to install Haiku in KVM](http://haiku-files.org/files/media/GCI-2017_KVM_Arnav-Bhatt.mkv) [2 MiB].

Virtual instances of operating systems are perfect for all kinds of testing purposes that need to be done in a safe and isolated environment. Installing Haiku in a virtual machine is a solution for people who do not want to install it on their physical computers, but wish to become familiar with it.

In this guide the Haiku operating system is being run under virtual circumstances using Arch Linux, KVM, and Virt-Manager. but you can use any distribution of Linux that supports KVM.

In this guide, we will be using an Anyboot image - it can be obtained [here](/get-haiku).  Both the ISO and anyboot images are available there, do select the closest mirror to enjoy higher transfer rates. Verify using the checksums to make sure that the downloaded files are not corrupted as they are big files.

##### Go to section

* [Installing KVM](#part_kvm)
* [Installing and running Haiku from an Anyboot image](#part_iso)
* [Additional steps](#part_additional)
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

To enable libvirtd on boot, issue the following command into the terminal:
```sh
sudo systemctl enable libvirtd
```

### Installing and running Haiku from an Anyboot image <a name="part_iso"></a>

The following guide will describe the installation of Haiku on KVM, using an Anyboot image as an ISO. Once the Anyboot image is downloaded, you can start the installation.

First, create a new virtual machine.

![](/files/guides/virtualizing/kvm/virt_manager.png)

Then, choose the method of OS installation, which is **`Local install media`** in this case and click **`Forward`**.

![](/files/guides/virtualizing/kvm/create_machine.png)

Choose `Use ISO image`, and browse to the Anyboot image we have downloaded. Then, click **`Forward`**.

![](/files/guides/virtualizing/kvm/select_media.png)

Here, we're supposed to choose memory and CPU settings. It is better to assign more than 256M of RAM for smooth running ; too much, on the other hand, may cause a lag for the host.  After choosing the memory size and CPU, click **`Forward`**.

![](/files/guides/virtualizing/kvm/memory_cpu.png)

Here, we can adjust the size of the disk image, or existing disk images. After adjusting, click **`Forward`**

![](/files/guides/virtualizing/kvm/hard_disk.png)

Name the virtual machine, verify the settings of the VM, then click **`Finish`**

![](/files/guides/virtualizing/kvm/confirm_create.png)

After clicking **`Finish`**, the VM will start and boot to the Haiku image. You can choose to install Haiku or boot to the desktop. Installation is simple and does not differ really from a physical one (follow the guides [on this page](/get-haiku/installation-guide) if you are not familiar with installing Haiku).

### Additional steps <a name="part_additional"></a>

#### Additional step 1. Creating a network

The VM we created by default will be assigned to a default network, which is using NAT. To create another type of virtual network, you can follow the steps below. If you want to create a bridged network instead, consult your distribution's documentation. 

First, on the virt-manager window choose `Edit` > `Connection Details`. The Connection Details window will appear. Click on the Add button in the lower left corner to add a virtual network.

![](/files/guides/virtualizing/kvm/virtual_network_1.png)

Name the virtual network that will be created.

![](/files/guides/virtualizing/kvm/net_name.png)

Here, you can customize the network address range. If you are fine with the default settings, simply click **`Forward`**

![](/files/guides/virtualizing/kvm/ip_range.png)

If you want to enable the IPv6 address range, you can customize it here. Otherwise, just click **`Forward`**

![](/files/guides/virtualizing/kvm/ipv6.png)

Here, you can forward the network packets of the VM to a physical network, or keep the virtual network isolated. If you need Internet connection on the VM, you should forward to a physical network connected to the Internet. When you are done, click **`Finish`**

![](/files/guides/virtualizing/kvm/connect_physical.png)

The virtual network will then be created. Now, close the Connection Details window.

On the virt-manager window, right-click on the Haiku VM, and choose **`Open`**. Then, click on the button with the light-bulb icon to switch to the VM configuration tab.

![](/files/guides/virtualizing/kvm/vm_settings.png)

If there's no NIC hardware in the VM, click the **`Add Hardware`**, then choose **`Network`**.

After that, go to the **`NIC`** hardware on the VM, then choose the network source to be the virtual network we have created.

![](/files/guides/virtualizing/kvm/vm_settings_net.png)

Now the VM should have a network connection.

### Troubleshooting <a name="part_trouble"></a>

##### Unable to connect to Libvirt

If, after running Virt-manager, you run into a pop-up saying that it is unable to connect to libvirt, then:

1. Make sure the libvirtd daemon is running by issuing ```sudo systemctl start libvirtd```

2. Make sure you are a member of the 'libvirt' group by running: 
```sh
sudo usermod -a -G libvirt $(whoami)
```

##### Freezing with the QXL video device

The virtual machine may occasionally hang or freeze during use, and switching the video device to the VGA or VMVGA may solve this.
