+++
type = "blog"
author = "PulkoMandy"
title = "End of contract - closing words."
date = "2015-02-18T08:21:27.000Z"
tags = ["contract work"]
+++

Hi,

As you probably have noticed, there were no weekly report in the previous weeks. The reason for this is that my contract is currently stopped. There is currently not enough money in Haiku's treasure chest to safely continue it. So, it's time to me to get back to "real life" and a full-time job in a software development company.

First of all I want to thank everyone who made this long contract possible by donating money to Haiku. It was a great experience for me, and a lot of fun as well. I did my best to move Haiku forward towards the R1 release. Unfortunately the beta 1 still isn't there, and we currently have 57 blocking tickets. It is a small number, but only the most complex or big issues are left.
<!--more-->
I have spent the greatest part of this month job-hunting, but I found something now (in a company with some free software culture, even). It took me some time doing all the job interviews and the like, and required quite a lot of my energy and motivation, so not much of it was left for Haiku work in the evenings. But once things have settled a bit I will make some time for Haiku in my free-time schedule again. Progress may not be as fast as it was during this year, but I'll still be around.

I'm finishing this contract with some things left on hold, so I'll document the current state of things here, for someone else to pick it up.

I still have the libbind to netresolv replacement project in my local git tree. It is still not working reliably, and it needs getifaddrs moved to libnetwork instead of libbnetapi (I tried to do that but my code wasn't acceptable as it needed too much hacks on the libbnetapi internals). WebKit is also left in a somewhat incomplete state. I think there is a crashing bug in the latest package, because of an ABI change in the network kit, but this should be easily solved by a rebuild of the webkit package. There are remaining drawing issues (both incorrect drawing and performance problems) which need to be solved on app_server side. There are also known problems left in the network backend and WebKit network code, mostly with web sockets and http cookies.

Let's have a look at the short-term future of Haiku now. The next event is Google Summer of Code. Despite the name, it starts now, in the middle of the winter, and this week is the application period for organizations. This year Urias will be our org admin, and Axel will be the backup admin. You can have a look at the ideas page already:
/community/gsoc/2015/ideas. We have quite a lot of ideas there, but unfortunately we don't have much mentors around. If you think you could mentor one of these (even if you don't have commit access to Haiku), it's time to tell so :).

Another upcoming event is the GCI winners trip. This is a reward for the GCI winners (2 from each of the 12 organization) who will visit Google headquarters and enjoy various talks, and other events. One mentor from each org is also invited, and this year I'll be going, as the students both decided they wanted to see me there.

On Haiku, inc. side, there is discussion in progress for a rework of the way it works. The board of directors worked by co-opting until now, but that didn't work too well. It's basically the same people running the inc for a very long time, and they can't commit enough time to it anymore. There is work being done there on modifying the internal organization so board members are renewed more frequently and with a more transparent process. They will probably be looking for new board members at some point, so if you think you can help with the boring paperwork, tax forms, financial reports, or reporting on Haiku, inc decisions and events, you can contact the current team at contact@haiku-inc.org.

On the Haiku project side, Augustin Cavalier got commit access. He joins the developer team and will contribute in various areas, including user interface and documentation. Oliver Tappe is stepping down from his role as the main system administrator. There is quite a lot of work to do in that area, and we have a small team of people organizing the sysadmin to work more as a team effort, in order to share responsabilities and workload. This is coordinated at the haiku-sysadmin mailing list, so if you think you can help, join there: https://www.freelists.org/list/haiku-sysadmin.

Finally, even though my contract is stopped, I would like to encourage everyone to continue donating money to Haiku, inc. There may be other people interested in doing contract work (or maybe myself again at a later point), and there may be other ways to spend the money in useful ways. This is open to discussion on the haiku-inc mailing list (https://www.freelists.org/list/haiku-inc), it could include helping our GSoC students to attend BeGeistert with a (partial) travel refund, for example. Or things like buying specific hardware for Haiku devs to write drivers for it, etc. As I said, you can send suggestions on the haiku-inc mailing list, where they will be discussed and maybe adopted.