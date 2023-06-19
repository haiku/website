+++
type = "blog"
title = "[GSOC 2023] Progress on perspective transformation"
author = "Zardshard"
date = "2023-06-19 12:56:32-04:00"
tags = ["haiku", "software", "icon-o-matic", "gsoc", "gsoc2023"]
+++

While the [change request to add reference images](https://review.haiku-os.org/c/haiku/+/6604) was being reviewed, I started working on [ticket #18415](https://dev.haiku-os.org/ticket/18415), which suggests adding shear and perspective transformations. I decided to implement the perspective transformation since I still need to figure out which way I'm going to implement the shear transformation. Hopefully the experience in implementing the perspective transformation will give me information that will help me decide how to implement the shear transformation.

Handmaus provided two reasons in the ticket for why the perspective transformation would be useful. One example is Patchbay's icon.

![Patchbay icon](/files/blog/zardshard/patchbay_icon.png)

The author made a nice icon given the lack of the perspective transformation, but the icon does have some problems.

The other use Handmaus pointed out is that it would be useful for putting icons of existing applications that are not in Haiku's perspective into perspective. This would be especially useful for reference images, whether the reference image is not in perspective but should be or is in perspective but is in the wrong perspective.
