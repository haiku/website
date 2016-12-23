++++
 +type = "article"
 +title = "Virtualizing Haiku in Parallels Desktop"
 +date = "2016-12-23T21:36:57.000Z"
 +tags = []
 ++++
 +
 +<div class="box-warning">Haiku isn't working fully with Parallels Desktop yet as only the Raw and Anyboot images work and that is after following a workaround. Be sure to follow the workaround instructions on renaming the files.</div>
 +
 +##### Parallels Desktop
 +
 +Parallels Desktop is available for free (14 day trial version) or for $80 (full version) on [their website](http://www.parallels.com/products/desktop/).
 +
 +##### Anyboot
 +
 +The required files can be found at on the [get-haiku page](http://www.haiku-os.org/get-haiku) of this website. Select the closest mirror or the torrent (further down the page) in order to enjoy higher transfer rates. Verify using the checksums that your download has not been corrupted.
 +
 +##### Raw
 +
 +Raw is deprecated in favor of Anyboot, and as such can only be found on the nightly [build page](http://haiku-files.org/haiku/development/). There are no checksums for this version.
 +
 +##### Go to section:
 +
 +*   [Running Haiku from a Raw or Anyboot image](#part_rawimage)
 +*   [Additional Steps](#part_additional)
 +*   [Troubleshooting](#part_trouble)
 +
 +### Running Haiku from a Raw or Anyboot image
 +
 +#### Step 1. Downloading Haiku
 +
 +After downloading the Raw or Antboot image, unzip the file and in the folder you will see a .image file. Now rename the .image file to .hdd
 +
 +#### Step 2. Opening the file
 +
 +Start up Parallels Desktop. Then click on _Install Windows on another OS_ from DVD or image file before clicking <span class="button">Continue</span> once.  
 +![Parallels Wizard](/files/parallels_image1_1.png)  
 +Now, you will be in the installation screen where you're asked for your installation disc. Enable _Continue without installation disc_ (small checkbox in lower-left corner), before clicking <span class="button">Continue</span> once. When the _Please select your operating system_ dialogue appears, select _Other_, then _Other_ again. Continue until the Virtual Machine starts to boot. It will fail to boot. Now, this is the trick: Click on _Virtual Machine_ in the menu bar and press <span class="button">Stop</span>. Click on _Virtual Machine_ again and press <span class="button">Configure</span>.  
 +![Parallels Wizard](/files/parallels_image2_1.png)  
 +Click on _Hardware_ > _Hard Disk 1_. For the source, select the file which you renamed from .image to .hdd. Close the window and start your Virtual Machine. When a prompt comes up asking you to convert the image, click <span class="button">Accept</span>. Haiku is up and running!  
 +
 +### Additional Steps
 +
 +**TODO**  
 +
 +### Troubleshooting
 +
 +#### Parallels Desktop warns that the virtual hard drive image file is either damaged or locked
 +
 +Parallels does not support the VMDK images produced by Haiku build system. It complains that it is an old-format virtual hard disk (for Parallels 3.0 or earlier) and offers to convert it, but fails with the error message "_Unable to convert the virtual hard disk to the new format. The virtual hard drive image file is either damaged or locked._" which instantly disappears. You need to use the Raw or Anyboot images.
 +
 +#### Parallels Desktop warns that there is _No boot device available_ and that it is _Unable to connect Hard Disk_
 +
 +You need to use the renaming workaround.
 +
 +#### Parallels Desktop warns that the _device still expects data transfer_
 +
 +When booting with ISO or Anyboot images, Parallels will hang on Disk icon. This is a bug in Haiku which can be read about [here](http://dev.haiku-os.org/ticket/4502)