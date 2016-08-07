+++
type = "blog"
author = "obaro_ogbo"
title = "CIFS client update"
date = "2009-07-04T16:03:53.000Z"
tags = ["cifs client", "gsoc2009"]
+++

The journey so far.

I have implemented basic file system interface functionality including mount and unmount, and can load it directly as a kernel addon and via userlandfs. At present the client expects just the server ip address and the share name in the format :. I have begun implementing protocol negotiation, and hope to complete the setup of a session using LANMAN in the next few days. I had hoped to have begun implementing file actions by now but unfortunately I'm quite a way from that.

Back to coding