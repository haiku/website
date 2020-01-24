+++
type = "article"
title = "Emulating Haiku in Bhyve"
date = "2019-12-8"
tags = []
+++

Virtual instances of operating systems are perfect for all kinds of testing purposes that need to be done in a safe and isolated environment. Installing Haiku in a virtual machine is a solution for people who do not want to install it on their physical computers, but wish to become familiar with it.

In this guide the Haiku operating system is being run under virtual circumstances using FreeBSD and Bhyve.

Moreover, we will be using an Anyboot image, which can be obtained [here](/get-haiku). Both the ISO and anyboot images are available there, do select the closest mirror to enjoy higher transfer rates. Verify using the checksums to make sure that the downloaded files are not corrupted as they are big files.

This guide assumes that you have installed FreeBSD on your device, you have made some basic configurations to your system and you are currently logged in as a user with root access. The Haiku virtual machine will be installed in UEFI mode.

##### Go to section

* [Setting up FreeBSD & Bhyve](#part_bhyve)
* [Downloading Haiku](#part_download)
* [Installing and running Haiku from an Anyboot image](#part_iso)

### Preparing FreeBSD & Bhyve <a name="part_bhyve"></a>

*Considering that FreeBSD is an operating system that is primarily used in server-based applications that do not rely on a graphical environment, this section was added for beginners that are not used to Unix-like terminals. This process is not much different in FreeBSD than in Linux distributions, so feel free to skip this section if you believe that you are capable of managing the download process yourself.*

Before proceeding with the tutorial, you will have to make a few system configurations in order to be able to move on in a smooth manner.

##### CA Certificates

Since Haiku images can be fetched securely only via [HTTPS](https://en.wikipedia.org/wiki/HTTPS), you will need to download some [CA root certificates](https://en.wikipedia.org/wiki/Certificate_authority), as FreeBSD does not ship with them by default. In order to do that, you will need to install the `security/ca_root_nss` package, which is a part of the [FreeBSD ports](https://www.freebsd.org/ports/).

```sh
# feel free to skip this process if you have done it before.
portsnap fetch
portsnap extract

cd /usr/ports/security/ca_root_nss
make install clean
```

Now, follow through the process, and you will be able to fetch the image file securely.

##### Networking & Kernel Preparations

Since `bhyve` consists of kernel modules that ship with FreeBSD by default, you do not need to install the core part of `bhyve`.

However, you will need to load the modules manually in order to use `bhyve`.

```sh
kldload vmm
kldload nmdm
kldload if_bridge
kldload if_tap
```

The kernel modules will only remain loaded until you reboot your machine. In order to make the changes permanent, edit `/boot/loader.conf` by adding:

```sh
# Kernel modules
vmm_load="YES"
nmdm_load="YES"
bridge_load="YES"
tap_load="YES"
```

Now, run the following commands in order to create a network device and a bridge for your virtual machine, in order to make a network bridge (`bridge0`) that is linked to the virtual device `tap0`.

```sh
sysctl net.link.tap.up_on_open=1
sysctl net.inet.ip.forwarding=1

ifconfig tap0 create
ifconfig bridge0 create

ifconfig bridge0 addm tap0
```

But the problem is that the device `tap0` itself is not linked to any physical, working internet source. This means that even though you may have made the network bridge, you still need to link `tap0` to a physical network device. In my case, the device that I need to use is `re0`, but you can find yours by running `ifconfig`.

```sh
ifconfig bridge0 addm re0
```

Lastly, you want to run the following:

```sh
ifconfig bridge0 up
```

Now, make your changes permanent by editing `/etc/sysctl.conf/` and appending the following:

```sh
sysctl net.link.tap.up_on_open=1
sysctl net.inet.ip.forwarding=1
```


### Downloading the Haiku Anyboot image <a name="part_download">

Now that you have made the necessary changes to your system, you can securely obtain a Haiku anyboot image. You will need to install `wget` to download the image file and you will additionally need the `unzip` package to extract it, as the image file is packed in a `.zip` archive together with a `ReadMe` file.

```sh
pkg install wget unzip
```

After installing the two packages, we will fetch the archive containing the anyboot image file and then unzip it. For the purposes of this tutorial, the download of the 64-bit `r1beta1` from a specific Haiku mirror located in *East Coast, Germany* will be demonstrated, but if you want to choose a different mirror or a different version, then please consult the website [here](https://www.haiku-os.org/get-haiku/) and replace the following link accordingly.

```sh
wget https://s3.wasabisys.com/haiku-release/r1beta1/haiku-r1beta1-x86_64-anyboot.zip 
unzip haiku-r1beta1-x86_64-anyboot.zip
```

As mentioned earlier, the following files will be extracted in your current working directory:
- `haiku-release-anyboot.iso`
- `ReadMe.md`

We will need the `haiku-release-anyboot.iso` file later, in order to virtualize Haiku.

### Installing and running Haiku from an Anyboot image <a name="part_iso"></a>

Now that you have made the required configurations, as well as the networking configurations, you may want to make a new folder in order to keep things clean, and then move your Haiku anyboot image there.

```sh
mkdir haiku-vm
mv haiku-release-anyboot.iso haiku-vm
cd haiku-vm
```

Great! Now that you have a dedicated directory to work on, create a virtual disk for your virtual machine.

```sh
# feel free to adjust the number 16G according to your needs
truncate -s 16G haiku-guest.img
```

In order to simplify the process, we will use `vmrun.sh`, an example script which can be found in the `/usr/share/examples/bhyve` folder.

```sh
cp /usr/share/examples/bhyve/vmrun.sh .
sh vmrun.sh -c1 -E -i -I haiku-release-anyboot.iso haiku
```

- `-c1` stands for the number of processor cores that will be allocated for the machine. In this scenario, we are using 1 core, which is a recommended option.
- `-E` boots the the machine in UEFI mode.
- `-i` forces the boot of the anyboot image.
- `-I` specifies the location of the image file. In this case, since we have placed `haiku-release-anyboot.iso` in our current working directory, the file name should suffice.
- `haiku` stands for the name of the virtual machine, which can be modified or changed.

Some additional parameters which could prove to be useful are the following:

- `-m` can change the allocated memory size, which is `512M` by default.
- `-v` is an option that delays the boot until you connect with a VNC client to the host machine. The default port of the VNC server is `5900`.
- `-P` allows you to change the port of the VNC server.

Use the `--help` parameter if you need additional information.

Other than that, congratulations! If everything went according to plan, you should now have an internet-connected Haiku virtual machine running on top of Bhyve!
