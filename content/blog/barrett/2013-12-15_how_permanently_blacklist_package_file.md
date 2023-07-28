+++
type = "blog"
author = "Barrett"
title = "How To Permanently Blacklist a Package File"
date = "2013-12-15T19:17:40.000Z"
tags = ["remove driver", "hpkg", "blacklist", "packagefs", "packages"]
+++

<div class="alert alert-info">
<strong>This is a blog post preserved for historical purposes.</strong><br>
This blog post is presented as it was written by the original author, and may not include updates following changes in Haiku later versions. Up to date information is maintained in the <a href="/guides/daily-tasks/disable-package-entries">"daily tasks" guide</a>.
</div>

With the advent of package management and hrev46391, it has become possible to prevent a package from being extracted at boot time.
From a suggestion of Matt, and with the contribution of Luroh (thanks!), i would like to explain you how to blacklist a package file in Haiku.

In Haiku's <a href="/docs/userguide/en/bootloader.html"> boot menu </a>, there is a 'Blacklist entries' option available. This method will only let you disable system packages, and only until the next time you reboot.

You may know, since the package manager has been added to Haiku, some directories are read only, so unlike the past, isn't possible to just delete the driver. The Blacklist functionality addresses the issue that it may be necessary to remove a problematic file such as a library or a bugged driver, which would otherwise require editing the containing package file.

So let's go to the very simple steps to do that :

<ol>
 <li>Figure out which file in which package you want to blacklist, especially keep in mind if the file is contained in a system package or in a user one.</li>
 <li>The second step is to create a text file named 'packages' in /boot/system/settings or in /boot/home/config/settings/global, respectively the first directory is used to blacklist system packages the second is used for user packages.</li>
</ol>

The final step is to fill the packages file with something like that :

<pre>Package 'packagename' {
	EntryBlacklist {
		'entrypath'
		...
	}
}
</pre>

'packagename' is the name of the package without version, for example 'haiku'.

'entrypath' is an installation location relative path, e.g. "add-ons/Translators/FooTranslator".

This way, blacklisted entries will be ignored by the package_fs. So that they won't appear in the file system.

Let me give a pratical example.

In my case i had the broadcom570x driver to blacklist, so i created the packages file under /boot/system/settings with this content :

<pre>Package haiku {
	EntryBlacklist {
		add-ons/kernel/drivers/bin/broadcom570x
	}
}</pre>

Then i saved it and rebooted. Once Haiku start the package is re-mounted and the file is ignored by the packagefs.

Hope it was interesting!
