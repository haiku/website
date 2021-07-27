+++
type = "news"
title = "Haiku, Inc. sponsoring hardware purchases for RISC-V port"
author = "leavengood"
date = "2021-07-01 08:50:00+04:00"
tags = ["RISC-V", "riscv64", "hardware", "haiku-inc", "donations"]
+++

RISC-V is an interesting, relatively new and open source hardware platform. The inventors of RISC-V created a company called HiFive and that company recently released a desktop-class System on a Chip (SoC) board called [HiFive Unmatched](https://www.sifive.com/boards/hifive-unmatched). Long before this release Haiku developer Alexander von Gluck (kallisti5) had pre-ordered this board and had begun work on the Haiku port to RISC-V, making some progress on the boot loader, u-boot support and memory mapping.

Starting about two months ago Haiku developer X512 also started working on the RISC-V port for Haiku, but from another angle. All the details are too much for this post, but they can be read in [his associated Haiku forum post](https://discuss.haiku-os.org/t/my-haiku-risc-v-port-progress/10663). To summarize: he ported a small RISC-V emulator called [TinyEmu](https://bellard.org/tinyemu/) to Haiku, wrote a toy operating system and other tools to learn the platform, then he slowly got Haiku working in that emulator, with full GUI support, progressively getting more and more things working. He then started doing similar work in QEMU, which more accurately emulates real hardware. All of this was done in Haiku itself running on an x86 computer.

While so far it has all been done in emulation, this is absolutely the furthest Haiku has gotten on any other platform than x86.

Given the tremendous progress X512 made on the port with TinyEmu the [community asked if Haiku, Inc. could sponsor the purchase of the HiFive Unmatched board for X512](https://discuss.haiku-os.org/t/call-for-haiku-inc-and-haiku-community-risc-v-port/10929), and after a short deliberation Haiku, Inc. agreed to do so. X512 has already been sent enough money to purchase the board and he has already ordered it. The board is expected to arrive by July 6, 2021.

In addition, even though he did not ask, Haiku, Inc. decided to reimburse Alexander for his purchase of a HiFive Unmatched as well. This was a combination of matching the same sponsorship as was done for X512 and also thanking Alex for his dedication to the community and his tireless efforts on Haiku infrastructure and many other contributions, such as his own work on the RISC-V port.

We expect both X512 and Alexander will continue to collaborate on the port, and with both having the same hardware we expect great results.