+++
type = "article"
title = "Virtualizing Haiku in VirtualBox "
date = "2011-03-12T16:46:57.000Z"
tags = []
+++

For Google Code In 2017, Jakub Pajdowski created a [video on how to install Haiku in VirtualBox](http://haiku-files.org/files/media/GCI-2017_VirtualBox_Jakub-Pajdowski.mp4) [6 MiB].

Virtual instances of operating systems are perfect for all kinds of testing purposes that need to be done in a safe and isolated environment. Installing Haiku in a virtual machine is a solution for people who do not want to install it on their physical computers, but wish to become familiar with it.

This How-To guide will describe the process of running Haiku on virtual machine (VM) using VirtualBox 3.2 There are two ways it can be done– one is installing and running Haiku from CD-ROM image, which is similar to a physical instance. Ror convenience and time-saving purposes, the user may also use the already prepared VM hard disk image. The decision is left up to the user, although many people prefer VM image as it is easier to manage.

For this tutorial we will be using an ISO image file - it can be obtained [here](/get-haiku). The VirtualBox virtualization software and installation manual can be downloaded from [here](http://www.virtualbox.org/wiki/Downloads).

##### Go to section:

*   [Installing and running Haiku from an ISO image](#part_iso)
*   [Additional Steps](#part_additional)
*   [Custom VESA Resolutions](#part_customVESA)
*   [Troubleshooting](#part_trouble)

### Installing and running Haiku from an ISO image. <a name="part_iso"></a>

The following guide will describe installation of Haiku with an ISO image on VirtualBox.

##### Step 1. Creating a virtual machine.

After installing VirtualBox and downloading an ISO image, we can begin the installation process. Installing operating systems in VirtualBox consists of two parts - create a virtual machine and then configure it to run the desired guest system installation.

We begin, by clicking the icon **`New`** (or pressing <kbd>Ctrl</kbd> + <kbd>N</kbd>):

![](/files/guides/virtualizing/virtualbox/vbox_1.png)

We need to specify what kind of guest operating system we are going to install. This is helpful in the pre-configuration of virtual machines – it applies default settings for supported OS’s. For Haiku, we are going to choose "*Other*" for operating system type and "*Other/Unknown*" for version:

![](/files/guides/virtualizing/virtualbox/vbox_2.png)

The next step is to define how much of the host’s physical memory we want to allocate for our virtual machine. This decision should be based on the amount of RAM the host has, but it is recommended to spend a minimum of 256MB of RAM to make it run smoothly. More memory can increase the performance of the VM, but too much can slow down the host, so there needs to be a balance between the VM and host machine resources:

![](/files/guides/virtualizing/virtualbox/vbox_3.png)

After we have done that, we need to create a hard disk image, which is going to be stored on the physical drive, at the specified location. We choose *Create a virtual harddrive now* (if it is not selected already) and click **`Create`**:

![](/files/guides/virtualizing/virtualbox/vbox_4.png)

Choose VDI and click **`Next`**.

![](/files/guides/virtualizing/virtualbox/vbox_5.png)

Here we can define how big the virtual hard disk should be. In most cases it is sufficient to use the default option, which is *Dynamically allocated*. This will allow the image file to grow as more content is saved in it, with no lack in functionality:

The next slide will ask us for the location of the hard disk image file and the maximum size of the dynamically expanding file. Input the values and click **`Create`**:

![](/files/guides/virtualizing/virtualbox/vbox_7.png)

##### Step 2. Configuring the virtual machine.

Now we need to configure our new virtual machine:

First, click on the Settings icon that appeared for our virtual machine.

![](/files/guides/virtualizing/virtualbox/vbox_8.png)

The settings window allows the user to configure the hardware aspects of the virtual machine that the guest OS will be using.  First of all, we need to attach our ISO image with the Haiku installation to the virtual machine in the form of emulated CD-ROM drive. To do that, we choose *Storage* from the left panel, and then click on *Empty* in the *Storage Tree*. Then we click on the CD icon next to the CD/DVD Device drop-down list:

![](/files/guides/virtualizing/virtualbox/vbox_9.png)

Now we click on *Choose a virtual CD/DVD disk file...*. In the new window we point to the location where we stored our Haiku ISO image and then click **`Open`** to confirm. Here is what we will see after that:

![](/files/guides/virtualizing/virtualbox/vbox_10.png)

After you are done with configuring, click **`OK`** to go back to the main window.

##### Step 3. Installing Haiku

Hopefully, at this point everything is properly configured and we can run the Haiku installation. To do so, click the Start Icon (or Machine -> Start) to run the virtual machine. After a few seconds Haiku's GUI should appear.

The installation itself is quite simple and does not differ really from a physical one (follow the guides [on this page](/get-haiku/installation-guide) if you are not familiar with installing Haiku).

DriveSetup should detect two devices, one is our CD-ROM (ISO) file and another is the “harddrive” we created earlier. All we need to do is select that drive, go to *Partitions -> Format*, click on *Be File System* and continue the initialization. Then you use Installer from the Deskbar's appliction menu to install from the CD image to the big virtual harddrive.

![](/files/guides/virtualizing/virtualbox/image11_0.png)

And that’s it! Power off and go back to the "Storage" Settings. To prevent booting the ISO image at every bootup, select the ISO image, click on the CD icon to the right and choose *Remove Attachment* :
 
![](/files/guides/virtualizing/virtualbox/vbox_11.png)
 
### Additional steps <a name="part_additional"></a>

##### Additional Step 1. Configuring the virtual machine.

There are a few settings that could be changed to improve performance of Haiku. Remember that you need to divide resources responsibly, depending on your host specification.

We begin by clicking on the Settings icon.

![](/files/guides/virtualizing/virtualbox/vbox_12.png)

The settings window allows the user to configure the hardware aspects of the virtual machine guest OS will be using.

One of the ways to increase performance is changing the video memory assigned to the virtual machine. On the left panel click Display tab, and move the first slider to the right, to increase the amount of memory assigned. This should allow the GUI to run more smoothly and be more responsive.

![](/files/guides/virtualizing/virtualbox/vbox_13.png)

By default, mouse integration with the guest is disabled in VirtualBox. However, we can easily enable this convenient feature:

Go to the *System* tab under *Settings* and change *Pointing Device* to *USB Tablet*.

![](/files/guides/virtualizing/virtualbox/vbox_14.png)

After you are done with configuring, click **`OK`** to go back to the main window.

##### Additional Step 2. Adjusting window settings.

One of the inconveniences users experience while using virtual machines is screen resolutions. By default, guest OS’s apply a big screen resolution, causing the windows to have scrolling bars on both sides to navigate in x-axis and y-axis. There are two solutions for that problem.

First solution is simply adjusting the screen resolution using tools built into system. In Haiku we can use the Screen preflet, which can be found under the Preferences menu. By changing the resolution the user will then notice that size of the VM window has now changed.

![](/files/guides/virtualizing/virtualbox/image17.png)

<a name="part_customVESA"></a>
The other way is to resize the guest window through the host. While Virtual Guest Additions are available from HaikuDepot, there is no automatic window resizing support yet. However the user may use custom VESA resoultion as a workaround.

For example, type this in your host system:
```sh
VBoxManage setextradata "VM name" "CustomVideoMode1" "1400x1050x16"
```

### Troubleshooting <a name="part_trouble"></a>

##### 1. Haiku cannot connect to the internet

There are some known issues with the network cards on VirtualBox virtual machines. The symptom is simply the inability to connect to other computers over the Internet. A solution to this problem is as follows:

Go to the settings of Haiku virtual machine (it needs to be shutdown first) and click *Network -> Advanced-> Adapter type -> Intel PRO/1000 MT*.  Accept changes by clicking **`OK`**.

![](/files/guides/virtualizing/virtualbox/vbox_15.png)

Now the network services should be working properly.

##### 2. The VirtualBox Guest Additions are incomplete

The VirtualBox Guest Additions provide drivers for the guest system so it may communicate with the host with simpler protocols. This could be desirable as it will provide additional features such as shared clipboards. However, this is not a necessary component of a VM, and Haiku will run perfectly fine without or only the available limited Guest Additions installed.
