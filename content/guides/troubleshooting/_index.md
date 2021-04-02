+++
type = "article"
title = "Troubleshooting"
date = "2017-05-03T15:30:00.000Z"
tags = []
+++

Troubleshooting operating system problems can be difficult.

To give us the best assistance resolving bugs within Haiku, please be sure to add details to existing bug reports, or create a new bug report with as much information as possible.  More information on reporting bugs can be found [here](https://dev.haiku-os.org/wiki/ReportingBugs)

# Boot Problems

When Haiku fails to boot on a machine, it generally fails in one of the following ways:

  1. White [Kernel Debug Land](#kernel-debug-land) (kdl) box
  2. [Blank or corrupted screen after booting](#blank-or-corrupted-screen-after-booting)
  3. [Instant reboot](#instant-reboot)

## Kernel Debug Land

The Kernel Debug Land is the debugger built into Haiku's kernel and represents a captured critical exception within the operating system.

### Mitigation

Non-fatal KDL exceptions can sometimes be worked around by typing `continue` into the KDL screen. This rarely works however as KDL exceptions are generally raised with good reason.

If the source of the problem is identified in the KDL, the add-on or driver can be disabled using the `Disable component` menu of the [bootloader ](/docs/userguide/en/bootloader.html).

#### Known Issues and workarounds:

  * Attempting to clone non-user-clonable kernel area!
    * This is due to Haiku's SMAP protections.  The mentioned driver is attempting to access kernel memory without using proper procedure. You can disable SMAP protections by choosing `Disable SMEP and SMAP` in the [bootloader](https://www.haiku-os.org/docs/userguide/en/bootloader.html). [Reporting](#reporting) these errors with a picture of the screen is helpful!

### Reporting

KDL exceptions should always be reported to the Haiku bug tracker (either by searching for existing bugs, or reporting new undiscovered bugs).

Since obtaining the data in a KDL can be challenging at times, the following steps are generally used to report KDL exceptions to the Haiku developers:

  1. `bt` is run to ensure a detailed backtrace is shown on screen.
  2. A picture is taken of all text on the screen ensuring the text is as clear as possible.
  3. The picture is provided to existing or new bug reports with the architecture and build (hrevXXXXXX)

## Blank or corrupted screen after booting

A black, blank, or corrupted screen after booting can be caused by several different issues and can be a tricky issue to debug.

### Mitigation

The easiest approach to resolving a black/blank/corrupted screen at boot is to leverage the `Use fail-safe video mode` [boot option](/docs/userguide/en/bootloader.html). This will disable any specialized hardware acceleration or mode setting and fall back to basic VESA or Frame buffer based video resolutions and rendering.

{{< alert-info "Tip" "You can configure Haiku to always boot using the fail-safe video driver by enabling 'fail_safe_video_mode' in ~/config/settings/kernel/drivers/kernel">}}

### Reporting

Reporting detailed information from computers experiencing black/blank/corrupted screens can be difficult given their nature. Sometimes the host is responsive, however the end user is unable to determine the state of the machine.

  1. [Serial Debugging](troubleshooting/serial) is the fastest and most accurate way to obtain debug data from a uncooperative system. This method however requires a built-in serial port and specialized hardware and cables.
  2. Obtaining system logs is possible in some circumstances.
     - Boot the system until the black screen is encountered and wait 30 seconds.
	 - Hold {{< keyboard CTL >}} + {{< keyboard ALT >}} + {{< keyboard DEL >}} for 5 seconds (or until system reboots)
	 - Boot the system, leverage the `Use fail-safe video mode` [boot option](/docs/userguide/en/bootloader.html).
	 - Make a copy all files in /var/log/syslog* and provide to Haiku via an existing or new bug report.

## Instant Reboot

Instant reboot represents the worst-case scenario and can be extremely difficult to troubleshoot.

### Mitigation

Leveraging various [boot options](/docs/userguide/en/bootloader.html) such as `Safe mode` may provide relief to these serious issues. Reporting instant reboot issues using the steps below to the Haiku developers is highly encouraged.

### Reporting

[Serial Debugging](troubleshooting/serial) is the only real way to obtain debugging data from instant reboot problems. This method however requires a built-in serial port and specialized hardware and cables.
