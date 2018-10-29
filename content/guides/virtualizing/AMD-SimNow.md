 This article is aimed at developers, as AMD SimNow is both a Virtual  machine and an AMD hardware emulator. If you just want to try Haiku out, you might want to use another VM that is more aimed at end users.

##### Go to section:

- [Downloading Haiku.](#part_download-h)
- [Downloading AMD SimNow.](#part_download-s)
- [Installing AMD SimNow.](#part_installing-s)
- [Preparing the Virtual Machine.](#part_preparing-vm)
- [Running the Virtual Machine.](#part_running-vm)

### Downloading Haiku

There are several methods offered to install Haiku. For AMD SimNow will need to download either the iso image or the anyboot image [here](http://www.haiku-os.org/get-haiku) which is a mix of the iso image and the RAW image and can directly be used as an HDD, i.e. it does not require installation.

### Downloading AMD SimNow

There is only the linux version of SimNow available on the AMD's website, but you can get an older 64bit Windows .exe [here](http://bit.ly/18Oa4np).

### Installing SimNow

Installation of AMD SimNow is just like installing any other software.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image1.png)![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image2.png)![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image3.png)
### Preparing the Virtual Machine

##### Creating the Hard Disk Image
![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image4.png)

Go to the installation directory, and run *"disktool.exe"*. We will use this to create a blank hard disk image.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image5.png)

Click on "Create Blank Disk Image"

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image6.png)

Choose a location to save the hard disk image to.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image7.png)

Assign a size to your hard disk image and click ok.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image8.png)![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image9.png)![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image10.png)

Click ok to complete the process and exit disktool.

##### Mounting ISO image for installation
![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image11.png)

Now, run *"simnow.exe"* from the installation directory to run SimNow.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image12.png)

Click on the Open BSD icon.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image13.png)

Choose *"cheetah_1p.bsd"* from the SimNow directory.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image14.png)

After the BSD is loaded, click on File > Set IDE Primary Master Image

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image15.png)

Browse to the hard disk image that you just created in the previous part.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image16.png)

Now, click File > Set IDE Secondary Master Image.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image17.png)

Change File type to *"ISO Images (*.iso)"* and browse to the downloaded Haiku iso image.

##### Using the Anyboot image

You can also use the anyboot image to directly run Haiku without installation in the VM.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image20.png)

Just choose the anyboot image as your IDE Primary Master, and you're ready to go!

### Running the Virtual Machine

The configuration of your virtual device is now complete.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image18.png)

Click the Play button to Run the simulation.

![](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/simnow/image19.png)

You can see Haiku loading in the SimNow window.