+++
type = "blog"
author = "Barrett"
title = "Jack2 : A Personal Analysis (Part #1)"
date = "2013-07-02T12:40:54.000Z"
tags = ["jack2", "media_kit"]
+++

<strong>Intro</strong>

In the last year i managed to play a bit more with the Haiku media_kit.
It was already discussed in various places if jack2 should be adopted, ported, or someway integrated into Haiku. There are various opinions out there, and more or less going down into the topic i want to show you what i think about.

Jack2 is a real-time audio server for UNIX systems, to be more specifical a smp focused reimplementation of Jack (which is single-threaded), it provides a protocol used by audio apps for inter-communication. It is gaining a very good number of apps supporting it and it's becoming interesting also for professional audio.

Besides GNU/Linux there are ports available for various operating systems, such as FreeBSD, Windows, Solaris and Mac OS X. The interesting thing about the OS X port, is the availability of a JackRouter which allow to route audio buffers between jack apps and core audio apps.

The idea is a lot similar to what the Haiku media_kit provide.
There are various differences, which includes jack lacking of video support and multiple formats.

Jack force every app to use 32 bit floating point values for their buffers, and the motivation of that is probably to prevent any latency due to resampling algorithms. This is very different from what the media_kit do, since in Haiku a mechanism is provided to support format negotiation and painless audio resampling.

The following text is a resume of some <a href="http://www.versut.com/category/jack2/"> articles</a>  i wrote in my blog.

<strong>The Narrow Way</strong>

So, a day i decided to checkout the source and i started some exploration, to see how it's feasible a port of jack2, the resulting work is located at my <a href="https://github.com/Barrett17/jack2-for-haiku"> github page </a> and the haiku specific code is located in a <a href="http://github.com/Barrett17/jack2-for-haiku/tree/master/haiku/">subdirectory</a> as other operating systems. Unexpectly it worked, trying to connect jack_rec and jack_simple_client produce the expected sinusoidal sound in the file.

Unfortunately excluding for now the noticeable lack of any media_kit backend, there are some other problems to be resolved before :

<ul>
 <li> The jack shm implementation is not working as should (probably due to https://dev.haiku-os.org/ticket/2657)</li>
 <li> Haiku is not supporting posix real time thread priorities (https://dev.haiku-os.org/ticket/8600)</li>
 <li> I had to comment some memory locking related code, due to the lack of mlock/mlockall support.</li>
 <li> Jack warn about lots of graph reorders.</li>
 <li> jack_test is not passing some tests.</li>
 <li></li>
</ul>

In the meantime, i've also done some brainstorm for possible solutions (in the same order) :

<ul>
 <li></li>
 <li> The best solution is probably to just fix the bug.</li>
 <li> The idea is to replace the actual HaikuThread class (substantially a temporarily hack) and set
 it to inherit directly from JackThread instead of JackPosixThread, this would allow to use internally
 the Haiku implementation of threads, just emulating what jack is expecting. </li>
 <li>Don't know if Haiku lack something preventing to have the system support them. AFAIK Haiku areas are obviously supporting this functionality, so it might be possible to just insert some ifdefs in the Jack implementation, or an Haiku implementation alongside with the POSIX and System V ones.</li>
 <li> The latests two are probably related to the others.</li>
</ul>

So without an app to route sounds between jack and the media_server, we will still have
two separate worlds, since i see very difficulty to make jack2 and the media_server friends (since both are asocial animals).
 
I don't think this is a very good scenario to have and i don't see it haiku-stylish. But at the same time, i would love to see a hybrid jack2/media_server client, publishing a tunnel allowing to pass audio between the two servers.

Said that, my personal opinion is that reaching a stable and performant Jack2 could potentially require a lot of work for poor results, the amount of work might easily vary depending on the problems encountered in the steps. This was my feeling when i tried to create a simple jack capture node playing buffers using BSoundPlayer in the backend. 

<strong>Rise And Shine</strong>

We are not lost, there is already another way, which *may* be better. The idea is as simple as difficult : force Jack2 applications to use the media_server by wrapping the jack API.

This consist of creating an ad hoc a set of code emulating the jack API but doing things using the media_server in the back-end. The idea is to have an application publishing BMediaNodes, those nodes will just wrap the functions needed by a client to process audio buffers.

Let me show some pratical examples :

<pre>jack_get_buffer_size
jack_get_sample_rate</pre>

Those could be trivially replaced using the info we have from the format negotiation done by the background node.

<pre>
jack_midi_clear_buffer
jack_midi_event_get
jack_midi_event_write
jack_midi_get_event_count</pre>

I have never used the midi2_kit neither the midi_kit, but i bet the kits provides the needed functionality to emulate it. This is room for the next article (sorry!).

<pre>jack_port_get_buffer
jack_port_register
jack_port_type_get_buffer_size</pre>

Those functions are used by jack clients to get data out/in. When a BufferReceived() call is received by the BBufferConsumer the wrapper could theoretically call the process() callback the client has set using jack_set_process_callback function and at the same time provide the data in a stack which will be accessed by the client using the jack_port_* functions. Ideally a jack_port registration will result in a input / output for the media_node.

Those examples are taken from my personal research on jalv, and actually there are something like 20/30 functions in total to be wrapped for a theoretical layer allowing jalv to run as a media node. This is not a lot compared to big beasts such as Ardour, but enough to demonstrate that it's feasible.

My major concerns are about the API contained in the control.h header, and some other “minor” functionalities such as graph reorder callbacks, i’m not sure about how to emulate them. For the control API probably the best way is to do some conversion in background to make the BMediaRoster controllable by the jack control API. However, i need more research to evaluate how it’s feasible.

Additionally, taking this approach there would be other advantages, for example since the jack headers are LGPL, a layer of such type could be integrated into Haiku, more like what we already do with the VST media_addon or the freebsd compatibility layer for network cards.

<strong>A latency testing</strong>

In the end i just want to show you a little latency comparation i've done :

<table border="1">
<tbody>
<tr>
<td>Buffer length</td>
<td>Haiku (media_server)</td>
<td> Linux (Jack2)</td>
</tr>
<tr>
<td>1024</td>
<td>13.7 ms</td>
<td>42.7 ms</td>
</tr>
<tr>
<td>256</td>
<td>7.75 ms</td>
<td>10.7 ms</td>
</tr>
</tbody>
</table>

The results are encouraging, but i've not a realtime kernel in my debian linux, i'm pretty sure that with a realtime kernel jack2 and Haiku will be more close. I don't think jack and the media_kit can do a lot better, due to the hw limits of my poor integrated Intel HDA card. The values are catched from the system mixer in Haiku (using Cortex). For linux they are found in the QJackctl config window.

Hope it was interesting, i just wanted to say what i think/discovered in the hope that
it could be helpful to realize what's the state of things, and maybe make the way more clear for a developer which want to do this. Additionally, it may be that there's some error in my article since i'm before everyone in learning phase, so any correction/suggestion/opinion is appreciated!
