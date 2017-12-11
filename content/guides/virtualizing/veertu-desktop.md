+++
type = "article"
title = "Virtualizing Haiku in Veertu Desktop"
date = "2017-12-11"
tags = []
+++

Virtual instances of operating systems are perfect for all kinds of testing purposes that need to be done in a safe and isolated environment. Installing Haiku in a virtual machine is a solution for people who do not want to install it on their physical computers, but wish to become familiar with it.

This guide will describe the process of running Haiku on a virtual machine (VM) using Veertu Desktop.

We will using an anyboot image file - it can be obtained [here](/get-haiku). Veertu Desktop is downloadable from [their GitHub repository](https://github.com/veertuinc/vdhh/releases)

##### Go to section

* [Installing and running Haiku from an Anyboot image](#part_install)
* [Additional steps](#part_additional)

### Installing and Running Haiku from an Anyboot image <a name="part_install"></a>

The following guide will describe installation of Haiku with an Anyboot image on Veertu Desktop. 

##### Step 1. Creating a Virtual Machine

After installing Veertu Desktop and downloading the Anyboot image, we can begin the installation process.

Open the Veertu Desktop application, and the *Create New VM* window will appear. Select Install from ISO or DVD, then click **`Next`**.

![](/files/guides/virtualizing/veertu-desktop/new_vm.png)

Name the virtual machine, then browse for the Haiku anyboot image by choosing *Choose .ISO*. After that, click **`Next`**.

![](/files/guides/virtualizing/veertu-desktop/name_loc.png)

Choose *Other* and then *Other* again, as Haiku is not listed.

![](/files/guides/virtualizing/veertu-desktop/select_os.png)

Verify the details of the VM. then click **`Launch VM`**. The VM will then boot to Haiku.

![](/files/guides/virtualizing/veertu-desktop/confirm_new.png)

##### Step 2. Running or Installing Haiku

At this point, you can run Haiku from the anyboot image or install Haiku to the virtual hard disk. To install Haiku, you can follow the [Installation Guide](/get-haiku/installation-guide).

### Additional steps <a name="part_additional"></a>

##### Configuring the virtual machine

To configure the virtual machine, on the Veertu Desktop window, click the menu button (the rightmost button), then choose **`Edit VM`**. The Edit VM window will appear.

The Edit VM window is pretty simple. In the General tab, you can edit the VM name, description, and boot order.

To increase the amount of memory allocated to the VM, we can do that in the Hardware tab. The Hardware tab is also pretty simple, simply change the amount of memory and the unit if needed, then close the Edit VM window.

![](/files/guides/virtualizing/veertu-desktop/edit_vm.png)
