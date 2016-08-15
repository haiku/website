+++
type = "blog"
author = "emitrax"
title = "[HCD]: status report"
date = "2008-08-23T08:51:41.000Z"
tags = ["hcd2008", "udf"]
+++

It's been a bit since my last status update, so I guess it is time for another one.

First of all, I'd like to inform you that I received the first half HCD payment. Since it's a (fantastic) community based effort project, I thought you wanted to know where your donations ended up.

As of commit <a href="https://dev.haiku-os.org/changeset/27159">r27159</a> you should be able to read data from an UDF partition. The module has not yet been added back to the image, as I'd like to do some more tests, but as far as I can tell, the port of UDF to the new FS API is close to complete, and you can start testing by adding the module to the image and trying using DVD formatted with UDF, or iso image made with mkisofs. Feedbacks are welcome.

As for the other part of my HCD, in case you missed, bonnie++ was added in <a href="https://dev.haiku-os.org/changeset/26920">r26920</a> and it is available for the braves one, for testing purposes.

In <a href="https://dev.haiku-os.org/changeset/27052">r27052</a> I also fixed another BFS deadlock that would lock the file system when more then one thread was writing in the same directory. See <a href="https://www.freelists.org/archives/haiku-gsoc/08-2008/msg00024.html">this</a> for more info.

Ok, going to back to UDF now. ;-)