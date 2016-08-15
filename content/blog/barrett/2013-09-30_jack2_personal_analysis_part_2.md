+++
type = "blog"
author = "Barrett"
title = "Jack2 : A Personal Analysis (Part #2)"
date = "2013-09-30T16:28:53.000Z"
tags = ["jack2", "media_kit", "libjackcompat"]
+++

Hello, it has been passed some time from the Part 1 of this article, I've continued my investigations as well, and I have finally some more clear plans for such a hypotetic Jack2 port. Unfortunately i had not enough time to research a bit more in the latency differences between the media_kit and jack, sorry, this should be post-poned until i have precise emphyrical measuring methods.

To better understand this article i suggest you to read the first <a href="/blog/barrett/2013-07-02_jack2_personal_analysis_part_1"> part. </a>

<strong>The Wrapper</strong>

So, after lots of temptations, a night i decided to take the jack API headers and begin to stubb a jack wrapper.

This gave me the possiblity to explore in a better way the internals of Jack2.

The result of this work-night, is the jack_simple_client seamless working. Don't misunderstand me, the code is just a proof-of-concept, actually the backend media_node support only producers hooks, and have some problems such as the sound hear a bit streched. Other than being funny, this project has permitted me to understand better how the BMediaNode class work. I would like to synthetically make a resume of the work,

it consists of three layers :

<ol>
 <li> C-API bindings to c++ internal classes</li>
 <li> Jack2 emulation which is composed of two classes at the moment, JackPort and JackClient.</li>
 <li> JackNode, a native media_kit node controlled by the emulation layer, which serves as the gate between the Jack emulation and the media_kit.</li>
</ol>

This is a map of the functions on which i worked and their status :

<strong>E = empty
P = partially implemented
OK = fully implemented / sufficient implementation ATM.</strong>

<pre>jack_activate OK
jack_client_close OK
jack_client_name_size OK
jack_client_open OK
jack_connect P
jack_deactivate P

jack_get_buffer_size OK
jack_get_client_name OK
jack_get_ports P
jack_get_sample_rate OK

jack_midi_clear_buffer E
jack_midi_event_get E
jack_midi_event_write E
jack_midi_get_event_count E

jack_port_get_buffer P
jack_port_name OK
jack_port_register P
jack_port_type_get_buffer_size OK

(the original implementation is mantained)
jack_ringbuffer_create OK
jack_ringbuffer_free OK 
jack_ringbuffer_mlock OK 
jack_ringbuffer_read OK
jack_ringbuffer_read_space OK
jack_ringbuffer_write OK
jack_ringbuffer_write_space OK

jack_session_event_free E
jack_session_reply E

jack_set_buffer_size_callback OK
jack_set_process_callback OK
jack_set_session_callback E
jack_shutdown E

jack_transport_query E</pre>

You can see the code <a href="https://github.com/Barrett17/libjackcompat/"> here. </a>

<strong>Intrinsic Limitations</strong>

There are some intrinsic limitations due to different designs, which might be a bit complicated to deceive.

<ul>
 <li>Jack2 support multiple connections to one port.

There's not a lot to do about it, the only solution without explicit support from the media_kit is to map one jack port into multiple input (or outputs). For example, in Haiku a stereo output is a unique port, you can't connect two mono channels to a stereo one without using a mixer node, in Jack2 instead stereo channels are separated by default.

Anyway i do think a feature to separate stereo channels should be taken into consideration for a future media_kit version.
<strong> **EDIT** </strong> To be more clear all implementations of JACK permit connections between ports with any valence, they can be 1:1, N:1 or 1:N.

</li>

<li> Jack2 support glitch-free ports reconnection.

Well, as far as i know the media_kit just is unaware of this concept.

<strong>**EDIT**</strong> In those hours, emerged that it relates only a jack2 implementation detail of
the API, so it will be a limitation for a native port but not for libjackcompat. That's a good news indeed.</li>

<li> Jack2 features a session API which is simply missing in Haiku.

This is something already discussed in the mailing list, basically other than being a low-priority part of the API, it could be just emulated until Haiku features a session management system, which will probably come out after R1. </li>

</ul>

<strong>The Jack port and the wrapper</strong>

I discovered that there is not need of an external app routing audio between jack2 and the media_server. 

With the premise that the incompatibilities in libjackcompat and the issues i explained  in the last article are still valid, since the jack_ports management is done by the driver i think an Haiku driver could work that way :
<ol>
 <li> When a jack client is registered a media_node is created, for every port there will be a input/output in the node.</li>

 <li> When a media_node is created, it will be mapped into a jack_client, and every i/o mapped onto a jack_port.</li>

 <li> The phantom clients will be internally managed to work as audio streams mirrors.</li>

 <li> By default there will be a media_node wrapping the jack system_mixer into the Haiku's one.</li>

</ol>

But i would like to show you an use case where it may be complicated to create an efficient and transparent strategy :

Imagine the jack_client1:port1 is connected to jack_client2:port2. jack_client2 is a media_node in the back-end, so it will wrap the port2 into a native input.
So, now imagine a new jack client, called foo_client, what happens if it try to connect to jack_client2:port2? In jack it's completely legal, but in the media_kit there will be only a input, and no way to make a double connection.

As you may understand, this is a headache. To my mind comes only two different solutions :
<ol>

 <li>Make the behaviour somewhat configurable in settings and in the media_node settings panel. So that you can for example map two jack ports into one media_kit stereo connection.</li>

 <li>Force users to use appropriate mixer nodes between connections.</li>

</ol>

<strong>So, What's The Need for a wrapper?</strong>

Except the fact that with some degree various simple apps should work out of the box, i think a wrapper is still important for a lot of reasons, if it will work for basic functionalities, it could be used by third-party developers as a initial layer to base their native Haiku port.

For example, as start you can compile your jack2 program, then you include the wrapper into your source tree and begin to modify it to fit your needs.

The last but not less important thing is that the libjackcompat backend will provide most of the functionality needed to create the backend-nodes, so it may be possible that a media_kit jack2 driver will be based itself on this library.

As before, i just tried to explain my vision, hope it was interesting...as ever
any opinion, question and correction is appreciated!
