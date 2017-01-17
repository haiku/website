+++
type = "article"
title = "Virtualizing Haiku in VMware-Workstation "
date = "2016-12-22T18:11:53.000Z"
tags = []
+++

The required ISO file can be found at on the "Get Haiku" page of this website which is located [here](https://www.haiku-os.org/get-haiku). VMware Player is available for free on their website which can be found [here](https://www.vmware.com/products/player/). There is also VMware Workstation, which is similar but has more features and is commercial. This means you have to pay for this version, but it does offer a 30 days trial. However you could just stick to the free one _(VMware Player)_ as you most likely will not need the extra features. You can both read about the commercial version's extra features and download it from its website [here](https://www.vmware.com/products/workstation/overview.html)

##### Go to section:

*   [Running Haiku from a VM image.](#part_vmimage)
*   [Installing and running Haiku from an ISO image.](#part_iso)
*   [Additional Steps.](#part_additional)
*   [Troubleshooting.](#part_trouble)

### Running Haiku from a VM image.

##### Step 1. Downloading Haiku.

Download the vmdk zip file from the Haiku website and unzip it. You should be able to see these following files. ![File system](/files/images/image1.jpeg)

##### Step 2. Opening the file.

![](/files/images/image2.jpeg "Picture 2")
Double click the file with the .vmx extension to open the virtual machine in VMware Player or VMware Workstation in this instance.

##### Step 3. Adjusting Memory.

Adjust the amount of Random Access Memory (RAM) allocated for the virtual machine to your preference. 256MB is recommended if the host machine has less than 1GB of RAM. The more RAM you allocate will make the virtual machine faster.

<div class="box-warning">Excessive allocation may cause the host machine to slow down.</div>

##### Step 4. Starting the Virtual Machine.

Once you are done with adjusting the values, or accept the defaults, simply power on the virtual machine. You may want to switch to full screen mode as the virtual machine will have a resolution of over 1024 x 768.

##### Step 5. Finishing Up.

Congratulations, your Haiku virtual machine is ready for testing. Do take a look at the Haiku User Guide if you are not familiar with navigating around the desktop. You can find a link to this on the desktop or you can find another version of it online [here](https://www.haiku-os.org/docs/userguide/en/contents.html).

![](/files/images/image3.jpeg "Picture 3")

<div class="box-info">Optionally you could mount the blank hard disk image that came in the download if there is data needed to be stored.</div>

### Installing and running Haiku from an ISO image.

This method is pretty much similar to installing on an actual machine, but a little more tedious than running Haiku from a VM image

##### Step 1. Downloading Haiku.

Download and unzip the iso image from the Haiku website. It contains the iso disk image which is necessary for installing Haiku.

##### Step 2. Creating a virtual machine.

Create a new virtual machine, select typical and continue.

##### Step 3. Selecting the location.

Select the location of the iso image you have unzipped.

##### Step 4. Selecting type of Operating System.

![](/files/images/image4.jpeg "Picture 4")
For the operating system, select Other. For version, do take note to make sure that Other is selected. Do not select Other 64-bit.

##### Step 5. Naming the virtual machine.

Give a name to your virtual machine, and point to the location which you want to store the necessary files.

##### Step 6. Specifying Disk space.

![](/files/images/image5.jpeg "Picture 5")
Specify how much disk space to give the virtual machine. Do store virtual disk as a single file if you are not dealing with a huge amount of data.

##### Step 7. Adjusting Memory.

Click finish and edit the virtual machine settings. Allocate the amount of RAM you would the virtual machine to have. Try allocating 512 MB if you have more than 1GB of RAM on your host machine.

##### Step 8. Starting the Virtual Machine.

Save the settings and power on the virtual machine. Once Haiku has booted, you can choose whether to run as a Live-CD (which does not have any persistency through reboots) or continue with the installation.

##### Step 9. Initialising partition.

![File system](/files/images/image6.jpeg)Don't worry if you see the warning saying Haiku can't find any partitions to boot from. Click O and we will setup the necessary partitions needed to install Haiku. Click <span class="button">Set up partitions</span>. Before clicking on the device with the hard disk icon. Then click Disk > Initialize > Intel Partition Map…

##### Step 10. Selecting partition.

Select the new space and click Partition > Create.

![](/files/images/image7.jpeg "Picture 7")

<div class="box-warning">It is important that you tick the active partition or else your disk will not boot!</div>

##### Step 11. Creating a new partition.

You may just create one partition or more if you like, but note down the partition with the active parameter as installation must be done only on active partitions. If you want to avoid confusion, simply create one partition.

##### Step 12. Formatting the new partition.

![](/files/images/image8.jpeg "Picture 8")
Format the newly created partition(s) by selecting the partition and clicking Partition > Format > Be File System… Accept the defaults and you should see something like the previous screen.

##### Step 13. Selecting your new partition.

Close the dialog box and select the partition you want to install Haiku. Ensure that the partition is correct.

##### Step 14. Installing Haiku.

Begin the installation! Reboot once you are done, you should be able to see the Haiku desktop after you reboot. If you are stuck at the installation screen after reboot, disconnect the iso from the virtual disk drive and try again.

![](/files/images/image9.jpeg "Picture 9")

<div class="box-info">The first boot will have a few start up items that fully configure Haiku, please be patient.</div>

##### Step 14. You are now finished.

Enjoy Haiku and refer to the Haiku User Guide if you encounter any problems

### Additional Steps.

**TODO**

### Troubleshooting.

##### Question: Help! My disk space is running out, how do I allocate more space without reinstalling?

Answer: Simple, follow these step to add more storage to your Haiku, but take note that there is no way to reduce the size of your virtual hard disk once it starts to occupy space. Go to the configurations of the virtual machine. Select the hard disk you want to expand or add a new virtual disk. Specify the new capacity of the virtual disk. Only enter a value higher than the original, shrinking the disk is not possible. Increase the size of the partition using GParted or the Haiku iso. Do be careful to avoid any loss of data.

![](/files/images/image10.jpeg "Picture 10")
