+++
type = "blog"
author = "axeld"
title = "Introducing the launch_daemon"
date = "2015-07-17T20:54:51.000Z"
tags = ["bootscript", "startup", "launch_daemon", "launch daemon", "boot process", "boot"]
+++

Since some time, I am working on a replacement of our current shell script based boot process to something more flexible, a similar solution to Apple's launchd, and Linux's systemd.

While there is still a lot to do, it's now feature complete in terms of being able to completely reproduce the current boot process.

Since the switch to our package manager, there was no longer a way to influence the boot process at all. The only file you could change was the UserBootscript which is started only after Tracker and Deskbar; the whole system is already up at this point.

The launch_daemon gives the power back to you, but also allow software you install to automatically be started on system boot as well. You can also even prevent system components from being started at all if you so wish.
<!--break-->
Furthermore, it allows for event based application start, start on demand, a multi-threaded boot process, and even enables you to talk to servers before they actually started. More on that later.

The launch_daemon is deeply integrated with the rest of the system, and builds on OS services not available on other systems, so porting an existing solution was not an option. However, I could reuse some of their design ideas without having to adopt any solutions I did not like that much.

<h3>The boot process</h3>

Instead of the Bootscript, the kernel now directly starts the launch_daemon as the first userland application. This will then scan the <i>/system/data/launch/</i> (as well as its non-packaged counterpart), and <i>/system/settings/launch</i> directories for configuration files. Packages will deliver the contents of the former directory, while the user (or dedicated applications) can customize the boot process via the latter. This for example will allow the DriveEncryption package to replace the user login with its own solution which can then mount your encrypted volumes automatically. Parts of the former Bootscript, like setting the timezone, and cleaning /tmp has been hard-coded into the launch_daemon, and cannot be customized (which could of course be changed if the need for this ever arise).

The settings files are using driver_settings format which is parsed into BMessages for internal processing. The only file the Haiku package delivers for booting the system is <i>/system/data/launch/system</i>. It defines all jobs, services, and targets needed to bring up Haiku, where a job is a one-time application launch, a service is a permanently running background application, and a target is a way to combine several jobs/services and launch them on some occasion.

While you can express dependencies in the job definitions, no system servers need to have any dependencies defined; they are all started in parallel on boot. This is done by setting up the (currently port based only) communication channels before actually starting anything. For example, when the registrar is ready to run, it may already have a message from the app_server waiting in its message queue in order to register its application. And this also allows the system to make the print service available to you (or applications), but only requiring to actually start the print_server when you try to talk to it.

Back to the boot process, the app_server will, once started, create a session for any attached displays (currently, there is only one, though), which prompts the launch_daemon to start the login target for this session. The default is an executable called auto_login which does just that without further ado.

When a session is actually started using auto_login, the launch_daemon forks off a child process that adopts the new user's ID, and can access its home directory. The child will restart its BApplication, and at this point, the <i>~/config/data/launch/</i> directory is scanned, as well as <i>~/config/settings/launch</i> which uses the same separation than the system boot does.

The user launch script will start the FirstBootPrompt, or the desktop (as in Tracker, and Deskbar), depending on the environment. Instead of evaluating its return value in the Bootscript, FirstBootPrompt will now launch the desktop or installer targets itself. Tracker and Deskbar will wait until the mount_server will report that it has mounted all volumes that should be mounted during startup. This is done via the launch_daemon, too: the mount_server registers an event with the launch_daemon, and notifies it whenever the event is triggered.

<h3>The current state</h3>

Everything I've mentioned so far is actually working, but only the bare minimum has been implemented to allow to boot Haiku exactly as it used to be. For example, the only event the launch_daemon currently supports is "demand" (ie. when something needs that app to run), and the only conditions are "safemode", "read-only" (to detect the boot from a read-only medium), and "file_exists".

I'm sure the next weeks and months will reveal a few bugs as well, but I have high hopes that the transition to the launch_daemon will be a smooth one. I plan to merge the launch_daemon to Haiku's main repository within the next few days.

<h3>The future</h3>

I have quite a few things that I plan to implement one day; some are important, some would just be nice to have.
This includes the following features, although there is probably more I forgot to mention:
<ul>
<li>Monitor running services, and make sure a service keeps running (and restart it when needed). In general, not only manage launching applications, but also their lifetime, for example, stop applications when a session ends.</li>
<li>List jobs, events, and control the launch_daemon via the command line</li>
<li>Use the syslog for error reporting, as well as optional debug output to understand the boot process</li>
<li>Implement time based events (like cron), as well as delayed application start (ie. launch this script in 5 seconds, this will also be used to delay restarting a service that stopped running)</li>
<li>Add more conditions, and especially more events like file creation/deletion, team exit/launch, network accessible, etc.</li>
<li>Allow applications to register conditions, too</li>
<li>Add other communication channels like sockets</li>
<li>Allow for alternative target configurations that can be configured. For example, your package could add an alternative desktop target, and some software could allow you to easily switch between the two.</li>
<li>Stricter naming rules and/or system prefix for jobs.</li>
<li>Review how ports are resolved, and how deadlocks of launch_daemon/registrar are prevented.</li>
<li>Register the launch_daemon in the kernel, so find_port() would no longer be needed at all. Furthermore, this would allow to use the respective user launch_daemons as main communication partners -- currently, the system launch_daemon is always the middle man.</li>
</ul>

Time might also reveal some conceptual shortcomings that will need to be addressed, but I think we're good for some time. I've added a <a href="http://dev.haiku-os.org/wiki/LaunchDaemon">page to our Wiki</a> that explains how the launch_daemon can be configured.