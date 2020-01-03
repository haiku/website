+++
type = "article"
title = "Emulating Haiku on Amazon Web Services"
date = "2020-3-2T01:50:00.000Z"
tags = []
+++

Amazon Web Services (or, in short, AWS) is one of the most prominent cloud computing platforms that's widely used both by private individuals and businesses alike. Since booting directly from an ISO file is not possible, we will have to create an [Amazon Machine Image (AMI)](https://en.wikipedia.org/wiki/Amazon_Machine_Image) based on a virtual appliance.

##### Go to section

* [Preparing for this tutorial](#part_prepare)
* [Preparing the virtual disk image](#part_disk)
* [Preparing the environment](#part_environment)
* [Preparing the AMI](#part_ami)
* [Deploying the AMI on the AWS platform](#part_deployment)

### Preparing for this tutorial <a name="part_prepare">

Disk files represent physical devices but in the form of a file. During the preparation phase, we will need to download a Haiku image file from [here](https://www.haiku-os.org/get-haiku). Then, we will have to use [VirtualBox](https://www.virtualbox.org/) in order to create a disk image that can be later converted into an AMI image file.

If you're not familiar with this process, use the **[Virtualizing Haiku in VirtualBox](https://www.haiku-os.org/guides/virtualizing/virtualbox/)** tutorial as a reference.

From the perspective of the operating system, disk images can be compared to physical hard drives and other forms of storage. Therefore, it should be noted that while creating your virtual machine in VirtualBox, you should ensure that the disk space that was allocated to the drive does not cross your quota on the AWS platform in order to avoid any unnecessary charges.

### Preparing the virtual disk image <a name="part_prepare">

##### Spotting the virtual disk image

After following through the process, you should now have a `.vdi` file alongside other relevant files. Its precise location can vary according to your operating system, but generally speaking;

- If you're using Windows, you can find the files of Haiku's virtual machine in the following directory:

```
C:\Users\<YOUR USERNAME>\.VirtualBox
```

Replace `<YOUR USERNAME>` with your username.

- In Linux and Solaris operating systems, you can find them in your home directory:

```
~/VirtualBox VMs
```

- In Mac OS X environments, the files can be found here instead:

```
~/Library/VirtualBox
```

 `.vdi` files are not supported by one of the tools that we will use later, we will have to convert our `.vdi` file to a `.vhd` file, which shares a lot of similarities and is also properly supported. In order to do that, we will quickly use a shell command that VirtualBox provides to us and wait for the process to finish:

```sh
vboxmanage clonehd <source path of the .vdh file> <destination path of the .vhd file> --format VHD
```

### Preparing the environment <a name="part_environment">

Now that we have successfully extracted the `.vdi` file, we will need to convert it into an AMI image. Fortunately for us, Amazon provides tools that are designed for this operation.

- In Debian/Ubuntu machines, you can obtain them by running the following command inside of a Terminal:

```sh
sudo apt install ec2-api-tools ec2-ami-tools
```

- In Linux-based operating systems that use the [Red Hat Package Manager](https://rpm.org) (RPM), such as CentOS, Fedora, Red Hat Linux, you can obtain the tools by running these commands instead:

```sh
sudo yum install ruby

# Install ec2-api tools
wget http://s3.amazonaws.com/ec2-downloads/ec2-api-tools.zip
unzip ec2-api-tools.zip
cd ./ec2-api-tools-*
mkdir /opt/ec2 # feel free to use other directories
mv ./* /opt/ec2/tools


# Install ec2-ami-tools
wget https://s3.amazonaws.com/ec2-downloads/ec2-ami-tools.noarch.rpm
sudo yum install ec2-ami-tools.noarch.rpm
```

We're nearly done! All we need is to store our credentials in variables, since we will use them multiple times across the rest of the tutorial.

For convenience, we will set our [AWS Security Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html) as two variables; `AWS_KEY`

```sh
export AWS_KEY="<YOUR AWS KEY>"
export AWS_SEC="<YOUR AWS SECRET>"
```

Make sure to replace `<YOUR AWS KEY>` and `<YOUR AWS SECRET>` with your actual AWS key and secret.

### Preparing the AMI <a name="part_ami">

##### Uploading the disk image

Now that everything is set and in order, we can finally upload the image to Amazon!

```sh
ec2-import-volume \
    --format vhd \
    --volume-size 4 \
    --region us-east-1 \
    --availability-zone us-east-1a \
    --bucket haiku-folder \
    --owner-akid $AWS_KEY --owner-sak $AWS_SEC \
    --aws-access-key $AWS_KEY --aws-secret-key $AWS_SEC \
    Haiku.vhd
```

Before proceeding any further, we will go over some of the parameters which you may find necessary to change.

- `--volume-size` is the parameter that defines the amount of space that will be allocated for the virtualized environment. In this case, we chose the number `4` because it is the same one as the one we picked during the installation process in the [VirtualBox tutorial](https://www.haiku-os.org/guides/virtualizing/virtualbox/).

- `--region` is the parameter that sets the server's region, which is independent from other regions. The `--availability-zone` parameter sets the availability zone -- those also hold a degree of independence, but are a part of something that could be compared to an interlinked cluster. You can learn more about this topic in the [AWS User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)

- `--bucket` defines the name of your Amazon S3 Bucket. You can find out more about about buckets [here](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html).


##### Creating the AMI

Now that we have uploaded our image, we can now proceed with making a snapshot:

```sh
ec2-create-snapshot \
   --aws-access-key $AWS_KEY \
   --aws-secret-key $AWS_SEC \
   --region us-east-1 \
   vol-XXXXXXXXXX
```

`vol-XXXXXXXXXX` stands for the volume that is going to be used for the snapshot. You can learn more about Amazon EBS Volumes [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volumes.html). 

Snapshots are particularly useful in our case, because we can make an AMI out of it:

```sh
ec2-register \
   --name "Haiku R1/beta1 AMI" \
   --aws-access-key $AWS_KEY \
   --aws-secret-key $AWS_SEC \
   --region us-east-1 \
   --architecture x86_64 \
   --root-device-name /dev/sda1 \
   --virtualization-type hvm \
   --snapshot snap-XXXXXXXXXX
```

### Deploying the AMI on the AWS platform <a name="part_deployment">

Your new AMI should now appear in the `AMIs` section of the AWS Explorer. We can now launch an instance of the AMI by clicking on the `My AMIs` tab and selecting your newly made Haiku AMI.

If it hasn't appeared yet, then you may have to wait for a bit longer or click `Refresh`.
