+++
type = "article"
title = "Virtualizing Haiku in SimNow"
date = "2016-12-23T06:09:57.000Z"
tags = []
+++

For Google Code-In 2017, Arnav Bhatt created a [video on how to install Haiku in SimNow](http://haiku-files.org/files/media/GCI-2017_SimNow_Arnav-Bhatt.mp4) [8 MiB].

This article is aimed at developers, as AMD SimNow is both a Virtual machine and an AMD hardware emulator. If you just want to try Haiku out, you might want to use another VM that is more aimed at end users.

##### Go to section:

*   [Downloading Haiku](#part_download-h)
*   [Downloading AMD SimNow](#part_download-s)
*   [Installing AMD SimNow](#part_installing-s)
*   [Preparing the Virtual Machine](#part_preparing-vm)
*   [Running the Virtual Machine](#part_running-vm)


### <a name="part_download-h"></a> Downloading Haiku 

There are several methods offered to install Haiku. For AMD SimNow will need to download the anyboot image [here](https://www.haiku-os.org/get-haiku), which is a mix of an ISO image and a RAW image and it does not require installation.

### <a name="part_download-s"></a> Downloading AMD SimNow

Both Linux & Windows versions of SimNow are available on the [AMD's website](https://developer.amd.com/simnow-simulator/).

### <a name="part_installing-s"></a> Installing SimNow
Installation of AMD SimNow is just like installing any other software.

![](/files/guides/virtualizing/simnow/simnow1.png)

![](/files/guides/virtualizing/simnow/simnow2.png)

![](/files/guides/virtualizing/simnow/simnow3.png)

### <a name="part_preparing-vm"></a> Preparing the Virtual Machine 

##### Creating the Hard Disk Image

![](/files/guides/virtualizing/simnow/simnow4.png)

Go to the installation directory, and run _"disktool.exe"_. We will use this to create a blank hard disk image.

![](/files/guides/virtualizing/simnow/simnow5.png)

Click on **Create Blank Disk Image**.

![](/files/guides/virtualizing/simnow/simnow6.png)

Choose a location to save the hard disk image to.

![](/files/guides/virtualizing/simnow/simnow7.png)

Assign a size to your hard disk image and click **OK**.

![](/files/guides/virtualizing/simnow/simnow8.png)

![](/files/guides/virtualizing/simnow/simnow9.png)

![](/files/guides/virtualizing/simnow/simnow10.png)

Click **OK** to complete the process, then exit disktool.

##### Installing Haiku

![](/files/guides/virtualizing/simnow/simnow11.png)

Now, run _"simnow.exe"_ from the installation directory to run SimNow.

![](/files/guides/virtualizing/simnow/simnow12.png)

Click on the Open BSD icon.

![](/files/guides/virtualizing/simnow/simnow13.png)

Choose _"cheetah\_1p.bsd"_ from the SimNow directory.

![](/files/guides/virtualizing/simnow/simnow14.png)

After the BSD is loaded, click on **File** > **Set IDE Primary Master Image**.

![](/files/guides/virtualizing/simnow/simnow15.png)

Browse to the hard disk image that you just created in the previous part.

![](/files/guides/virtualizing/simnow/simnow16.png)

Now, click **File** > **Set IDE Secondary Master Image**.

![](/files/guides/virtualizing/simnow/simnow17.png)

Change File type to _"ISO Images (*.iso)"_ and browse to the downloaded Haiku anyboot iso.

### <a name="part_running-vm"></a> Running the Virtual Machine

![](/files/guides/virtualizing/simnow/simnow18.png)

The configuration of your virtual device is now complete. Click the **Play** button to Run the simulation.

![](/files/guides/virtualizing/simnow/simnow19.png)

You can see Haiku loading in the SimNow window.
