+++
type = "blog"
title = "[GSoC 2024] Sound VirtIO: Improving Haiku's virtualization as a guest OS"
author = "diegoroux"
date = "2024-05-16 22:11:12-06:00"
tags = ["gsoc", "gsoc2024", "virtio", "sound"]
+++

# short whoami

Hello! I'm Diego Roux, an undergraduate engineering student at Universidad
Iberoamericana (Mexico). Passionate about low-level stuff, OS/kernel dev,
embed libs, and more!

I'm grateful to be working under Haiku for this GSoC! So, I'll be working
to add support for sound virtio, enhancing virtualization by working with
the VM.

I'll be under the guidance of
[@Korli](https://discuss.haiku-os.org/u/korli/summary). Thanks! :D

# brief intro + my plans
Whenever we boot a VM with Haiku in it, it needs to ensure we have a proper
environment, emulating all physical devices we require (e.g. ethernet, sound,
video, graphics, etc); great, isn't it? we have everything nearly as we
would on actual hardware, but as with all great things in life, this comes
with a downside, emulation is (for our purposes) computationally expensive
(not really, but it does add some unnecessary overhead).

This is great if we don't want our OS to notice any difference from actual
hardware, in most cases we don't care about it or already know that we're
operating within a VM. So if we are already aware, we could skip the 
whole device emulation and simply indicate to the VM that we need to play
a sound, render something on the screen and so on; this is what virtio is.

Virtio is a virtualization standard where the OS "knows" it's on a
virtualized environment and cooperates with the hypervisor.

By implementing virtio, we eliminate the simulation overhead, forwarding
Haiku to a state that is overall better, faster, and more optimized
than ever before. And that's what I'll be trying to achieve for this 
GSoC period.

# trajectory
I'll be posting a monthly blog here to share all the progress made.
Additionally, I'll frequently update my personal blog (of which I'll
post soon) with the latest developments.

To keep everything organized, I'll maintain a mirror repository on
[my GitHub](https://github.com/diegoroux/) with only the driver code.

I'll also be opening a thread soon for discussions. I appreciate any
and all feedback you might have.

Also, if I finish the virtio driver before the GSoC ends,
I'll shift my focus to other optimizations to enhance the
virtualized experience.

To end, I would like to thank Haiku for this opportunity, having me
as a GSoC participant. I'm looking forward to working with and meeting
this community!