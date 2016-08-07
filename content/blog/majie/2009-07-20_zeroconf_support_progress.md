+++
type = "blog"
author = "majie"
title = "ZeroConf Support Progress"
date = "2009-07-20T16:33:17.000Z"
tags = ["gsoc", "zeroconf", "gsoc2009"]
+++

Hi guys.

Sorry for no update in the previous weeks.

I'v made some progress. mDNSResponder, which provides the underlying ZeroConf functionalities, has been ported to Haiku. It runs on Haiku correctly. In order to make it run, minor updates in our network stack were also applied.

I'm currently working on the service browser. It is almost finished. I'm also trying to write some wrapper classes so developers who need ZeroConf features can easily use them. And my mentor Axel is working on an update to our DNS resolver. After the update we will write some code that can resolve ".local" domains. So in the future you can directly type "http://webserver.local/" in your Web browser. Without any configuration it will resolve it and take you there.

OK. Stop here. Thank you. :-)