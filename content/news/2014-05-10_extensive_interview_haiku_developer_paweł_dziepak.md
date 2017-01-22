+++
type = "news"
title = "An extensive interview with Haiku developer - Paweł Dziepak."
date = "2014-05-10T08:08:17.000Z"
tags = ["interview", "developer", "pdziepak", "Paweł Dziepak", "development", "gsoc", "google summer of code", "contract", "community", "programming"]
+++

<p align="justify"><em>I have interviewed <strong>Paweł Dziepak</strong> during my private conversation with him, on polish Haiku IRC channel (<strong>#haiku-pl, Freenode</strong>). We talked for two nights, on 28 and 29 of April 2014. <strong>Paweł</strong> is known to the community as <strong>pdziepak</strong>, I am <strong>Premislaus</strong>. There are many great people involved with <strong>Haiku Project</strong>, everyone is worth interviewing - I will try to do that in the future (<strong>Ingo</strong>, <strong>Axel</strong>, <strong>Stephan</strong>, beware!). Why <strong>pdziepak</strong> this time? The big role in the decision played ease of communication, since we are the same nationality, we talk pretty often with each other on IRC channel. Besides, he is an excellent programmer, engineer with vision! Despite his young age, he doesn't do mobile apps, his field of interest are kernel architectures. Unfortunately, he didn't have current photo and he said no when I proposed him to take a stylish one, either selfie or in an elevator.</em></a>

<p align="justify"><em>We had deep and sincere conversation about <strong>Haiku Project and Community</strong> condition. I also asked him about Open Source movement in general. The part of that I present to you below:</em></a>

<!--more-->

<p align="justify"><strong>Premislaus: Hi Paweł! I will start with standard question: write a little about yourself, who are you, where are you from, how old are you, what and where do you study?</strong></a>

<p align="justify"><strong>pdziepak:</strong> Hi. My name is Paweł Dziepak, I am 22 years old, I was born in Opole, currently I study computer science at University of Wrocław and because of that I moved to Wrocław four years ago.</a>

<p align="justify"><strong>Premislaus: How did you find out about <a href="/">Haiku Project</a>? What was your first impression?</strong></a>

<p align="justify"><strong>pdziepak:</strong> I don't really remember the first time I heard about the project, but I'm pretty sure it was when <a href="https://en.wikipedia.org/wiki/Haiku_%28operating_system%29">browsing Wikipedia</a> in search of alternative operating systems. Some time later I was looking for an open source project I could join, but honestly, the fact that one of the main goals of the project is to maintain compatibility with ancient <a href="https://en.wikipedia.org/wiki/BeOS">BeOS</a>, scared me off. Much later I decided to take part in <a href="https://en.wikipedia.org/wiki/Google_Summer_of_Code">GSoC</a>, in a project I could work very close to the kernel. Then Haiku came up again, with the proposal of <a href="/blog/pawe%C5%82_dziepak/2013-03-15_nfsv4_client_finally_merged">NFSv4 client</a> implementation, which looked pretty interesting. At the time it was (I will risk such statement) the only big kernel written in C++, and it turned out that the whole GCC2 and BeOS-compatibility thing is not that scary at all. I liked the <a href="/docs/userguide/en/gui.html">user interface</a> too, I like simplicity, so end-'90s look is rather an advantage for me.</a> 

<p align="justify"><strong>Premislaus: Why? Did you hear about BeOS earlier? Perhaps you used it? BeOS had few interesting solutions, for example <a href="/docs/userguide/en/attributes.html">attributes support in file system</a>, it resembled database, <a href="/docs/userguide/en/filetypes.html">MIME types for file identification</a>, it was designed with multithreading and <a href="https://en.wikipedia.org/wiki/Real-time_computing#Criteria_for_real-time_computing">soft real time</a> in mind. Basically everything Haiku has now. </strong></a>

<p align="justify"><strong>pdziepak:</strong> I have to admit that my main motivation was more NFSv4 than Haiku. I did not think whether I will be staying longer with the project back then.  My knowledge about BeOS was limited to the fact that I was aware that such a thing ever existed and that's it. About BeOS' solutions, attributes are very troublesome when you try to implement them in NFSv4 client. Just recently with the help of Stephan and suggestions from Ingo, I have figured out how it could work with NFSv4 but I didn't have time to write complete implementation yet.</a> 

<p align="justify"><strong>Premislaus: Could you tell us something more about that? Why attributes in Haiku cause this much trouble? I remember you writing on polish Haiku IRC channel that other OSes don't care about it and it won't be supported fully until some next version of NFSv4? </strong></a>

<p align="justify"><strong>pdziepak:</strong> Unfortunately, the problem lies precisely in the fact that only BeOS and Haiku implement file attributes in such an extended way. As a result, all the protocols ignore this aspect which makes implementing it properly very difficult. When it comes to NFSv4, it actually introduced something called "named attributes", but there are two problems with them. Firstly, it is still not what we need, because "named attributes" as opposed to the BFS attributes are not typed.  The second problem is even more serious: "named attributes" support is optional and Linux NFSv4 server (which is arguably the most popular), does not have this implemented.</a>

<p align="justify"><strong>Premislaus: Why are attributes so important to Haiku users? I like the fact that I can <a href="/docs/userguide/en/workshop-filetypes+attributes.html">sort my video library as I want</a> and search the movies by e.g. my favorite writer. We can quickly add information about our contacts with <a href="/docs/userguide/en/applications/people.html">People application</a> and all those data are stored as attributes of empty files. Power user even has <a href="/docs/userguide/en/queries.html"> the ability to write own search formulas</a>. It can come handy when you have tens of thousands of e-mails. What do you think? Are there similar features in other OSes? Or maybe there is something better? </strong></a>

<p align="justify"><strong>pdziepak:</strong> Indeed, the attributes are a very convenient and elegant solution, but for it to work properly everything that deals with files must support them: filesystem, file archiving formats (tar, zip, itp.), data transmission protocols (HTTP, FTP, NFS, etc.). If something along the way loses them it starts to become nuisance. In some cases, however, it is difficult to imagine a more natural solution than the file attributes and the part of the world that doesn't implement them, had to come up with less elegant but more practical solution, which is putting such data in the file itself. That is how tags in files with music (ID3) and images (EXIF) work.</a>

<p align="justify"><strong>Premislaus: It's true, many times Windows did not recognize automatically files I created under Haiku (mostly text and images). Fortunately zip archives store attributes properly. For Haiku there is ArmyKnife, which lets you convert tags to attributes with a few clicks. Another thing I like about attributes is displaying the original download location of the file (if enabled). I would like to ask you now what other technologies have you implemented in Haiku? What did you improve? What is your field of interest in Haiku development? </strong></a>

<p align="justify"><strong>pdziepak:</strong> My area of interest is broadly defined kernel development. In the spring of 2013 I <a href="/blog/pawe%C5%82_dziepak/2013-04-18_aslr_and_dep_implemented">implemented ASLR and DEP</a>    which caused minor confusion due to "activation" of bugs that have been hidden but I think that overall it worked out well for Haiku. Later I tinkered a bit with <a href="https://en.wikipedia.org/wiki/Transactional_Synchronization_Extensions#Restricted_Transactional_Memory">RTM (Restricted Transactional Memory)</a>, new extension introduced in Haswells but the code will need a lot of work before it will become usable. From October to mid-January, I was employed by Haiku, Inc. <a href="/blog/pawe%C5%82_dziepak/2014-02-18_new_scheduler_merged">to work on the scheduler</a> and adaptating Haiku for work on systems with more than one logical processor. Among other things, <a href="/blog/pawe%C5%82_dziepak/2013-12-20_haiku_meets_9th_processor">I got rid of the 8 processors limit,</a> which was quite firmly rooted in the ABI inherited from BeOS. Changing the API and the introduction of new elements to the ABI also caused some confusion, but it was inevitable.</a>

<p align="justify"><strong>Premislaus: What are the features of your scheduler? What are the differences to the old one? How does it compare with other OSes? What is the main idea? </strong></a>

<p align="justify"><strong>pdziepak:</strong> First of all, the new scheduler has a separate thread queue for each core, instead of the global one as it was before. This improves the utilization of the cache and causes processors to interfere less with each other, but to the smooth operation requires a good load balancing algorithm.  I decided to accomplish this by estimating how much CPU time a thread to use as if it were the only thread in the system. Based on this information, the scheduler decides how to allocate threads to cores and when to migrate threads on other cores.  These decisions are also affected by the mode in which the scheduler works;  if the most important is the performance of the system, we want to take advantage of all available logical processors, if we want to reduce energy consumption, it would be better if we limit the number of active cores, as much as possible.  Regarding the time for threads on a particular core, this solution is quite common, constant time priority queue is utilized. Proper heuristics ensure that threads using too much CPU time will have lower priority.</a>

<p align="justify"><strong>Premislaus:  Can you tell us how was your cooperation within the GSoC and on the contract? Were your relations with Haiku, Inc. and rest of developers good? Have some funny or unpleasant situations occurred?</strong></a>

<p align="justify"><strong>pdziepak:</strong> Both during GSoC and the contract I was the only developer working on a given thing, so cooperation was limited to discussions about certain changes, or in the case of API, change suggestions. In general, the work atmosphere was good and I can not complain about anything.</a>

<p align="justify"><strong>Premislaus: Next question is extremely difficult for me, because I put a lot of energy, time and nerves into Haiku promotion and testing. I believe that the main principle of Open Source is transparency. I don't want to hide flaws because I'm not some corporate marketing department - "It's great!" How would you rate the decision-making process, communication and management in the Haiku Project? It is no secret that everything happens slowly: adding patches, decision making, we have many bugs which are in-progress for several years now. <a href="https://dev.haiku-os.org/ticket/10753">We reported that HaikuDepot translation does not work</a>. One path change is needed - two weeks later that bug is still in-progress! Generally Haiku developers have community's trust, each year we have more money and we reach new R1 milestones (scheduler, package manager, <a href="/blog/pulkomandy/2014-04-11_webkit_weekly_report_27">HTML5</a>, etc.). But would it be possible to better manage current resources? Haiku Project does not have lasting and rich sponsor, we dedicate our free time and savings to it. Still, sometimes I feel that everything happens by inertia. Everytime I see someone writing on IRC: "patches welcome", "!patchwanted", "sure, our workflow could be improved", I just want to go out on the street and start shooting people. <a href="https://www.freelists.org/post/haiku/How-to-improve-Haiku">That's why I started a discussion on mailing list</a>, suggesting new contract for creating unit tests and change in approach to patch review. How do you see it? Isn't the entry threshold for new developers too high? </strong></a>

<p align="justify"><strong>pdziepak:</strong> Slow pace can be easily explained - far too few developers are employed on a full-time job. You have to realize that Haiku is a complete operating system and while in other solutions some components are independent, big projects, here they are only a part of Haiku. We have our "own Linux", "own glibc", "own Qt", "own KDE" and many more. Regarding our workflow, let's hope the discussion you initiated will lead to something good, though I feel that we have different understanding of "something good". First of all I don't think that the threshold for new developers is too high, there is no point giving access to the repository to someone whose work will have to be constantly corrected. I would say our problem is small number of people willing to contribute, not potential developers we somehow scared off. I also believe that making changes to Haiku should be "harder", especially for people with commit access. Nobody is perfect and reviewing each patch by another developer will certainly better the code quality. Unfortunately, again there is a problem with time developers can spend on the project. If patch review will not be efficient enough, such workflow will not work and will do more harm than good.</a>

<p align="justify"><strong>Premislaus: What about the "<a href="https://en.wikipedia.org/wiki/Worse_is_better">Worse is better</a>" rule? Haiku does "<a href="https://en.wikipedia.org/wiki/Worse_is_better#The_MIT_approach">The MIT Approach</a>". Personally, I think that the latter theory is much better. Is slowness the price of this approach? At first glance BSD family develops slower than Linux. </strong></a>

<p align="justify"><strong>pdziepak:</strong> Decisions must be made ​​individually, after analyzing the problem. Clinging blindly to any rule (including this one) won't give good results. Of course, usually simple solutions are better, both in terms of implementation efficiency and the "elegance" of the interface.  A problem arises, however, when, after some time, such a simple solution is no longer sufficient and improving it is not trivial because of the need to maintain compatibility.</a>

<p align="justify"><strong>Premislaus: What is the deal with the whole GCC2 thing? How much of a burden is BeOS binary compatibility? Many people argue that it lets us test OS and applications behavior, since there is reference (BeOS). Normally this is achieved by unit tests. I am aware that this main goal for R1 but it was decided 12 years ago. Many things changed by the time. I think there is no need to be BeOS-compatible anymore. </strong></a>

<p align="justify"><strong>pdziepak:</strong> Generally, to a lesser or greater extent, GCC2 is a burden but one of the project goals is to maintain BeOS ABI compatibility, and changing that is not such a simple thing. On the one hand it hinders the project from chaos (though I'm not sure how GCC2 helps with this), on the other hand some projects can turn out to be unnecessary. GCC develops on many different levels, the most irritating being lack of C++03 support. GCC4 many more much better optimizations which nowadays are a must. Furthermore, GCC4 generates code that performs better on newer CPUs. Of course, Haiku builds have to run on <a href="https://en.wikipedia.org/wiki/Pentium_Pro">Pentium Pro</a> (don't ask me why) but GCC4 can generate code that doesn't use new instructions and runs on old CPUs, yet takes advantage of newer microarchitectures.</a>

<p align="justify"><strong>Premislaus: What are your Haiku development plans?</strong></a>

<p align="justify"><strong>pdziepak:</strong> I can only tell what are my ideas, what will come of them depends on how much time I will be able to devote to Haiku. First of all, it would be good to finish two things I've already started, them being attributes support in NFSv4 client and <a href="https://en.wikipedia.org/wiki/Transactional_Synchronization_Extensions">Intel TSX</a> extension support (including RTM I mentioned earlier). I also thought about <a href="http://wiki.osdev.org/Virtio">VirtIO</a> drivers, which will make Haiku perform better when running in <a href="https://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine">KVM</a>. General VirtIO infrastructure is already set up. We also have bits of network card driver and making it work would be rather easy. Another interesting device is <a href="http://rwmj.wordpress.com/2010/07/17/virtio-balloon/">virtio-balloon</a>, which allows for memory exchange between host and guest. I did not check how much work would that need though.</a>

<p align="justify"><strong>Premislaus: Could you briefly describe what you think are the advantages of Haiku?</strong></a>

<p align="justify"><strong>pdziepak:</strong> First of all, user interface and overall system user-friendliness. Haiku does not need much to be responsive and that to a large extent defines the impression it makes. Haiku also doesn't have problems which arise in projects without clear goals and want to be good in every use-case. That usually doesn't work well.</a>

<p align="justify"><strong>Premislaus: And what are the disadvantages? </strong></a>

<p align="justify"><strong>pdziepak:</strong> Benchmark results, compilation time and other performance-wise tasks comparisons are pretty bad. Before Adrien's contract <a href="https://en.wikipedia.org/wiki/WebPositive">WebPositive</a> was a sorry sight which definitely did not attract potential users, but there is huge progress and it's become lesser concern.</a> 

<p align="justify"><strong>Premislaus: How is Haiku different from Linux, BSD, Windows and OS X from the developers perspective? </strong></a>

<p align="justify"><strong>pdziepak:</strong> Haiku implements POSIX so Unix programmers will find some similarities. We have ports of high-level languages like Perl, Ruby and Python so not much difference here either. When it comes to GUI and <a href="https://api.haiku-os.org/">high-level API in C++ (Kits)</a> though, that is different solution comparing to Qt and you need to spend some time to learn it. Regarding the kernel, we have a mix of C and C++. Unfortunately, because of GCC2 we can't use C++03 and C++11. That is not a case when developing user mode applications, of course.</a>

<p align="justify"><strong>Premislaus: What are the main bottlenecks in the Haiku kernel, in your opinion?</strong></a>

<p align="justify"><strong>pdziepak:</strong> Modern kernels use different, less or more advanced techniques to improve performance, especially when we are dealing with more than one logical processor (currently, it's almost always). <a href="https://en.wikipedia.org/wiki/Read-copy-update">RCU</a>, smart allocation of objects to a particular CPU, mutexes to protect small objects, <a href="https://en.wikipedia.org/wiki/Non-blocking_algorithm">lock-free and wait-free algorithms</a>. Haiku kernel is not doing much in that matter so its scalability is highly unsatisfactory.</a>

<p align="justify"><strong>Premislaus: Would you replace Haiku kernel with some other one if you could? Or do you think that development of the current one is better idea?</strong></a>

<p align="justify"><strong>pdziepak:</strong> Actually I was wondering if it would be better if Haiku have used Linux. Over 10 years ago, the decision to write new kernel from scratch probably was the right one, but a lot has changed since then.  Of course, the use of "alien" Haiku kernel would require a lot of work, but keeping your own kernel on par with competition requires even more.</a> 

<p align="justify"><strong>Premislaus: How would you rate the state Haiku source code? Does something need a thorough rewrite?</strong></a>

<p align="justify"><strong>Pdziepak:</strong> I can speak only about the kernel. As I mentioned earlier, we need more clever techniques to improve scalability. This in turn requires a major or minor changes (rather the first), mostly in kernel subsystems. As to rewriting from scratch, I think that is not necessary, better option is the evolution provided that it will be sudden and fast.</a>

<p align="justify"><strong>Premislaus: What is, in your opinion, a long-term outlook for Haiku?</strong></a>

<p align="justify"><strong>pdziepak:</strong> With the package manager and improvements in WebPositive system is now much better suited to everyday use. I hope that soon we will release something more official than the nightly builds. In regards of long-term development, a lot depends on how long Adrien will be able to work on WebPositive and whether it will be possible to start other contracts. Haiku has a group of loyal fans, but with no noticeable progress in the works, they will wane rather than arrive.</a> 

<p align="justify"><strong>Premislaus: Why is Haiku worth supporting? </strong></a>

<p align="justify"><strong>pdziepak:</strong> I am just a technical guy, PR is one floor higher.</a>

<p align="justify"><strong>Premislaus: OK, but why do you support it? </strong></a>

<p align="justify"><strong>pdziepak:</strong> Initially, it was mostly the desire to learn a system that is different from mainstream solutions like Windows, *BSD or Linux distributions. Right now, Haiku in my perspective isn't any "different" and the main reason for that is the fact that there are many things to do in various areas. Depending on what I'm interested in, there is (unfortunately) huge chance, that Haiku does not have it or it can be severely improved. That is how I started to work on ASLR, DEP and RTM. This is also the reason that I consider implementing some of the missing VirtIO drivers, as mentioned earlier.</a> 

<p align="justify"><strong>Premislaus: Do you have Haiku installed on any computer and do you use it?</strong></a>

<p align="justify"><strong>pdziepak:</strong> Yes. I have a Haiku installation on my old Eee PC. Besides Windows XP, Haiku is the only OS that works smoothly on that machine.</a> 

<p align="justify"><strong>Premislaus: What are your main operating system, tools and hardware you use to develop Haiku? </strong></a>

<p align="justify"><strong>pdziepak:</strong> I have "desktop notebook" with external display, keyboard, speakers, ethernet, etc. which has Fedora installed (due to my sentiment to Red Hats). Besides, I have one desktop computer I use to build Haiku and other projects I work on. I have OpenGrok and buildbot on it I use to check whether my commits break anything, before they end up in main repository. That computer currently runs Debian Jessie. Regarding tools, gedit is my main editor for a long time now, I don't use IDEs. Obviously I use git and with the exception of gitk I don't use any "boosters".</a>

<p align="justify"><strong>Premislaus: What do you find missing in Haiku? Which important applications are not available? </strong></a>

<p align="justify"><strong>pdziepak:</strong> First of all, hardware virtualization support. Lack of Wireshark and OpenCL is also a bit problematic.</a>

<p align="justify"><strong>Premislaus: How does the Haiku package manager compare to Linux solutions? </strong></a>

<p align="justify"><strong>pdziepak:</strong> It's very different from them. It's definitely not simple, despite that I find it very elegant. E.g. thanks to the way it has been designed, packages can be stored on a NAS and separate Haiku installations can have access to them without interfering with each other. This saves both storage space and time needed to update the software.</a>

<p align="justify"><strong>Premislaus: Would you recommend the upcoming Haiku release to less demanding user who uses computer mainly to browse the Web and wants to replace unsupported Windows XP on an old hardware? Or would you rather recommend a lightweight Linux distribution? </strong></a>

<p align="justify"><strong>pdziepak:</strong> With recent advances in the development of WebPositive I think we can safely start recommending Haiku to people who believe Windows XP is the pinnacle of operating systems. Unfortunately, there still are problems with the drivers but it depends mostly on luck.</a>

<p align="justify"><strong>Premislaus: Do you think that working on a niche open source project will allow you to achieve professional success? </strong></a>

<p align="justify"><strong>pdziepak:</strong> I hope so. I think what's important is what I have accomplished and what I have learned by this time, and project popularity is of rather secondary importance.  Each project has its own rules of cooperation between developers and it's definitely worth to experience many different workflow models, so you can draw conclusions and take advantage of different solutions.</a>

<p align="justify"><strong>Premislaus: What are your relations with the Polish community and do you think it does its job? When you follow old haiku-os.pl news, you will notice that our site had more editors and active users once. There were even attempts to organize development competitions (billing applications) with financial prizes. One of the had the pool of 1000 zł [about 250€ - tr. annot.], it's not much, but what matters is the fact there was such prize. That were times when BeOS was still usable, <a href="https://en.wikipedia.org/wiki/Magnussoft_ZETA">Zeta</a> was out there and it seemed like Haiku also will be soon. It has been many years since that time, the community shrank and it looks rather depressing. Can you point out anything we're doing wrong? </strong></a>

<p align="justify"><strong>pdziepak:</strong> I don't think Polish community is doing anything wrong, quite the opposite, the drive to promote Haiku with such small interest is quite impressive. The problem here is the project itself. It's natural that interest vanishes when there is not enough progress in the works. I sometimes think that Haiku suffers from "not invented here" syndrome. Too many things have to be "native" (whatever that means) and written from scratch. Unfortunately, you can't build a complete operating system in reasonable time without huge amount of work. Thanks to package manager though, we can see growing number of ports which is a very good thing.</a>

<p align="justify"><strong>Premislaus: What are your other interests, hobbies? What kind of music do you like, which writers do you read? Do you watch any movies or series? </strong></a>

<p align="justify"><strong>pdziepak:</strong> When it comes to music, mostly heavy and very heavy sounds, though there are lighter exceptions. In case of books I have to admit that the situation could be much better, but it's not as bad so I couldn't pick my favorite authors - H. P. Lovecraft and J. R. R. Tolkien (without Lord of the Rings and The Hobbit). It will be hard for me to pick movies I like, because "good" is very subjective term and will tell you nothing. I don't like comedies (with a few exceptions) and absurd action movies.</a>

<p align="justify"><strong>Premislaus: Do you play any computer games perhaps? </strong></a>

<p align="justify"><strong>pdziepak:</strong> I didn't play for a long time. I've always preferred cRPGs though and undoubtedly the best game I have ever played is Planescape: Torment.</a>

<p align="justify"><strong>Premislaus: What other open source projects did you support or do you support now? </strong></a>

<p align="justify"><strong>pdziepak:</strong> Well, there are not too many operating systems. Last year I took part in GSoC for <a href="https://en.wikipedia.org/wiki/DragonFly_BSD">DragonFlyBSD</a>, this year GSoC for <a href="https://en.wikipedia.org/wiki/OSv">OSv</a> is in schedule. A long time ago I have worked on <a href="https://en.wikipedia.org/wiki/FreeSpace_2_Source_Code_Project">FreeSpace Source Code Project</a>, based on FreeSpace open sourced code. I can't tell I have good memories from that time.</a>

<p align="justify"><strong>Premislaus: Why?</strong></a>

<p align="justify"><strong>pdziepak:</strong> Subversion ;-).</a>

<p align="justify">More seriously (though I don't like Subversion), lack of organisation and clear project goals. It was a mix of C and C++ with more of the former, written in a way - as long as it works, with lots of quirks and code written mostly in 1996-1998. Due to reasons I do not understand everything had to compile with ancient MSVC 6, which was much more burdensome than GCC2. There wasn't any form of code review.</a>

<p align="justify"><strong>Premislaus: Was the work you are doing at Haiku useful in other projects you are involved in? I know that DragonFlyBSD and OSv has a little different target than Haiku, but perhaps there are any similarities between the projects? In which fields are these projects better or worse than Haiku, and I don't mean features or widespread use by that but, let's say, organisation? </strong></a>

<p align="justify"><strong>pdziepak:</strong> Regarding OSv, this project has very little in common with Haiku, despite conforming license, there is not much room for code sharing. OSv uses C++11 and Boost in kernel. In case of DragonFlyBSD differences are not that big, but kernel structure being completely different, it doesn't make much sense to use my work for one project in another. On the user level OSv and Haiku are even more different. Haiku is full-blown operating system, when OSv is actually just <a href="https://en.wikipedia.org/wiki/Exokernel">an exokernel</a> running only on VMs so there is no point in comparing these projects. DragonFlyBSD has indeed completely different target - servers, Haiku is definitely more user-friendly.</a>

<p align="justify"><strong>Premislaus: Can you imagine Microsoft going open source? </strong></a>

<p align="justify"><strong>pdziepak:</strong> There is some GPL-licensed Microsoft code in Linux. Some of their projects has public code (I think mainly about <a href="https://en.wikipedia.org/wiki/Singularity_%28operating_system%29">Singularity</a> here), of course it is not released on a license approved by His Excellency R. M. Stallman, but that doesn't change the fact that everyone can access that code. If I recall correctly Microsoft shared Windows kernel source code as part of agreement with universities. It's not that Microsoft is big, eternal enemy of open source movement. Though I don't think Windows will become open source project in the nearest future.</a>

<p align="justify"><strong>Premislaus: Inside the open source movement, there is much energy spent on debates about licenses, free vs. open software, etc. What is your opinion on that subject? </strong></a>

<p align="justify"><strong>pdziepak:</strong> To be honest, I don't really care about these GPL vs. BSD and free vs. open disputes. However, there are many people who can't live without imposing their views to others, so if they have to, let them argue. Indeed, license incompatibilities are irritating at times, but this issue doesn't come up that often. I can't imagine not using particular program just because it's not free.</a>

<p align="justify"><strong>Premislaus: Many solutions in IT were not adopted for various reasons, sometimes something worse won with something better. What do you miss the most? From our IRC conversations I know you can't get over <a href="https://en.wikipedia.org/wiki/Itanium">Itanium</a>. </strong></a>

<p align="justify"><strong>pdziepak:</strong> I will not say Itanium is better but I'll admit that many interesting ideas were used in this architecture, especially VLIW and speculative execution are. It's a shame that Singularity I mentioned earlier did not have any continuation. Plan 9 also could be something more than just an oddity. Especially that it is an operating system in which Ken Thompson and Dennis Ritchie were involved.</a>

<p align="justify"><strong>Premislaus: When GCC 4.9 was released you wrote on Polish Haiku channel that you can finally go back from Clang to GCC. In which areas is GCC better in your opinion? Recently, we can see a trend of bashing GCC and praising Clang. </strong></a>

<p align="justify"><strong>pdziepak:</strong> I have an impression that Clang fascination I get to deal with sometimes is exaggerated. There are not many technical reasons why I prefer GCC, it's just that Clang managed to irritate me by things like warnings in code that is standard compliant or hard to comprehend interpretation of _Generic standard. Oftentimes people argue that Clang has much clearer internal structure, it's undoubtedly true but to be honest - as a user I don't really care.</a>

<p align="justify"><strong>Premislaus: Fairly common view is that Haiku is missing large IDE like Eclipse. We have editor with syntax highlighting Pe, very simple IDE Paladin and Vim port (probably there are other console tools). How much work would be porting some big and popular IDE? Are the tools available for Haiku really insufficient or maybe is it a matter of laziness, unwillingness to learn new program?</strong></a>

<p align="justify"><strong>pdziepak:</strong> I think it's more a matter of habit. There are many people just like me who don't use full IDEs and simple editor is enough for them. Many others, on the other hand, can't imagine coding without an IDE and I don't think that's something to be ashamed of, sign of laziness. There is also third group of people who need whole new operating system, preferably written in Lisp, to be able to program. Everyone has their own habits and it's hard to expect that they suddenly abandon them. However, I don't think Haiku needs its own, special IDE, as some people suggest. It would be better to put the work into porting Eclipse which could benefit other java applications.</a>

<p align="justify"><strong>Premislaus: What is the purpose of GNU/Hurd then if there is Emacs? </strong></a>

<p align="justify"><strong>pdziepak:</strong> Lisp Interpreter must be run on something, that's what GNU/Hurd is for.</a>

Other interviews:
/community/forum/interview_matthew_madia
/community/forum/interview_kallisti5

Translated by KapiX</a>