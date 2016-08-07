+++
type = "blog"
author = "axeld"
title = "APM Support"
date = "2006-02-04T13:03:00.000Z"
tags = ["apm"]
+++

Since a few days, we have a working APM driver in our kernel. APM stands for Advanced Power Management. It's a service as part of the computer's firmware commonly called BIOS in the x86 world. The latest APM standard, version 1.2, is already almost 10 years old. Today's computers do still support it, even though the preferred method to have similar services (among others) is now ACPI, or Advanced Configuration and Power Interface. Thanks to Nathan Whitehorn effort and Intel's example implementation, we even have the beginnings of ACPI support in Haiku as well.

But let's go back to APM. Theoretically, it can be used to put your system in one of several power states, like suspend or power off. You may also read out battery information from your laptop as the estimated remaining power. It also supports throttling the CPU for some laptops, but it only differentiates between full speed and slower speed.

The driver doesn't do much yet, but it should let you shutdown your computer. In addition to that, it follows the standard and periodically polls for APM events. An example APM event would happen when you connect the AC adapter to your laptop.

By default, the driver is currently disabled, but that might change when I have a better picture about on which hardware it doesn't run yet. I have successfully tested in on 4 different systems over here, but I also have one negative report.

If you're interested to test Haiku's APM support yourself, you can add the line "apm true" to your kernel settings file. When you then enter "shutdown -q" in the Terminal, the system should be turned off. If an error comes back, APM couldn't be enabled for some reason. If nothing happens, your computer's APM implementation is probably not that good. In some rare cases, your computer may refuse to boot with APM enabled - in this case, you can disable APM in the safemode settings in the boot loader. If it really doesn't work, I would be very interested in the serial debug output in case you can retrieve it.

In other news, we now also have syslog support in the kernel, as well a on screen debug output during boot. The former can be enabled in the kernel settings file "syslog_debug_output true", while the latter can be enabled in the safemode settings of the boot loader. "syslog" is a system logging service that currently stores its output file under /var/log/syslog. Note that you must shutdown the system gracefully to make sure the log could be written to disk.