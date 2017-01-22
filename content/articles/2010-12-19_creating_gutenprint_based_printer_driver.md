+++
type = "article"
title = "Creating the Gutenprint based printer driver"
date = "2010-12-19T08:27:00.000Z"
tags = ["printer", "driver"]
+++

<p>
<a href="http://gutenprint.sourceforge.net/">Gutenprint</a> is a suite of printer drivers that can be used with UNIX and Linux print spooling systems, such as CUPS (Common UNIX Printing System), lpr, LPRng, and others. Gutenprint currently supports over 700 printer models. </p>
</p>
<p>
Gutenprint was recently ported to <a href="http://haiku-os.org">Haiku</a>, both increasing its printing capabilities, as well as extending its supported printer models. This article describes Gutenprint and the effort to port it to Haiku.
</p>

<!--more-->

<h3>Extending the Haiku printer driver framework</h3>
<p>
Libprint, the printer driver framework, is used by native printer drivers such as Canon LIPS 3 and 4, HP PCL5 and PCL6, and Adobe PostScript. Exceptions are the Preview and the PDF printer driver.
</p>

<p>
This framework makes it very easy to add a new printer driver to Haiku. It provides the user interface for the page setup dialog, the print job setup dialog and a preview window. It performs the rendering of the page as a sequence of bitmap bands. The printer driver then converts the bitmap bands to a stream of data in a format that is understood by each printer.
</p>

<p>
The setup dialogs provide a fixed set of settings whose value ranges are configurable to match specific printer drivers. For example whether a printer is a color printer and the available paper sizes (Letter, A4, ...).
</p>

<p>
The page setup dialog in Figure 1 shows the values for paper size and resolution from Gutenprint.
</p>
<img src="/files/GutenprintDriver_PageSetup_Annotated.png"/><br>
<b>Figure 1:</b> Page Setup Dialog.<br>

<p>
Gutenprint contains a meta model for the available settings of a printer model. Some of these settings can be mapped to existing settings provided by libprint. For the missing settings libprint had to be extended to show them in the job setup dialog and to persist them in the job settings.<br>
Now libprint supports the following type of settings: A list of values visualized as a combo box, a boolean flag visualized as a check box and a value in a range of values visualized as a slider.
</p>

<p>
Figure 2 shows the job setup dialog. The settings inside the red rectangle are the <i>missing</i> settings from Gutenprint.
</p>

<img src="/files/GutenprintDriver_JobSetup_Annotated.png"/><br>
<b>Figure 2:</b> Job Setup Dialog.<br>

<p>
Gutenprint categorizes settings from basic to advanced. In the printer driver only the basic settings are enabled. When the advanced settings are enabled there are so many that the setup dialog would get too large to fit on most screens because of a <a href="https://www.freelists.org/post/haiku-development/Putting-a-BGridView-inside-BScrollView,8">bug</a> in the Layout API. As soon as this bug is fixed the advanced settings can be enabled.
</p>

<h3>Porting Gutenprint</h3>
<p>
Gutenprint consists at least of the core library, a GTK user interface, and support for CUPS, foomatic, GIMP and Ghostscript.
</p>

<p>
For the printer driver, only the core library is required. The Gutenprint core library provides an API to query the available printer models, to query and modify the printer model specific settings, and to convert an image on a page into a stream of printer specific data.
</p>

<p>
Porting Gutenprint to Haiku was relatively easy. The core built without any problems with both GCC2 and GCC4 once the configuration files had been created.</br>
Gutenprint uses the &quot;<a href="http://www.gnu.org/software/autoconf/manual/autoconf.html">configure</a>&quot; script to support building on different platforms and in differnt configurations but the script does not support Haiku yet. So building on Haiku did not work at first. Since I did not have the knowledge of how to get the configure script working on Haiku, and I did not want to waste too much time in getting it to build, I decided to first try to build Gutenprint on OpenSuSE. There was no problem with that build. The configure script generated header and make files. In the header files macros are used for the configuration of the Gutenprint build.
</p>
<p>
After adapting the header files for Haiku and creating Jamfiles, the port was completed!</br>
</p>

<p>
At runtime Gutenprint needs some data files that are part of Gutenprint source code repository. When the Haiku image is created these data files needed to be copied to the image as well. For example the list of printer models is stored in an XML file <code>printers.xml</code>.
</p>

<h3>Writing the printer driver</h3>
<p>
Since I had written native Haiku printer <a href="/documents/dev/how_to_write_a_printer_driver">drivers</a> using libprint in the past I am familiar with the printer driver framework. The driver was implemented step by step. After each step the added functionality could be tested. The steps outlined here might not be in chronological order.
</p>
<p>
I started with a printer driver skeleton by copying an existing driver and the removing the printer driver specific source code. The driver could be built soon but did not generate any output yet.
</p>

