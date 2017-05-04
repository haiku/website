+++
type = "article"
title = "Serial Debugging"
date = "2017-05-03T15:30:00.000Z"
tags = []
+++

# Hardware Serial Debugging

{{< alert-warning "Hardware" "Your system needs to have a built-in serial port to leverage Serial Debugging. Modern laptops commonly lack this port. Desktops will generally have a serial port or a mainboard header for serial port.">}}

## Hardware Required

  * A problematic system with an available built-in serial port.
  * A [main board header](https://www.amazon.com/StarTech-com-Serial-Motherboard-Header-PNL9M16/dp/B0067DB6RU/ref=sr_1_1?ie=UTF8&qid=1493829745&sr=8-1) (if required for problematic system)
  * A second system to capture logs and interact with the system under test.
  * [A null modem cable](https://www.amazon.com/SF-Cable-Null-Modem-RS232/dp/B006W0I3BA/ref=sr_1_2?ie=UTF8&qid=1493829887&sr=8-2) or a [USB serial adapter](https://www.amazon.com/dp/B008634VJY/ref=cm_sw_r_tw_dp_x_SxGczbAYF4XX2)


### Steps

  1. On the machine under test, attach the serial cable to the available serial port.
  2. Plug the serial cable into the second system.
  3. Leverage a serial terminal such as minicom on linux or HyperTerminal on windows. Configure for `115200 8N1`
  4. Boot the Haiku machine and `Enable serial debug output` in the [bootloader](/docs/userguide/en/bootloader.html) debug options. (optional, serial debugging is always on at the time of this writing)


# Virtual Machine Serial Debugging

Serial debugging can also be enabled for Haiku running in a virtual machine. This offers a rapid way to interact with a Haiku machine encountering boot problems.

## QEMU
`-serial stdio` for serial output in the terminal
`-serial file:/tmp/serial-out` for serial output to a file on disk.

## Virtual box
  1. Settings
  2. Serial Ports
  3. `Enable serial port`
  4. `Port Mode` Raw File
  5. `Path/Address` <filename for output>
