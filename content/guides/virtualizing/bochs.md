+++
type = "article"
title = "Virtualizing Haiku in Bochs"
date = "2013-01-03T06:28:59.000Z"
tags = []
+++

The required files can be found on the "Get Haiku" page of this website which is located <a href="/get-haiku">here</a>.Both the raw and anyboot images are available there, do select the closest mirror to enjoy higher transfer rates. Bochs is available for free on their website which can be found <a href="http://bochs.sourceforge.net/">here</a>.

<h5 id="gotopart">Go to section:</h5>
<ul>
<li><a href="#part_rawimage">Running Haiku from a Raw or Anyboot image.</a></li>
<li><a href="#part_additional">Additional Steps.</a></li>
<li><a href="#part_trouble">Troubleshooting.</a></li>
</ul>

<h3 id="part_rawimage">Running Haiku from a Raw or Anyboot image.</h3>
<h5 id="part_Downloadingr">Step 1. Downloading Haiku.</h5>
After downloading the raw or anyboot image, unzip the file and in the folder, you will see a .image file.

<h5 id="part_openingr">Step 2. Opening the file.</h5>
Now download and install Bochs. Now open up the folder that Bochs was installed to in your Program files and create a folder there named <em>haiku</em>. Then copy the to the image file into that folder.

You might of seen a folder called <em>dlxlinux</em> with files in it, we are going to create a Haiku version. 

You should have had a link to Bochs installed in Program files under the start menu. Now Launch bochs by clicking on it there.
<BR>
<h5 id="part_configuringr">Step 3. Configuring Bochs.</h5>
<img alt="File system" src="/files/Image2_0.png"/><P STYLE="margin-bottom: 0in; page-break-before: always"><BR></P>
A start menu will pop up where you can configure Bochs. So select <strong>Disk & Boot</strong> and then push <span class="button">Edit</span>.
<BR>
<img alt="File system" src="/files/Image3_0.png"/><P STYLE="margin-bottom: 0in; page-break-before: always"><BR></P>
<img alt="File association" src="/files/Image3new_0.png"/><P STYLE="margin-bottom: 0in; page-break-before: always"><BR></P>
This will bring up the Bochs Disk Menu where you need to click on the <strong>ATA channel 0</strong> tab followed by the <strong>First HD/CD on channel 0</strong> tab. Here you will need to tick "<em>enable this device</em>" and select <strong>disk</strong> for the <em>Type of ATA device</em>. Under <strong>Path or physical device name</strong>, click browse; then in the window so opened; <strong> change file type to ALL FILES from .img </strong> and select the Haiku .image file which you downloaded and moved to the <em>haiku</em> folder under Bochs.

Move down to where it says <em>Type of disk image</em> and make sure it says <strong>flat</strong>.
Further you will then need to enter <strong>1219</strong> into where it says <em>Cylinders</em>, then <strong>16</strong> into <strong>Heads </strong> and lastly <strong>63</strong> into where it says <em>Sectors per track</em>.
<BR>
<img alt="File system" src="/files/Image4.png"/><P STYLE="margin-bottom: 0in; page-break-before: always"><BR></P>
You will also need to change to the Boot Options tab, where you will need to make sure <em>Boot drive #1</em> is selected to <strong>disk</strong>.


Now click <span class="button">ok</span> to save your settings.

<h5 id="part_runningr">Step 4. Running Bochs.</h5>
Once you are back at the start menu, click <span class="button">Save</span> and save your setting to where your .image file is. This will create a bochsrc.bxrc file that you can click on to start Haiku.
<BR>
<h3 id="part_additional">Additional Steps.</h3>
<h5>Creating a Link (Shortcut)</h5>
If You want you can enter that folder and create a link for the bochsrc.bxrc file to your desktop so you don't have to go looking for it. Make sure you change the link's name to some you will remember.

Now all you have to do double click on the link you created and you should be running Haiku!

<h5>Editing the .bxrc file</h5>
If something isn't just working right or you want to try a pre-made config file then you can download one for Haiku R1A4 <a href="/files/haiku.bxrc_.zip">here</a>.

Right click it and go edit or just open it with your favourite text editor.

You might have to change where the file looks for the raw and anyboot images' locations in the file if you are using Haiku after R1A4 however.
<BR>
<h3 id="part_trouble">Troubleshooting.</h3>
<h5>Haiku hangs at the disk icon.</h5>
You are using the ISO image which doesn't seem work with Bochs. Try the raw or anyboot images.
