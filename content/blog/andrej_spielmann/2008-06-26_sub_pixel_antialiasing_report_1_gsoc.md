+++
type = "blog"
author = "andrej_spielmann"
title = "Sub-pixel antialiasing report #1 [GSoC]"
date = "2008-06-26T14:06:39.000Z"
tags = ["gsoc", "sub-pixel antialiasing", "progress report"]
+++

The first month of GSoC coding period is almost over and it's time for a summary.
This month wasn't particularly easy. I was working hard to distribute my effort between Haiku and my exams accordingly. I must confess, I was probably doing more schoolwork than Haiku :-)
Nevertheless, I did make some progress and now I am very happy to announce some of the first actual results of my project!


<!--more-->

Thanks to the great lucidity of the app server's and AGG's source codes, I have quickly become familiar with them and could start making the additions. I decided to begin by implementing sub-pixel antialiasing for untransformed text. This includes virtually all the text that one normally encounters around the system, in text editors or browsing the internet.
The internal part of the technology is now finished and it is already possible to have all the text in the system sub-pixel rendered. The first picture shows some text displayed in Haiku with its present gray-shade antialiasing and the second picture shows (almost) the same screen rendered with my implementation of sub-pixel antialiasing (click to see the full version and make sure you are viewing it in its full size).

<a href=http://www.stankaa.com/files/grayscale.png><img src=http://www.stankaa.com/files/grayscale.png width="320" /> </a><a href=http://www.stankaa.com/files/subpixel.png><img src=http://www.stankaa.com/files/subpixel.png width="320" /></a>

The difference in the appearance of normal straight text is not particularly dramatic but I think that there is a significant improvement in the oblique font in the upper right window and the fancy font in the lower left window (Lucida Calligraphy).
I recommend using some magnifying software tool for studying the individual pixels of the characters :-)

<img src=http://www.stankaa.com/files/zoom.png />

I will now roughly draft some of the technical details.
The text rendering in Haiku uses the open source library Freetype for producing bitmaps of coverage values for each character. These bitmaps are now created with triple width and each of the values is interpreted as the coverage of one sub-pixel.
Of course, doing this would cause certain visible colour unbalance in the result. That can be cured by distributing the value of each pixel to some of its neighbours, which on the other hand introduces some blurriness. You can have this filtering done by Freetype, but I didn't find their implementation completely optimal.
This is because Haiku chooses to use strongly hinted characters, which means that they are snapped to the pixel grid, and so are some of their pronounced features (like the legs of an 'm', for example). Eventually, the effect of this is that almost every straight vertical line (in most fonts) is rendered precisely one or two whole pixels wide, covering precisely one or two whole pixels. Such lines then obviously don't need any colour filtering and applying it will actually make them blurrier.
My implementation of color filtering ignores such vertical lines and hence the characters are really sharp and crispy. Freetype's original colour filtering doesn't take this into account and neither does ClearType in Windows XP. So Haiku is actually, from this point of view, going to have much crispier text rendering than the standard these days!

I think (and so does my mentor Stephan, probably) that the most useful thing to do now would be to create a front-end for sub-pixel rendering - that means adding some options to the existing preferences applets. When that is done, sub-pixel rendering for untransformed fonts is ready for everyone and I will then start working on making it available for all vector graphics in general.
Another thing that I would like to look into is the possibility of (optionally?) using unhinted text, since I personally think it is a better approach which makes a much more effective use of the power of sub-pixels.

That's all for today. If anyone desperately yearns for having sub-pixel antialiasing Haiku right now just let me know and I can send you my app server source codes. But I optimistically think that it ought to be integrated into the main code trunk within one or two weeks :-)