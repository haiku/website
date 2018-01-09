+++
type = "article"
title = "Virtualizing Haiku in SimNow "
date = "2016-12-23T06:09:57.000Z"
tags = []
+++

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

![](https://sites.google.com/site/dacduong07/gci/haiku/s1.png)

![](https://sites.google.com/site/dacduong07/gci/haiku/s2.png)

![](https://sites.google.com/site/dacduong07/gci/haiku/s3.png)

### <a name="part_preparing-vm"></a> Preparing the Virtual Machine 

##### Creating the Hard Disk Image

![](https://sites.google.com/site/dacduong07/gci/haiku/s4.png)

Go to the installation directory, and run _"disktool.exe"_. We will use this to create a blank hard disk image.

![](https://sites.google.com/site/dacduong07/gci/haiku/s5.png)

Click on **Create Blank Disk Image**.

![](https://sites.google.com/site/dacduong07/gci/haiku/s6.png)

Choose a location to save the hard disk image to.

![](https://sites.google.com/site/dacduong07/gci/haiku/s7.png)

Assign a size to your hard disk image and click **OK**.

![](https://sites.google.com/site/dacduong07/gci/haiku/s8.png)

![](https://sites.google.com/site/dacduong07/gci/haiku/s9.png)

![](https://sites.google.com/site/dacduong07/gci/haiku/s10.png)

Click **OK** to complete the process, then exit disktool.

##### Installing Haiku

![](https://sites.google.com/site/dacduong07/gci/haiku/s11.png)

Now, run _"simnow.exe"_ from the installation directory to run SimNow.

![](https://sites.google.com/site/dacduong07/gci/haiku/s12.png)

Click on the Open BSD icon.

![](https://sites.google.com/site/dacduong07/gci/haiku/s13.png)

Choose _"cheetah\_1p.bsd"_ from the SimNow directory.

![](https://sites.google.com/site/dacduong07/gci/haiku/s14.png)

After the BSD is loaded, click on **File** > **Set IDE Primary Master Image**.

![](https://sites.google.com/site/dacduong07/gci/haiku/s15.png)

Browse to the hard disk image that you just created in the previous part.

![](https://sites.google.com/site/dacduong07/gci/haiku/s16.png)

Now, click **File** > **Set IDE Secondary Master Image**.

![](https://sites.google.com/site/dacduong07/gci/haiku/s17.png)

Change File type to _"ISO Images (*.iso)"_ and browse to the downloaded Haiku anyboot iso.

### <a name="part_running-vm"></a> Running the Virtual Machine

![](https://sites.google.com/site/dacduong07/gci/haiku/s18.png)

The configuration of your virtual device is now complete. Click the **Play** button to Run the simulation.

![](https://sites.google.com/site/dacduong07/gci/haiku/s19.png)

You can see Haiku loading in the SimNow window.
