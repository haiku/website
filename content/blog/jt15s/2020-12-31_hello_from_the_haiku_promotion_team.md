+++
type = "blog"
title = "Hello from the Haiku Promotion 'Team'!"
author = "jt15s"
date = "2020-12-31 21:33:25+11:00"
tags = ["haiku", "software"]
+++
Hi there, I'm jt15s, a new Haiku community member! I've been following the project for a few years now since I stumbled upon an article about Haiku. 

If you read the title (which I'm assuming you did), you’re probably going, "wait, we have a promotion team?" Well, yes, now we do. As an informal “team” of two (currently), we are super excited to share our plans to help promote Haiku and make more people aware of it. In fact, this is the *second* iteration of a promotion team for Haiku. Until 2010, there was an active promotions team. Unfortunately, those who were involved on the team are not active in the Haiku community anymore and hence promotion efforts have mostly been dormant - until now.

## Who's on the team?
The team currently consists of scott_puopolo18 and I. We are also working with Haikunauts and BeSly, two Haiku-related resources. However, anyone who wishes to help is more than welcome to! Reach out to me (jt15s) [on the forums](https://discuss.haiku-os.org/u/jt15s) if you are interested. We are also looking for the following informal roles:
* Video Editor - we need someone to produce video content for Haiku. Videos wouldn’t need to be too complex: just something that looks simple yet professional and something less than 10 minutes long.
* Presenter - we need someone who is a confident speaker and who can speak in front of a microphone/camera (preferably with a good mic/camera setup too) to be the voice (or maybe even face) of the Haiku videos we make, to give them a more “human touch”.
* Graphic Designer - we'd like to have someone (preferably a professional or an artist who is willing to volunteer) who is solely responsible for producing graphics for Haiku promotion. Graphics should be uploaded to both the website and Haiku Artwork repository using Github, but I’m more than happy to help teach people how to do that.
* Live Stream Technician - we are considering doing live streams, but we will need someone with technical knowledge of live-streaming who can help facilitate this.
* Social Media Maintainer - our social media accounts need someone to post updates, maintain profile information and answer any queries and respond to any comments people post on any of our social media accounts. More than one person could take up this role (i.e. one person managing Haiku's account on one social media platform).

## Our promotional strategy
As the promotion team, we want to make sure people know about Haiku. One problem facing the project is that we may be more obscure than other FOSS projects. This would mean it's harder to get new contributors, whether this is developers, documentation writers or just volunteers in general. Hence we aim to attract more attention towards Haiku, and in turn, new users and volunteers. 

**I would like to take this opportunity to urge you to help the project: you don't need to be a programmer to help out. [You can find ways to get involved here.](https://www.haiku-os.org/community/getting-involved/)**

How will we do this, you might ask? Well, there are a couple of aspects of our strategy. 

### The media and reviewers
A database of all the reviews/mentions of Haiku is being compiled for easy reference and so we can contact a variety of media sources when we have a new release. Additionally, we are looking for more technology-related channels who may have not mentioned or reviewed Haiku before and see if they are interested in having a closer look at the OS. 

In terms of the media in general, we are planning to prepare press releases for the media - a press release is simply a formal, properly formatted version of an announcement. By releasing press releases it makes it easier for other media organisations to find major Haiku announcements and run a story about Haiku. 

In terms of reviewers, as mentioned before we are planning to contact reviewers and media organisations once Beta 3 is released. We have also prepared a reviewer information sheet with tips for reviewers, which is in the draft stage. 

### General Users
We mustn't forget about what is probably our main user group: general users. General users of Haiku are those who come to explore and try out the OS. Due to Haiku's remaining rough edges and still lurking bugs (we are in Beta after all), our general users are typically more understanding of the limitations and issues with the project. Attracting more general users and making sure our general userbase is content is very important.
Strategies such as making sure user queries are answered as well as spreading the word about new apps and releases is a good first start, but we are considering various other methods too.

### App Developers
If you follow technology news, you might have seen a mention of Medo, the recently-released 4K editor clocking in at only 1.27MB! This number alone highlights one of Haiku's many development advantages: our apps are small and light - even if you have a project with lots of features crammed into it, on Haiku the file size will likely be very reasonable. Add that to the fact that we have HaikuPorts, an organised porting system, that we use C++, one of the most popular progamming languages in the world, and that we have an amazing native API with some great features and you get the development environment that is Haiku. 
For the technically-minded, here are the features of the Haiku API:
* Ease of use with all the standard widgets
* Embraces multi-threading to enable low-latency user feedback with heavier processing running in the background
* Separation of UI and internal code
* Inter-application communication with a standard message system, allowing rich clipboard, drag and drop, replicants (where you can have parts of an application running inside another)
* Extension of existing applications with add-ons (in Medo this enables to add new filters and media formats)
* Full featured system APIs covering not only the user interface, file access and networking, but also things like MIDI devices, realtime audio and video processing, etc.

We want to attract more app developers, whether that's developers who want to port their existing app over to Haiku, or new developers who wish to make an app in Haiku that they feel is needed.
For any developers wishing to port their apps over to Haiku, we are already compatible with Qt, a popular GUI framework. Furthermore HaikuPorts already heavily simplifies and automates the porting process.
Additionally, we want to make any existing ports of FOSS projects to Haiku official platforms - this means having Haiku listed as an officially supported platform on the project's website. By getting Haiku listed on projects such as KDE, more people will be aware of Haiku and the fact that Haiku has a multitude of apps available to download.


### Researchers and Students
Surprisingly, Haiku is also an excellent system for research purposes. Let me explain further. Researchers don't need the stability and reliability that businesses do, which means Haiku is a possible research system for them. Furthermore, it is possible to make invasive and disruptive changes to Haiku without having to dodge security restrictions imposed by the system, or having to "hack" their way into the system. In the past, Haiku has had successful collaborations with the Auckland University, where a group working on UI/UX research experimented with Haiku. 
They produced Stack&Tile as well as the [Auckland Layout Engine (ALE)](https://www.cs.auckland.ac.nz/~lutteroth/research.html) for laying out user interfaces using a constraint solver. Apart from ALE, the group also had other projects which were not implemented into any official Haiku releases, such as a tool to auto-generate user documentation from user interface code as well as a way to dynamically modify the layout of a running window to optimise it for a specific workflow.

Apart from Auckland University, mmu_man, a member of the Haiku Community, also published a [research paper about the interoperability of filesystem attributes](https://dcpapers.dublincore.org/pubs/article/view/3633/1859), as well as a [research paper on using QEMU for OS development](http://adt.cs.upb.de/quf/quf11/QUF11-papers/quf2011-11.pdf). mmu_man also made a [poster advertising the benefits of using Haiku for research](http://eurosys2010.sigops-france.fr/poster_demo/eurosys2010-final17.pdf).
[Colin Günter did his master thesis on Haiku's WLAN stack](https://www.haiku-os.org/news/2016-02-26_wlan_master_thesis_published/), whilst Rudolf Cornelissen wrote a [thesis on writing video card drivers](https://www.haiku-os.org/legacy-docs/writing-video-card-drivers/).
We aim to attract more research groups by promoting the uses of Haiku for research, and we also want to reach out to Auckland University and see if their UI research group is interested in coming back to Haiku to conduct any future research.

Additionally, we have participated in [Google Summer of Code](https://summerofcode.withgoogle.com/) and [Google Code-In](https://codein.withgoogle.com/) (when it was still operating), providing opportunities for students to contribute to our project and develop their coding skills. We also participated in the [Semester of Code](http://semesterofcode.com/) but unfortunately we didn't receive any student applications. 

We aim to attract more research groups by promoting the uses of Haiku for research, and we also want to reach out to Auckland University and see if their UI research group is interested in coming back to Haiku to conduct any future research.

### Businesses
Businesses can benefit from Haiku as an operating system, and personally, I see Haiku as a lightweight alternative to the proprietary desktop operating systems businesses currently use. 

An information sheet for businesses has been drafted, which gives businesses a rundown of Haiku and its advantages and disadvantages as a business-oriented operating system. However, to attract more businesses we must improve Haiku further, and hence we will delay marketing efforts for businesses until Haiku reaches a stable and mature stage. 

### Partnerships with other Haiku-related sources
If you haven't heard of them already, [BeSly](https://www.besly.de/index.php/de/) and [Haikunauts](https://haikunauts.home.blog/) are the two major third party Haiku sources. BeSly is a wiki with tips and tricks on using Haiku, whilst Haikunauts is a blog aimed at promoting Haiku as an OS. As mentioned above, we will work in partnership with these two sources and see what we can do together to help spread the word about Haiku.

Additionally, we are also eager to work with any smaller blogs, websites or channels. If you run a blog, website, channel, or any other source, please contact me via the forums and let me know!

### General
I am thinking of running an advertisement in [Read the Docs](https://readthedocs.org/), a documentation website that serves a wide array of open-source projects. Read the Docs [allocates a portion of their advertising inventory to FOSS projects](https://docs.readthedocs.io/en/stable/advertising/ethical-advertising.html#community-ads) such as ourselves, hence this is a good opportunity to promote Haiku. What will go on the advertisement has not been decided as of now.

scott_puopolo18 is working on a set of interview questions for our developers to give the public a glimpse into the world of Haiku development, as well as shining a light on the challenges and opportunities in an open-source project. The predetermined set of questions means that we don't have to write new questions for each developer. To save time, we can simply send them off and the developer can write their response.

We are also planning to distribute more content via our often under-utilised social media platforms, as well as update them with current information (i.e. adding profile page art, applying for verification, updating or adding links etc.). Short-form posts on social media are what immediately comes to mind, although we are considering live-streams or videos if there is someone willing to help out.

Haikunauts also has several other ideas for promotional events, but we will share these with you later as we are still working out the details of these events.

### In closing
We are super excited to see how we can promote Haiku and help the project gain new members and volunteers. **[Remember, if you’d like to join, don’t hesitate and send me a private message on the forums!](https://discuss.haiku-os.org/u/jt15s)**

I’d also like to take this opportunity to wish everyone a very Happy New Year - here’s to a more fruitful, happy and lucky new year!

Finally, I'd like to thank PulkoMandy and waddlesplash who reviewed this post on Github and gave me plenty of constructive feedback on how I could improve this.
