+++
type = "article"
title = "Virtualizing Haiku in SimNow "
date = "2016-12-23T06:09:57.000Z"
tags = []
+++

<div class="box-info">This article is aimed at developers, as AMD SimNow is both a Virtual machine and an AMD hardware emulator. If you just want to try Haiku out, you might want to use another VM that is more aimed at end users.</div>

##### Go to section:

*   [Downloading Haiku.](#part_download-h)
*   [Downloading AMD SimNow.](#part_download-s)
*   [Installing AMD SimNow.](#part_installing-s)
*   [Preparing the Virtual Machine.](#part_preparing-vm)
*   [Running the Virtual Machine.](#part_running-vm)

### Downloading Haiku

There are several methods offered to install Haiku. For AMD SimNow will need to download either the iso image or the anyboot image [here](http://www.haiku-os.org/get-haiku) which is a mix of the iso image and the RAW image and can directly be used as an HDD, i.e. it does not require installation.

### Downloading AMD SimNow

There is only the linux version of SimNow available on the AMD's website, but you can get an older 64bit Windows .exe [here](http://bit.ly/18Oa4np).

### Installing SimNow

Installation of AMD SimNow is just like installing any other software. ![](/files/images/simnow_image1.png) ![](/files/images/simnow_image2.png) ![](/files/images/simnow_image3.png)

### Preparing the Virtual Machine

##### Creating the Hard Disk Image

![](/files/images/simnow_image4.png) Go to the installation directory, and run _"disktool.exe"_. We will use this to create a blank hard disk image. ![](/files/images/simnow_image5.png) Click on "Create Blank Disk Image" ![](/files/images/simnow_image6.png) Choose a location to save the hard disk image to. ![](/files/images/simnow_image7.png) Assign a size to your hard disk image and click <span class="button">ok</span>. ![](/files/images/simnow_image8.png) ![](/files/images/simnow_image9.png) ![](/files/images/simnow_image10.png) Click <span class="button">ok</span> to complete the process and exit disktool.

##### Mounting ISO image for installation

![](/files/images/simnow_image11.png) Now, run _"simnow.exe"_ from the installation directory to run SimNow. ![](/files/images/simnow_image12.png) Click on the Open BSD icon. ![](/files/images/simnow_image13.png) Choose _"cheetah_1p.bsd"_ from the SimNow directory. ![](/files/images/simnow_image14.png) After the BSD is loaded, click on File > Set IDE Primary Master Image ![](/files/images/simnow_image15.png) Browse to the hard disk image that you just created in the previous part. ![](/files/images/simnow_image16.png) Now, click File > Set IDE Secondary Master Image. ![](/files/images/simnow_image17.png) Change File type to _"ISO Images (*.iso)"_ and browse to the downloaded Haiku iso image.

##### Using the Anyboot image

You can also use the anyboot image to directly run Haiku without installation in the VM. ![](/files/images/simnow_image20.png) Just choose the anyboot image as your IDE Primary Master, and you're ready to go!

### Running the Virtual Machine

The configuration of your virtual device is now complete. ![](/files/images/simnow_image18.png) Click the Play button to Run the simulation. ![](/files/images/simnow_image19.png) You can see Haiku loading in the SimNow window.
