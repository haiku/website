+++
type = "blog"
author = "emitrax"
title = "Keep browsing"
date = "2007-04-18T17:33:30.000Z"
tags = ["usb", "soc", "code"]
+++

I've been reading some more code and I'm getting more confident with it.

Basically data transfer is done with memcpy.

In the ehci controller, registers are mapped every time a controller is found. This is done in the controller constructor.

As the ehci specs says:
<i>Register Space. Implementation-specific parameters and capabilities, plus operational control and
status registers. This space, normally referred to as I/O space, must be implemented as memory-mapped
I/O space.</i>

So...
<pre>
EHCI::EHCI(pci_info *info, Stack *stack)
...
 // map the registers
 fRegisterArea = map_physical_memory("EHCI memory mapped registers",
                (void *)physicalAddress, mapSize, B_ANY_KERNEL_BLOCK_ADDRESS,
                B_KERNEL_READ_AREA | B_KERNEL_WRITE_AREA | B_READ_AREA | B_WRITE_AREA,
                (void **)&fCapabilityRegisters);
...
 fCapabilityRegisters += offset;
 fOperationalRegisters = fCapabilityRegisters + ReadCapReg8(EHCI_CAPLENGTH);
...
</pre>

fCapabilityRegisters and fOperationRegisters will be used to access the registers. Capability and Operation register functions are available to make things easier. Good.

In the UHCI controllor, things are a little bit different.

The specs says:
<i>USB Host Controller I/O Registers. This block of Control and Status registers is I/O mapped into PCI I/O
space and controls the various operations of the USB (Table 2). The Base portion of the address location is set
via a PCI configuration register.
</i>

<pre>
UHCI::UHCI(pci_info *info, Stack *stack)
...
     fRegisterBase = sPCIModule->read_pci_config(fPCIInfo->bus,
                fPCIInfo->device, fPCIInfo->function, PCI_memory_base, 4);
        fRegisterBase &= PCI_address_io_mask;
....
</pre>

A pci_module_info struct is used to access the registers by using fRegisterBase. Like with the ehci controller class, functions to access registers are also provided. 

I guess I'll go with the uhci controller first, even though I'm still far from start coding.

Both class controllers (ehci and uhci) have a static method <b>AddTo</b> which is called to look for controllers. They both have very similar code

<pre>
EHCI::AddTo
...
 for (int32 i = 0; sPCIModule->get_nth_pci_info(i, item) >= B_OK; i++) {
                if (item->class_base == PCI_serial_bus && item->class_sub == PCI_usb
                        && item->class_api == PCI_usb_ehci) {
...
}
...
                        EHCI *bus = new(std::nothrow) EHCI(item, stack);
...
</pre>

What I haven't figure out yet is who and when is calling this methods.

<pre>
host_controller_info ehci_module = {
        {
                "busses/usb/ehci",
                0,
                ehci_std_ops
        },
        NULL,
        EHCI::AddTo
};
</pre>

I guess I'll find my answer in the BeBook, or perhaps some of you can save me some time?! :)