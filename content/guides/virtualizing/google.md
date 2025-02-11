+++
type = "article"
title = "Setting up Haiku on Google Compute Engine"
date = "2024-10-24T19:04:00.000Z"
tags = []
+++

Pre-created Haiku r1/beta5 images are available on Google Cloud Platform's Compute Engine.
To deploy a Haiku VM to Google Compute Engine, all you need is the gcloud CLI tool.

## Preparing gcloud cli

Follow [the directions](https://cloud.google.com/sdk/docs/install) to install ```gcloud```

## Deploying Haiku

To deploy a Haiku VM, you simply need to leverage the official Haiku, Inc. image via the gcloud sdk

> There is a cost to deploying VM's to Google Cloud. Make sure you understand the costs
> before deploying systems.

```
gcloud compute instances create haiku-test \
  --zone=us-central1-a \
  --machine-type=e2-micro \
  --network "default" \
  --maintenance-policy "MIGRATE" \
  --image-family "haiku-r1beta5-x64" \
  --image-project=haiku-inc \
  --enable-display-device \
  --boot-disk-size "10" --boot-disk-type "pd-balanced" \
  --metadata=ssh-keys="user:ssh-ed25519 AAAACRANDOMSTRING alex@haiku-inc.org"
```

The above:

* Creates a new VM called "haiku-test"
* Places it into the us-central1-a zone
* Using the default network VPC
* Will migrate the VM when needed
* Using the latest haiku-r1beta4-x64 image from the haiku-inc project
* The boot disk will be the minimum 10GiB (you can create an additional partition to use the extra 6 GiB)
* The boot disk will be a balanced disk (pd-ssd is also available for an additional cost)
* Inject the SSH key for the "user" account.  Your SSH public key should go here.
  * See your local ~/.ssh/id_ed25519.pub for your public key

```
created [https://www.googleapis.com/compute/.../haiku-test].

NAME        ZONE           MACHINE_TYPE  PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP    STATUS
haiku-test  us-central1-a  e2-micro                   10.128.0.5   34.133.205.74  RUNNING
```

## Accessing Haiku

> Password authentication has been disabled within the Google Compute Engine image for security
> reasons.  However, you can add as many SSH public keys as you like for the "user" user.  sshd
> will dynamically receive the new keys from the Google metadata servers.

Now, using the SSH keys specified in the metadata:

```
$ ssh user@34.133.205.74

Warning: Permanently added '34.133.205.74' (ED25519) to the list of known hosts.

Welcome to the Haiku shell.

~> 
```
