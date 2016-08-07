+++
type = "blog"
author = "bebop"
title = "Update DriveSetup/Disk_Device"
date = "2009-04-22T04:21:48.000Z"
tags = ["gsoc2009", "gsoc", "DriveSetup", "disk_device"]
+++

I live in Honolulu Hawaii, I enjoy Surfing, Swimming, Sun and Code. I am working on my BS in Computer Science at the University of Hawaii at Manoa and minoring in Geography. Next year will be my senior year. I have taken courses in concurrent programming as well as networking. Next year I will be taking an operating systems course. I also have some experience in machine architecture and optimization. My current side project is writing an application for the Geography Department, that is a complete suite of tools for stereogrammetry. My professional work has been work on an electronic medical health records system based on the United States Veterans Affairs VistA system. I have more recently worked for Nanopoint Imaging Inc. working on live cell imaging and microfluidics software.

Project: Finalize Design and Implementation of the Disk Device Framework and DriveSetup Application.
I would like to complete the implementation of the DriveSetup application for Haiku. The application is a key feature of Haiku and is currently in the Haiku bug tracker as an Alpha milestone.

To Complete this task will require:

Disk Device Framework:

<li> Collaborate with mentors to finish work on the Disk Device Frame work.
<ul>
<li/>Add partition/partition map creation to the Disk_Device API
<li/>Add partition/partition map deletion to the Disk_Device API
<li/>Finish Intel Partition Add on, in particular finish Extended Partition support.
</ul>
<li/> Design and implement modules that the team deems necessary to complete the Disk Device framework.

DriveSetup:
<li/>Update the DriveSetup UI to reflect the changes in the API
    <ul><li/>Add creation of Intel style partition maps.
    <li/>Add creation of partitions of popular file system types.
    <li/>Add deletion of partition maps and partitions. </ul>
<li/>Adapt DriveSetup to Haiku's layout system.
<li/>Apply MVP design pattern to all newly created code.
<br/>

Implementing the Intel style partition map (MBR) and extended partitions (EBR) can be done by following the data structures that have been well documented. The source code from Linux, and the BSD's as well as the various partition tools could be used as a starting point for integration into the operating system. The creation and deletion of these structures on disk will then be dependent on how well the implementation follows the data structures. Writing the DriveSetup application should then be a matter of creating a mock up then designing the correct views from the BeAPI.

BeOS sparked my interesting in alternative operating systems way back in 8th grade. Since then I have watched Haiku/OpenBeOS and have always wanted to help but was unable to write code. Now that I have some experience as a paid programmer I feel that I can finally make a commitment to complete a project I set out to accomplish. I feel that I would be a good candidate for the project because I have experience in breaking a project into small tasks that can be completed by a fixed deadline. I have also become good at making time estimates on how long a particular task should take to be completed. I also believe that I have the technical skills to finish the project that I have outlined above, and would be excited to be given the chance to do so.