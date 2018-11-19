+++
type = "blog"
title = "Partial Outage"
author = "kallisti5"
date = "2018-11-06 00:25:52-06:00"
tags = ["haiku", "software"]
+++

This evening a standard operating system upgrade has once again turned fatal.

Our infrastructure still depends on a single bare metal server at Hetzner which
continues to be our downfall. This evening a (tested) OS upgrade failed resulting
in maui going MIA. I requested KVM access to attempt repair of maui after it was
missing for ~15 minutes, however we were stuck waiting almost 2 hours for the KVM
from Hetzner.

I made the call to reboot the system after around 45 minutes to try and get it online,
I think this interrupted the OS upgrade and rested in a corrupted OS installation.

After Hetzner finally provisioned us the KVM, I mounted the OS partition to attempt
a chroot repair. While the filesystem wasn't corrupted, the binaries were throwing
various I/O errors when executed.

I then attempted to reinstall the OS using the Hetzner VNC installer (yes, VNC).
Their VNC installation media locks up accessing the existing filesystems (containing
valid data we want to save mind you)

Finally, at 10 pm (with sleeplessness setting in) I decided to go rouge and move
the critical infrastrucure containers to a vm @ scaleway under the Haiku, Inc. email
and my credit card.

This is where we are at the moment. Critical services (such as git) are running, but
several important things like our package repositories are down.

After some sleep, we'll press onward to resolving these issues.

For the latest status:  https://status.haiku-os.org
