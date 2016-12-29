+++
type = "article"
title = "Emulating Haiku In VMware Fusion"
date = "2016-12-29T10:30:00.000Z"
tags = []
+++

There are several methods offered to install Haiku. Among those, only the vmdk and the iso methods are suitable for running Haiku easily on VMware Fusion. Basically these are the two methods that will be shown in this guide. The easiest of all is utilising the vmdk which is already properly configured.

<div class="box-info">Running Haiku from a VM image is recommended to avoid any possible problems. Unless it does not work, or you would like to simulate an actual installation, do stick to this method.</div>

The required files can be found at on the Get-Haiku page of this website which is located [here](http://www.haiku-os.org/get-haiku).


Both the vmdk and iso are available there, do select the closest mirror to enjoy higher transfer rates. Verify using the checksums to make sure that the downloaded files are not corrupted as they are big files. VMware Fusion is available for free on their website which can be found [here](http://www.vmware.com/products/fusion/).

##### Go to section:

*   [Running Haiku from a VM image.](#part_vmimage)
*   [Installing and running Haiku from an ISO image.](#part_iso)
*   [Additional Steps.](#part_additional)
*   [Troubleshooting.](#part_trouble)

### Running Haiku from a VM image.

##### Step 1\. Downloading Haiku.<a name="part_vmimage"></a>

After downloading the VMDK image, unzip the file and in the folder, you will see a .vmx file.

##### Step 2\. Opening the file.

Open the .vmx file and open with VMware Fusion. VMware Fusion will prompt if you would like to upgrade this Virtual Machine, it is totally up to you if you want to as an ungraded version offers support for new features, however, cannot be used with older versions of VMware Fusion. It is possible if you want to downgrade the Virtual Machine. After selecting your choice, VMware Fusion will start to boot Haiku.

##### Step 3\. Finishing Up.

Wait for Haiku to boot and Haiku is now up and running! It is convenient, time-saving and easier to manage.  

### Installing and running Haiku from an ISO image. <a name="part_iso"></a>

This method is pretty much similar to installing on an actual machine, but a little more tedious than running Haiku from a VM image

##### Step 1\. Downloading Haiku.

After downloading the ISO image, unzip the file and in the folder, you will see a .iso file. Under Virtual Machine Library, which you can use the shortcut <kbd>Shift</kbd>+<kbd>cmd</kbd>+<kbd>L</kbd>, click Add and then New.

##### Step 2\. Creating a virtual machine.

![](/static/files/new-vm-step-1.png)

![](/static/files/new-vm-step-2.png)
 
![](/static/files/new-vm-step-3.png)

##### Step 3\. Selecting the location.

**TODO**

##### Step 4\. Selecting type of Operating System.

For the operating system, select Other. For version, do take note to make sure that Other is selected. Do not select Other 64-bit.

##### Step 5\. Naming the virtual machine.

**TODO**

##### Step 6\. Specifying Disk space.

**TODO**

##### Step 7\. Adjusting Memory.

**TODO**

##### Step 8\. Starting the Virtual Machine.

Save the settings and power on the virtual machine. Once Haiku has booted, you can choose whether to run as a Live-CD (which does not have any persistency through reboots) or continue with the installation.

##### Step 9\. Initialising partition.

Don't worry if you see the warning saying Haiku can't find any partitions to boot from. Click <kbd>OK</kbd> and we will setup the necessary partitions needed to install Haiku. Click <kbd>Set up partitions</kbd>. Before clicking on the device with the hard disk icon. Then click Disk > Initialize > Intel Partition Map…

##### Step 10\. Selecting partition.

Select the new space and click Partition > Create.

<div class="box-info">It is important that you tick the active partition or else your disk will not boot!</div>


##### Step 11\. Formatting the new partition.

Format the newly created partition(s) by selecting the partition and clicking Partition > Format > Be File System… Accept the defaults and you should see something like the previous screen.

##### Step 12\. Selecting your new partition.

Close the dialog box and select the partition you just created. Ensure that the partition is correct.

##### Step 14\. Installing Haiku.

Begin the installation! Reboot once you are done, you should be able to see the Haiku desktop after you reboot. If you are stuck at the installation screen after reboot, disconnect the iso from the virtual disk drive and try again.

##### Step 15\. You are now finished.

You have successfully installed Haiku! Have fun and refer to the Haiku User Guide if you encounter any problems.  

### Additional Steps.<a name="part_additional"></a>

**TODO**  

### Troubleshooting.<a name="part_trouble"></a>

**TODO**