<p>
First the printer model selection dialog was implemented. Thanks to Ithamar R. Adema who implemented such a dialog for the PostScript driver, the user interface was already available as depicted in figure 3. Only the printer manufacturer and model had to be obtained from Gutenprint.
</p>

<img src="/files/GutenprintDriver_SelectPrinter.png"/><br>
<b>Figure 3:</b> Printer Model Selection Dialog.<br>

<p>
Then the settings needed for libprint where obtained from Gutenprint. At this point in time the other Gutenprint generic settings weren't supported yet. These were implemented in the last step.
</p>

<p>
At this step, the printer still did nothing. The bitmap bands for a page needed to be handed over to Gutenprint. Figure 4 shows an illustration of an image on a page. When all bitmap bands for a page are available Gutenprint is requested to print an image on the page. The position and size of the image are set and then Gutenprint uses a callback mechanism to request the size of the image in pixels and gets the pixels for the image to be printed line by line. The pixels are always encoded in RGB 8 bits per channel. For black and white printing Gutenprint is responsible for doing the color conversion. The maximum number of bytes temporarily required for a page in letter size in 300 DPI should be about 32 MiB and for 600 DPI it should be about 128 MiB. On modern hardware that should not be a problem.
</p>

<img src="/files/GutenprintDriver_Page.png"/><br>
<b>Figure 4:</b> The page with printable rectangle and an image enclosing the bitmap bands.<br>

<p>
The bitmap band to Gutenprint image conversion worked on the second attempt printing a test page. <br>
I had quite some difficulties to get the image positioning and size calculation right, as the unit is 1/72 Inches and the internal unit is 1/dpi where dpi is the currently selected resolution and at first I wanted it to be as exact as possible. The position and size should be a multiple of the greatest common divisor of 72 and dpi. However that is not always possible without truncation of the output image, because Gutenprint does not allow to place an image outside the printable rectangle (there is usually a margin of more or less 10/72 Inch around the paper where printing is not possible).<br>
Now a not so accurate solution is implemented that stays within the paper margin limits, that seems to work good enough.
</p>

<p>
During the work on the Gutenprint driver most of the printing related user interfaces were updated to use the Layout API. This gets rid of font size sensitivity issues. <br>
Also some bugs were fixed in the USB transport add-on and in libprint where the page contents did not rotate printing in landscape mode.
</p>

<h3>Lines of Code</h3>
<p>
The following table shows the lines of codes in revision <a href="https://dev.haiku-os.org/changeset/39800">39800</a> of the header files, source files, their sum and the percentage of the sum to the total number of lines. The lines of codes includes empty lines and comments.
</p>

<table border="1">
<tr><td>Component                                   </td><td>.h</td>   <td>.cpp</td>  <td>.h + .cpp</td><td>Percentage</td></tr>
<tr><td>Gutenprint (<a href="https://dev.haiku-os.org/browser/haiku/trunk/src/libs/print/libgutenprint/src/main">libgutenprint</a>)</td>
                                                         <td align="right">5.720</td><td align="right">45.413</td><td align="right">51.133</td>  <td align="right"> 77,7%</td></tr>
<tr><td>Haiku printer driver framework (<a href="https://dev.haiku-os.org/browser/haiku/trunk/src/libs/print/libprint">libprint</a>)
                                                         </td><td align="right">3.202</td><td align="right"> 8.418</td><td align="right">11.620</td>  <td align="right"> 17,7%</td></tr>
<tr><td>Haiku Gutenprint printer driver (<a href="https://dev.haiku-os.org/browser/haiku/trunk/src/add-ons/print/drivers/gutenprint">Gutenprint</a>)</td>
                                                         <td align="right">  689</td><td align="right"> 2.344</td><td align="right"> 3.033</td>  <td align="right">  4,6%</td></tr>
<tr><td>Total                                       </td><td align="right">9.611</td><td align="right">56.175</td><td align="right">65.786</td>  <td align="right">100%</td></tr>
</table>
<b>Table 1:</b> Lines of Codes.<br>

<p>
For the extension of libprint about 1538 lines were added. Not all lines were new code because the code style in libprint was changed to conform to the
Haiku coding style.<br>
The total number of lines increased between revision <a href="https://dev.haiku-os.org/changeset/36173">36173</a> and <a href="https://dev.haiku-os.org/changeset/39800">39800</a> in libprint and Gutenprint printer driver to 4.571.
</p>

<p>
<small>
Copyright 2010 Michael Pfeiffer aka laplace<br>
Lector: Andrew Hudson<br>
The work was sponsored by <a href="http://haikuware.com/20101004536/gutenprint-bounty-started">Haikuware</a> Gutenprint Bounty.<br>
This article was first published at http://www.osnews.com/<br>
Article republished 2011-02-10. 
</small>
</p>