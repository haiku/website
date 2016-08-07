+++
type = "blog"
author = "sil2100"
title = "Bits and Pieces: The Small BCardLayout"
date = "2012-01-21T20:14:06.000Z"
tags = ["interface kit", "Layout API"]
+++

A short post about something that's not really documented. When working on a communication application for Haiku, I needed to create a typical configuration wizard window. I required a few views to be present in one spot, with only one being shown at the same time - with the ability to switch between them on user Next/Prev button press. Since Haiku exports a neat layout API, I wanted to use one of those if only possible. And then I found the BCardLayout.
<!--break-->
Since the Haiku API is still being worked on, some places are not yet well documented - with others not documented at all. The BCardLayout is the latter. It's a rather easy-to-use feature though. There's a living example in the Haiku core code as well - in the media preferences application (check out src/preferences/media/MediaWindow.cpp).

The usage is simple. We first define the BCardLayout somewhere where we can access it throughout the scope of our window. We then need to 'attach' the newly created layout somewhere - either by SetLayout(), or simply by creating a view with this layout passed to the constructor. We then can easily add the views we want to be able to switch between - with only one view visible at a time. Switching between views can be performed by calling SetVisibleItem() of the BCardLayout object. The SetVisibleItem() method takes either the view index (int32) in the layout or the BLayoutItem we're interested in directly.
A quick example below:

<pre>fLayout = new BCardLayout();
BView *cards = new BView("cardsView", 0, fLayout); // Attach the layout

fLayout->AddView(boxOne);
fLayout->AddView(boxTwo);
fLayout->AddView(boxThree);

fLayout->SetVisibleItem((int32)0); // Show boxOne

// (...)

fLayout->SetVisibleItem(2); // Show boxThree</pre>

When I first used the BCardLayout, I was a bit surprised it didn't work. The problem was that after creating the layout object, I was adding views to it before attaching the layout to a view. A very stupid mistake! Be sure not to do the same.
Of course, the views that are being added can be nicely laid out with other layout types - with the end result being beautifully clean. Magnificent.