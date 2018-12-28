+++
type = "article"
title = "Emulating Haiku in Xen"
date = "2017-12-08"
tags = []
+++

Virtual instances of operating systems are perfect for all kinds of testing purposes that need to be done in a safe and isolated environment. Installing Haiku in a virtual machine is a solution for people who do not want to install it on their physical computers, but wish to become familiar with it.

In this guide the Haiku operating system is being run under virtual circumstances using Fedora 27, Xen 4.9.1, and Virt-Manager, but you can use any distribution of Linux that is supported by Xen as dom0.

In this guide, we will be using an Anyboot image - it can be obtained [here](/get-haiku).  Both the ISO and anyboot images are available there, do select the closest mirror to enjoy higher transfer rates. Verify using the checksums to make sure that the downloaded files are not corrupted as they are big files.

##### Go to section

* [Installing Xen](#part_xen)
* [Installing and running Haiku from an Anyboot image](#part_iso)
* [Additional steps](#part_additional)
* [Troubleshooting](#part_trouble)

### Installing Xen <a name="part_xen"></a>

For instructions on installing Xen on other distributions, the Xen wiki has links to installation documentations which can be found [here](//wiki.xen.org/wiki/Category:Host_Install)

On Fedora 16 and above, you can enter the following into the terminal to install Xen and virt-manager (replace yum with dnf for Fedora 22 or newer)

```sh
yum install xen
yum install libvirt-daemon-driver-xen libvirt-daemon-config-network libvirt-daemon-driver-network virt-manager virt-viewer
```

The libvirtd daemon is by default not running, enable it on startup with

```sh
sudo systemctl enable libvirtd
```

To boot into Xen, on Fedora's boot menu choose `Fedora, with Xen hypervisor`.

### Installing and running Haiku from an Anyboot image <a name="part_iso"></a>

The following guide will describe the installation of Haiku on Virtual Machine, using an Anyboot image as an ISO.
Once Xen is running and the Anyboot image is downloaded, you can start the installation.

First, create a new virtual machine.

![](/files/guides/virtualizing/xen/virt_manager.png)

First, choose the method of OS installation, which is **`Local install media`** in this case and click **`Forward`**.

![](/files/guides/virtualizing/xen/create_machine.png)

Choose `Use ISO image`, and browse to the Anyboot image we have downloaded. Then, click **`Forward`**.

![](/files/guides/virtualizing/xen/select_media.png)

Here, we're supposed to choose memory and CPU settings. It is better to assign more than 256M of RAM for smooth running ; too much, on the other hand, may cause a lag for the host. After choosing the memory size and CPU, click **`Forward`**.

![](/files/guides/virtualizing/xen/memory_cpu.png)

Here, we can adjust the size of the disk image, or existing disk images. After adjusting, click **`Forward`**

![](/files/guides/virtualizing/xen/hard_disk.png)

Name the virtual machine, verify the settings of the VM, then click **`Finish`**

![](/files/guides/virtualizing/xen/confirm_create.png)

After clicking **`Finish`**, the VM will start and boot to the Haiku image. You can choose to install Haiku or boot to the desktop. Installation is simple and does not differ really from a physical one (follow the guides [on this page](/get-haiku/installation-guide) if you are not familiar with installing Haiku).

### Additional steps <a name="part_additional"></a>

#### Additional step 1. Creating a virtual network

The VM we created by default does not have networking. To create a virtual network, you can follow the steps below. If you want to create a bridged network instead, consult your distribution's documentation.

First, on the virt-manager window choose `Edit` > `Connection Details`. The Connection Details window will appear. Click on the Add button in the lower left corner to add a virtual network.

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

If there's no NIC hardware in the VM, click the **`Add Hardware`**, then choose **`Network`**.

After that, go to the **`NIC`** hardware on the VM, then choose the network source to be the virtual network we have created.

![](/files/guides/virtualizing/xen/vm_settings_net.png)

Now the VM should have a network connection.

### Troubleshooting <a name="part_trouble"></a>

##### Unable to connect to Libvirt

If, after running Virt-manager, you run into a pop-up saying that it is unable to connect to libvirt, then:

1. Make sure the libvirtd daemon is running by issuing ```sudo systemctl start libvirtd```

2. Make sure you are a member of the 'libvirtd' group by running:
```sh
sudo usermod -a -G libvirtd $(whoami)
```
