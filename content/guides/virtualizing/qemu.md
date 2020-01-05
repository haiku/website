+++
type = "article"
title = "Virtualizing Haiku in QEMU "
date = "2020-04-01T16:46:57.000Z"
tags = []
+++

Virtual instances of operating systems are perfect for all kinds of testing purposes that need to be done in a safe and isolated environment. Installing Haiku in a virtual machine is a solution for people who do not want to install it on their physical computers, but wish to become familiar with it.

This How-To guide will describe the process of running Haiku on virtual machine (VM) using QEMU 4.1.0 and an .ISO image file, with a Windows 10 host.

The latest .ISO image can be obtained [here](https://www.haiku-os.org/get-haiku/).

You can find the latest version of QEMU for Windows, Linux, and MacOS [here](https://www.qemu.org/download/).

In this guide, we will use [QtEmu](https://gitlab.com/qtemu/gui), an open source GUI front-end to spare us from having to remember the complicated arguments for the command line QEMU. The installer for the latest version of QtEmu can be downloaded [here](https://www.carlavilla.es/qtemu/qtemu_setup_x86_64.exe).

##### Go to section:
*	[Setting up QEMU and QtEmu](#part_setup)
*   [Installing and running Haiku from an ISO image](#part_iso)
*   [Additional Steps](#part_additional)
*   [Troubleshooting](#part_trouble)

## Part 1: Setting up QEMU and QtEmu <a name="part_setup"></a>
### Step 1. Installing QEMU
After downloading the latest version of QEMU from the link mentioned above, open the installer and follow the instructions. The setup normally finishes in a few minutes.
### Step 2. Installing QtEmu
[QtEmu](https://gitlab.com/qtemu/gui) is an open source GUI front-end for QEMU.

After downloading the installer from the link above, run the setup and follow the instructions. The setup normally finishes in 2 minutes.

The QtEmu icon should now appear on the Start Menu.
### Step 3. Configuring QtEmu for QEMU
During the first run of QtEmu, you will have to configure the paths to QtEmu in order for it to run properly.

![QtEmuFirstRunDialog]()

The QEMU binaries path is the folder where you installed QEMU, which is usually `C:\Program Files\QEMU` or `C:\Program Files (x86)\QEMU`.

The QtEmu img path is the path for the `qemu-img.exe`, which is in the folder you installed QEMU in.


QEMU machines path is the path where your virtual machines are stored. It is recommended that you should place this folder in a separate drive from your OS, so that QtEmu can create large disk images for your Virtual Machines.

## Part 2: Installing and running Haiku from an ISO image <a name="part_iso"></a>
### Step 1. Creating a virtual machine
When the .ISO image is ready, we can begin to create a new virtual machine.

Start QtEmu, then click on the "New Machine" icon (or go to `Machine -> New Machine`).

![QtEmuGUINewMachine]()

In this dialog, we need to give our machine a name, as well as specify the operating system that we are going to install. This allow QEMU optimize its machine for some popular OSes, and also to distinguish from your other VMs. As Haiku is not included in the list, we will choose "Other". Once you've finished, click on "Next".

![QtEmuNewOsType]()

You can choose your virtual PC type on this screen. If you don't know what to select, just stick to the default and click "Next".

![QtEmuNewPcType]()

The next step is to configure the machine hardware:

![QtEmuNewHardware]()

The processors must be configured in order to let QEMU and Haiku run properly. Some virtual CPUs can work on some machines, but give errors on others. The recommended option here is "Intel Core 2 Duo".

Based on how many cores your processor has, you can increase the virtual CPU count. The number must be smaller than the number of your hardware CPU cores, or QEMU will produce errors.

Also, the "maximum number of hotpluggable CPUs" must not be smaller than the virtual CPU count.

The other tabs allow you to configure Graphics, Audio, and Network settings. If you have experience with virtualizing, you can change a few things here, but if you don't, it is safer to leave these tabs alone.

When you're finished, press "Next".

Then, choose your Machine Accelerator here. HAXM is enabled by default, as it makes virtualization faster. However, this cause [bugs](https://gitlab.com/qtemu/gui/issues/28#note_244603038) in many machines. If HAXM is installed in your PC, you can press "Next" and move on.

![QtEmuNewAccelerator]()

But if it is not, or if you are unsure, uncheck the HAXM option, then move to the TCG tab, and enable TCG here.

![QtEmuNewAcceleratorTCG]()

The next thing to do is to set the amount of RAM allocated for your VM. The recommended amount is 3GB (as WebPositive alone can take 1GB of memory), but not more than half of your available RAM.

![QtEmuNewRAM]()

Finally, we need to allocate space for the virtual disk. Select "Create a new virtual hard disk, then press "Next".

![QtEmuNewDisk]()

8GB of disk space is recommended for Haiku. Also, for portability, you can select the raw image type or VMWare disk image type (.vmdk).

When you're done, your summary should look like this:

![QtEmuNewSummary]()

Press Finish to finish setup.

### Step 2. Configuring Haiku boot image
We're done with the hardware, but like in a real computer, you need to insert the Haiku setup CD to boot from the installation disk. Do this by clicking on the "Machine Settings" icon (or going to `Machine -> Machine Settings`)


![QtEmuGUISettings]()

In the new dialog box, navigate to "Media", press on the "Add Optical Media" icon.

![QtEmuSettingsMedia]()

Then, navigate to the .ISO image that you have downloaded.

![QtEmuSettingsImage]()

Press "Save" to finish configuring.

### Step 3. Installing Haiku
Ok, our new machine is now ready to run! Press the "Start" icon to begin.

![QtEmuGUIStart]()

The VM should boot from the CD, and Haiku's installer should open.

Follow [this guide](https://www.haiku-os.org/get-haiku/installation-guide) if you don't know how to install Haiku.

In the DriveSetup page, two volumes should appear. The drive at port 0 should be our virtual hard drive. Press `Disk -> Initialize` to initialize it. You can choose either "Intel Partition Map" or "GUID Partition Map", but the latter is better, and is supported by Haiku.

![QtEmuDriveSetup]()

Once you have Initialized the disk, follow [the installation guide](https://www.haiku-os.org/get-haiku/installation-guide) to initialize the drive. After that, close the DriveSetup window to continue.

The installation should finish in less than 5 minutes. When you're done, click on "Restart" to restart your VM.

Here is a screenshot of Haiku on QEMU:

![QtEmuHaikuDesktop]()


To let Haiku run fullscreen, press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F</kbd>.
You should also change the screen resolution, but not larger than the host's, else QEMU will produce bugs.

## Part 3. Known issues
### 1. QEMU will not start after pressing the "Start machine" button
This is a known issue in Windows 10, as mentioned above, it may be related to HAXM. Read more [here](https://gitlab.com/qtemu/gui/issues/28#note_244603038).
### 2. Network does not start.
Try enabling User Mode Network Connection in Machine Preferences. If that does not work, re-installing Haiku may help.

![QtEmuIssueNetwork]()