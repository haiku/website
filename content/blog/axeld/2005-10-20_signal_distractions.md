+++
type = "blog"
author = "axeld"
title = "Signal Distractions"
date = "2005-10-21T01:17:00.000Z"
tags = ["smp", "signals"]
+++

It took a bit longer to get the dual machine up and running again - it has two 500 MHz PIIIs and the hard drive is a bit older as well, so it took about two hours to update the source repository and get it compiled.<br /><br />While waiting for the machine to complete its task, I had the time to look into some other known issues of our code, and clean the signaling code a bit. We are now able to handle signals with interrupts turned on, some minor bugs went away, and there is now support for sigsuspend() and sigpending() - nothing earth shaking, but definitely a step into the right direction.<br /><br />There were some other distractions, so I played around with SMP only shortly - I am just sure now that it still doesn't work :-)<br />Shortly after the second CPU steps in, both CPUs seem to come to a halt. I don't know yet what's causing this, but it seems to be a single basic problem - let's just hope I don't waste too much time searching for it.