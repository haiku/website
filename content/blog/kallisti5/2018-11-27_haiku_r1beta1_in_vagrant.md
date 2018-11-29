+++
type = "blog"
title = "Haiku R1/beta1 in Vagrant"
author = "kallisti5"
date = "2018-11-27 19:37:27-06:00"
tags = ["haiku", "software"]
+++

Over the last year, I have been slowly pushing patches upstream to Vagrant introducing native Haiku support. Vagrant is an open-source tool to build and maintain portable virtual development environments. Essentially, Vagrant lets you deploy and rapidly customize a Haiku virtual machine with programmatic scripts.

Since we now have a new stable release, I have prepared some [updated R1/beta1 images](https://app.vagrantup.com/haiku-os) to play with under an official Haiku, Inc. account.

## Requirements

 * A linux, OS X, or Windows machine.
 * [VirtualBox](https://www.virtualbox.org/) installed and functional.
 * [Vagrant](https://www.vagrantup.com/) installed.

## Starting Haiku under the VirtualBox provider

The example below starts up a x86_64 Haiku VM.

Change ```haiku-os/r1beta1-x86_64``` to ```haiku-os/r1beta1-x86_gcc2h``` below for a 32-bit (BeOS ABI compatible) virtual machine.. 

 * Create a new work directory and enter it
  * ```mkdir haiku-r1beta1 && cd haiku-r1beta1```
 * Create a new file names "Vagrantfile" in this path.
```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|
	# For a complete reference, please see the online documentation at
	# https://docs.vagrantup.com.
	config.vm.box = "haiku-os/r1beta1-x86_64"
	config.vm.synced_folder ".", "/vagrant", disabled: true
	# Example running custom commands after startup
	#config.vm.provision "shell", inline: <<-SHELL
	#  pkgman update
	#SHELL
end
```
 * Run ```vagrant up``` to download startup and configure the local Haiku VM.
 * Run ```vagrant ssh``` to bring up a text console within your new Haiku VM.
 * Launch VirtualBox to see the VM and pull up a virtual screen.
