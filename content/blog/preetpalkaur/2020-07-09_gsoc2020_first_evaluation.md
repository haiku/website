+++
type = "blog"
title = "GSoC2020: First Evaluation"
author = "PreetpalKaur"
date = "2020-07-09 17:49:28+05:30"
tags = ["haiku", "software"]
+++

# First Evaluation completed :)

First of all thanks to my mentor to pass the first evaluation of the GSoC2020.


Before discussing the current workflow, here is the picture of the icons work, I forgot to put it in the previous post!


* [Icons](https://drive.google.com/file/d/10-kJdE4G0rGWiPZi4rudt4Vy1sOb6vRS/view?usp=sharing)


I have tested the DPI option also with the six-button mouse and the with button mouse in haiku. The DPI is working well.

Now, I am working on the mouse configurations for different mouses. This work takes a lot of time as compare to the other tasks because it needs a complete understanding of how the input_server works. While working on this issue I learn new things which are good!


## Mapping in C++


I heard about the mapping and know little about it, but never used this before. In this issue, I used this concept for the first time to map the settings of the mouse with its name. I think there is no other way to resolve this issue except mapping.

To make it worked I tried to use the map in small C++ programs and then, apply the same concept in my work. To make the workflow easier I used 'printf' statements to ensure whether the code was running or not.


Mapping is working fine now.


## Debugger window open while testing the code


The debugger windows open due to the bug in the code. I am not familiar with that so, I planned a meeting with PulkoMandy. In which he guided me to use the 'BArchivable()'', flatten the data into the file so the settings are saved into the disk. By using the 'BArchivable()'', the debugger window did not come again.


## Package installation takes so much time:


Before I was made the changes in the server files of the Mouse '/src/servers/input/MouseSettings.h, .cpp. To test those changes I need to make a package using the command (jam -q haiku.hpkg) this command takes a lot of time, then to install that package and finally to reboot the haiku. There is no other way possible! :(


But still, I was not able to see the output. So, my mentor told me to made changes in the input preferences code first. So, I can get the output rather than, made changes into the server files.


## Abled to store the settings of multiple mouses in the single file:


By changing the code in the input preferences files, I was able able to store the settings.

* [Mouse Settings](https://drive.google.com/file/d/16Mkw8k7tpuu1VE91xGnx-95NzRJuuUAu/view?usp=sharing)


But, not able to retrieve them.


## Trying to get retrieve the settings:


I was trying to retrieve the settings that are stored in the file. To test whether the RetriveSettings() code was working or not. I changed the type of the mouse_name form const char* to BSring (BString can be compared with == and does a lot of the work (no need for strcpy, strcmp, …)).

I replaced map<const char* mouse_name, MouseSettings* settings> to map<BString mouse_name, MouseSettings* settings>

I copy-pasted the code of this function in the 'SaveSettings()'' function and commenting from the 'RetrieveSettings()''. When I tested it I got the output shown below:

* [Settings Stored](https://drive.google.com/file/d/1-SAQNfBJoS05Bs7LKJuxEt4v2FS1voCl/view?usp=sharing)

I used the ‘printf’ statements and ‘DEBUG’ and test the output. Here, clearly, the settings are saved and retrieved. In this picture, there was just a mouse type that I was printing and comparing the output.

Then, I tried to print the other settings also like clicking speed, acceleration, mouse mapping buttons. Below is the output that I have used to compare the settings before and after. The settings are stored and retrieved also.

* [All the settings stored and ret](https://drive.google.com/file/d/1kXeNHycsFqmy9Lp7xcBmMCCbdjqpKj4o/view?usp=sharing)

After shifted this code to the right place at RetrievedSettings(). Here was the problem, I get the garbage value for each setting. Maybe! there was the pointer issue. I send the code to the Gerrit so, I came to know about the exact issue of why I am getting this output wrong.

If I find where I am doing wrong, I will come very close to the exact solution for this issue.

* [Garbage value logs](https://paste.ubuntu.com/p/bF6Vz4mHVz/)

Thankyou :)