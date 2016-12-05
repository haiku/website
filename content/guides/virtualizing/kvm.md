# Emulating Haiku in KVM

VM is an ideal way of testing operating systems without having them physically installed. Installing Haiku into VM is a solution for those who don't want to set it up into a physical computer.

There are several methods offered to install Haiku. These include Vmdk images, Raw images, Iso images and Anyboot images which are a hybrid of the latter two images. The Raw image (and thus the Anyboot image) is a preinstalled environment, in which the Virtual Hard Disk size cannot be customized, but going through the installation process is not required.

In this guide the Haiku operating system is being run under virtual circumstances using Ubuntu 12.04 LTS, KVM, and Virt-Manager. but you can use any distribution of Linux that supports KVM.

In this guide, we have used ISO and Anyboot/Raw images. The required files can be found on the Get-Haiku page of this website which is located [here](http://www.haiku-os.org/get-haiku). Both the ISO and anyboot images are available there, do select the closest mirror to enjoy higher transfer rates. Verify using the checksums to make sure that the downloaded files are not corrupted as they are big files.

### Downloading KVM on Ubuntu 10.4 and above

If your Ubuntu version is over 10.04, you can enter the following into the terminal and set up KVM and Virt-manager.

```
sudo apt-get install qemu-kvm libvirt-bin ubuntu-vm-builder bridge-utils
```
```
sudo apt-get install virt-manager
```

### Installing and running Haiku from an ISO image

The following guide will describe the installation of Haiku on Virtual Machine, using an ISO image.
Once KVM is set up and the ISO image is downloaded, you can start the installation.

First, create a new virtual machine.

![image1](http://www.haiku-os.org/files/image1_0.png)

Give a name to your Haiku virtual machine and choose the method of OS installation, which is **`Local install media`** in this case and click **`Forward`**.

![image2](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/kvm/image2.png)

Browse to the ISO image and choose **`Other`** as the operating system type and **`Generic`** as the version. **`Forward`** to go to the next step.

![image3](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/kvm/image3.png)

Here, we're supposed to choose memory and CPU settings. It is better to assign more than 256M of RAM for smooth running ; too much, on the other hand, may cause a lag for the host.

![image4](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/kvm/image4.png)

After choosing your desired memory and CPU settings, click **`Forward`**.

![image5](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/kvm/image5.png)

Now, you can run Haiku. You can either have it installed onto the virtual hard disk or just try it out.

### Installing and running Haiku from Anyboot or Raw images

The following guide will describe the installation procedure of Haiku on Virtual Machine, using a VM disk image.

Give a name to your Haiku virtual machine and choose the method of OS installation, which is **`Import existing disk image`** in this case and click **`Forward`**.

![image9](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/kvm/image9.png)

Provide the existing storage path for the Anyboot image to be used and choose an operating system type and version. Let us select Other and Generic each for OS Type and Version. Click **`Forward`** and move on.

![image10](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/kvm/image10.png)

Memory and CPU settings to be decided. More than 256M of RAM is recommended for smooth running ; too much, on the other hand, may cause a lag for the host.

![image11](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/kvm/image11.png)

Click **`Forward`** and **`Finish`**.
Now, you can run Haiku. You can either have it installed into a virtual hard disk or try it out.

### Additional Steps

// TODO

### Troubleshooting

##### Advanced options warning

If, in the middle of the installation process, you encounter the following exclamation mark under Advanced options:

![image12](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/kvm/image12.png)

This can be fixed by downloading and installing Hardware Abstraction Layer from Ubuntu Software center.

![image13](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/kvm/image13.png)

##### Unable to connect to Libvirt

If, after running Virt-manager, you run into this pop-up:

![image14](https://sites.google.com/site/nyhusr/Home/haiku-os-files/haikuarticles/kvm/image14.png)

Then the solution is to run Virt-manager with administrative priviliges, which can be done in the terminal:
```
sudo virt-manager
```
