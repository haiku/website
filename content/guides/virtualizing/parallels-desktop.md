+++
type = "article"
title = "Virtualizing Haiku in Parallels Desktop"
date = "2016-12-23T21:36:57.000Z"
tags = []
+++

For Google Code In 2017, Villyam created a [video on how to install Haiku in Parallels Desktop](http://haiku-files.org/files/media/GCI-2017_Parallels-Desktop_Villyam.mkv) [10 MiB].

Virtual instances of operating systems are perfect for all kinds of testing purposes that need to be done in a safe and isolated environment. Installing Haiku in a virtual machine is a solution for people who do not want to install it on their physical computers, but wish to become familiar with it.

This guide will describe the process of running Haiku on a virtual machine (VM) using Parallels Desktop 13. Parallels Desktop is not fully working with Haiku and needs a workaround. Be sure to follow all the steps to run Haiku.

We will using an anyboot image file - it can be obtained [here](/get-haiku). Parallels Desktop is available for free as a 14-day trial or $80 for the full version [on their website](https://www.parallels.com/products/desktop/)

##### Go to section:

* [Running Haiku from an Anyboot image](#part_running)
* [Additional steps](#part_additional)
* [Troubleshooting](#part_trouble)

### Running Haiku from an Anyboot image <a name="part_running"></a>

The following guide will describe installation of Haiku with an Anyboot image on Parallels Desktop.

##### Step 1. Renaming the Anyboot image

After downloading the Anyboot image, we need to rename the image to make it work on Parallels Desktop.

Open the folder where the Anyboot image is located. Unzip the image, then change the image's extension from .iso to .hdd

![](/files/guides/virtualizing/parallels-desktop/rename_image.png)

When asked for confirmation, click **`Use .hdd`**

![](/files/guides/virtualizing/parallels-desktop/rename_confirm.png)

##### Step 2. Creating a virtual machine

After installing Parallels Desktop and renamed the Anyboot image, we can begin the installation process.

Open the Parallels Desktop application, if you are running Parallels Desktop for the first time, the Installation Assistant will appear. Skip all steps until you are in the **`Create new`** window.

![](/files/guides/virtualizing/parallels-desktop/create_new.png)

Select the *Install Windows or another OS from a DVD or image file* option, and then click **`Continue`**

Check *Continue without a source* on the lower-left corner. Then, click **`Continue`** once.

![](/files/guides/virtualizing/parallels-desktop/create_blank.png)

When the *Please select your operating system* window appears, select *Other*, then *Other* again.

![](/files/guides/virtualizing/parallels-desktop/select_os.png)

Then, the *Name and Location* window will appear. Name your virtual machine, and select the location of the virtual machine. Check *Create alias on Mac desktop* if you want to create an alias on the desktop. Check *Customize settings before installation*. Then, click **`Create`**

![](/files/guides/virtualizing/parallels-desktop/name_loc.png)

Wait while the virtual machine is being created, and then the *Virtual Machine Configuration* window will appear, along with a *Configuration* dialog. 

![](/files/guides/virtualizing/parallels-desktop/wizard_vmconfig.png)

This is the important step to make Haiku run in Parallels Desktop. On the *Configuration* dialog, click *Hardware* > *Hard Disk*. For the source, select the Anyboot image that we renamed.

![](/files/guides/virtualizing/parallels-desktop/harddisk.png)

A dialog will appear asking to convert to the new format. Click **`Convert`**.

![](/files/guides/virtualizing/parallels-desktop/convert.png)

The *Configuration* window will then shows a notice saying that the specified hard disk image is invalid. As we have converted them, click **`Yes`**

![](/files/guides/virtualizing/parallels-desktop/hdd_invalid.png)

Close the *Configuration* window, and then click **`Continue`** on the *Virtual Machine Configuration* window.

The virtual machine will start, and congratulations! Haiku is now up and running!

### Additional steps <a name="part_additional"></a>

##### Additional step 1. Configuring the virtual machine

There are a few settings that could be changed to improve performance of Haiku. Remember that you need to divide resources responsibly, depending on your host specification.

We begin by stopping the virtual machine first, if it hasn't already been stopped yet, by clicking on *Actions* > *Shut Down*. After stopping, we can configure the virtual machine by clicking on *Actions* > *Configure...*

![](/files/guides/virtualizing/parallels-desktop/config_menu.png)

The *Configuration* window will appear. 

The *Configuration* window allows the user to configure aspects of the virtual machine.

One of the ways to increase performance is changing the video memory assigned to the virtual machine. Click on *Hardware* > *Graphics*, and change the memory to a larger amount to increase the amount of video memory assigned. This should allow the GUI to run more smoothly and be more responsive.

![](/files/guides/virtualizing/parallels-desktop/config_vram.png)

To increase the amount of memory assigned to the virtual machine, click *Hardware* > *CPU & Memory*. Then, move the slider to the right, to increase the amount of memory assigned. This could be useful if we needed more memory to compile Haiku, as an example.

![](/files/guides/virtualizing/parallels-desktop/config_ram.png)

If you are running Parallels on MacOS 11, expand click *Advanced Settings* while still on *CPU & Memory*. For Hypervisor, choose *Parallels* instead of *Apple*. This will improve general performance in the Haiku virtual machine.

![](/files/guides/virtualizing/parallels-desktop/config_hypervisor.png)

After you are done with configuring, close the *Configuration* window to return to the virtual machine.

### Troubleshooting <a name="part_trouble"></a>

##### Parallels Desktop warns that there is _No boot device available_ and that it is _Unable to connect Hard Disk_

On the configuration window, make sure your hard disk uses the renamed image.

##### Parallels Desktop warns that the _device still expects data transfer_

When booting with ISO or Anyboot images, Parallels will hang on Disk icon. This is a bug in Haiku which can be read about [here](http://dev.haiku-os.org/ticket/4502)
