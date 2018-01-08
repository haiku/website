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

There are several methods offered to install Haiku. For AMD SimNow will need to download either the iso image or the anyboot image [here](http://www.haiku-os.org/get-haiku) which is a mix of the iso image and the RAW image and can directly be used as an HDD, i.e. it does not require installation.

### <a name="part_download-s"></a> Downloading AMD SimNow

There is only the linux version of SimNow available on the AMD's website, but you can get an older 64bit Windows .exe [here](http://bit.ly/18Oa4np).

### <a name="part_installing-s"></a> Installing SimNow
Installation of AMD SimNow is just like installing any other software.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image1.png)

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image2.png)

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image3.png)

### <a name="part_preparing-vm"></a> Preparing the Virtual Machine 

##### Creating the Hard Disk Image

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image4.png)

Go to the installation directory, and run _"disktool.exe"_. We will use this to create a blank hard disk image.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image5.png)

Click on **Create Blank Disk Image**.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image6.png)

Choose a location to save the hard disk image to.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image7.png)

Assign a size to your hard disk image and click **OK**.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image8.png)

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image9.png)

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image10.png)

Click **OK** to complete the process, then exit disktool.

##### Mounting ISO image for installation

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image11.png)

Now, run _"simnow.exe"_ from the installation directory to run SimNow.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image12.png)

Click on the Open BSD icon.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image13.png)

Choose _"cheetah\_1p.bsd"_ from the SimNow directory.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image14.png)

After the BSD is loaded, click on **File** > **Set IDE Primary Master Image**.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image15.png)

Browse to the hard disk image that you just created in the previous part.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image16.png)

Now, click **File** > **Set IDE Secondary Master Image**.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image17.png)

Change File type to _"ISO Images (*.iso)"_ and browse to the downloaded Haiku iso image.

##### Using the Anyboot image

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image20.png)

You can also use the anyboot image to directly run Haiku without installation in the VM. Just choose the anyboot image as your IDE Primary Master, and you're ready to go!

### <a name="part_running-vm"></a> Running the Virtual Machine

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image18.png)

The configuration of your virtual device is now complete. Click the **Play** button to Run the simulation.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image19.png)

You can see Haiku loading in the SimNow window.
