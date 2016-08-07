+++
type = "article"
title = "Kernel Driver"
date = "2010-05-26T02:18:31.000Z"
tags = []
+++

<h3>3 - Kernel Driver</h3>
<p>The part of the graphics driver that exists in the kernel space serves one purpose, to give the accelerant access to the video card. During video driver startup, the kernel driver 'transfers' as much resources as possible to the accelerant in order to allow the accelerant direct access to the video card, without taxing the kernel any further. Resources and information that can not be transferred are instead accessed through the API of the kernel driver component in simple functions. </p>

<p>This split method accomplishes two major things that can not normally be achieved by normal drivers: optimal speed, and stability. Optimal speed is reached because there are barely any (slow) context switches between user and kernel space. Stability is achieved because if the accelerant happens to die, it does not bring the system down since it resides in user space. </p>

<p>The kernel driver has two interfaces
<ul>
    <li>the interface to the OS (&quot;system hooks&quot;) in kernel space that is responsible for the driver 
        initialization and publicizing of the driver name to the system</li>
    <li>the interface to the accelerant (&quot;user hooks&quot;) in user space for actual use of the driver</li>
</ul></p>

<p>The following picture of the startup method of BeOS (in relation to video drivers) shows among other things how the kernel driver is loaded. First the kernel drivers are initialized via the "system hooks". For drivers that succeed (ie: there is supported hardware found) the "user hooks" can then be used. </p>

<p align="center"><img src="/files/images/writing-video-card-drivers/3.kernel.driver.png" width="627" height="346" alt="3. Basic BeOS boot sequence in relation to video drivers."></p>

<p>After the kernel driver is loaded all known accelerant's are tried via the user interface of the <b>first found working kernel driver</b>. This process is continued until an accelerant reports a <code>B_OK</code> status, meaning that it can work with the loaded kernel driver. After this the rest of the loading process continues as usual, ending when BeUserScript script is run in <code>/boot/home/config/boot/</code>. At this point, the user is usually moving the mouse and attempting to use the system. </p>

<p>For the rest of this chapter, we will discuss the system and user interfaces of the kernel driver. Information on the accelerant is found in chapter 4 - <a href="/legacy-docs/writing-video-card-drivers/04-accelerant">Accelerant</a>. </p>


<a name="3.1"></a>
<h4>3.1 - Interface To The OS</h4>
<p>A kernel driver is loaded during the startup of the OS, is started by the OS, and is published to the user space, which can access it via the accelerant using &quot;user hooks&quot;. </p>

<p>To do this the kernel driver needs a few standard routines:
<ul>
    <li><code>init_hardware()</code></li>
    <li><code>init_driver()</code></li>
    <li><code>uninit_driver()</code></li>
    <li><code>find_device()</code></li>
    <li><code>publish_devices()</code></li>
</ul></p>

<p>Kernel drivers are found in two locations in BeOS:
<ul>
    <li><code>/boot/beos/system/add-ons/kernel/drivers/bin/</code> (standard with the system supplied drivers)</li>
    <li><code>/boot/home/config/add-ons/kernel/drivers/bin/</code> (for user add-on drivers)</li>
</ul></p>

<p>System kernel drivers are linked to by a symlink, located in <code>/boot/beos/system/add-ons/kernel/drivers/dev/graphics/</code>, and user add-on drivers are linked to by a symlink, located in <code>/boot/home/config/add-ons/kernel/drivers/dev/graphics/</code>. </p>

<p>If a problem appears with a particular add-on during boot, a configuration screen can be accessed by pressing the spacebar at the <b>very beginning</b> of the iconic boot screen. Choose &quot;Safe Mode Options&quot; -> &quot;Disable User Addons&quot;, and continue booting. The system will then not attempt to load any add-ons, and allow you to manually remove the offending driver in <code>/boot/home/config/add-ons/kernel/drivers/bin</code>. If no working kernel driver is found, BeOS will boot into a black and white failsafe video mode, allowing you to manually check what is wrong. </p>


<a name="3.1.1"></a>
<h5>3.1.1 - init_hardware()</h5>
<p>If all the installation demands are met, the system will attempt to initialize the kernel driver during startup by calling <code>init_hardware()</code>. This routine will check if the required bus system (e.g.: ISA and/or PCI) is available, and naturally, if a supported device is present. </p>


<a name="3.1.2"></a>
<h5>3.1.2 - init_driver()</h5>
<p>On success of <code>init_hardware()</code>, <code>init_driver()</code> will be called. With this some needed variables are initialized, like the name of the present device, and the required bus will be opened for use. </p>


<a name="3.1.3"></a>
<h5>3.1.3 - publish_devices()</h5>
<p>The system will now call the names of the supported hardware via <code>publish_devices()</code>. The names will be published as symbolic links in the file system, in the <code>/dev/</code> directory. Where this symbolic link points to depends on the corresponding driver location, which was explained in section 3.1 above. </p>

<p>The driver is supposed to generate and publish a &quot;unique&quot; name for the card it is bound to. Usually the driver uses the manufacturer ID, card ID, bus number, slot number, and in some cases a function number, to generate it's &quot;unique&quot; name. Also of relevance is the physical slot the video card is seated in. Therefore creating unique names for two exact cards is not an issue, since they are seated in two different card slots. </p>

<p>The driver will be loaded only once into kernel space, and will support a predefined maximum number of different cards. That number is programmed into the driver itself, when it was created by the driver author. </p>

<p><b>Some examples:</b>
<ul>
    <li>A single unified driver has been created to deal with multiple graphics cards by the same vendor, strictly PCI. The driver author has decided to limit the number of cards of this type to thirty (30) instances at one time, for whatever reason. If the computer has 3 PCI cards of this make/model, there will be three entries in <code>/dev/</code>.</li>

    <li>A single unified driver has been created to deal with multiple graphics cards by the same vendor, regardless of bus type. The driver author decides using 30 is still a good limit, and uses that. The computer happens to have one AGP video card, and 4 PCI video cards in it. (Lucky computer user. ;) What will show up in the <code>/dev/</code> path will be <b>five</b> entries for this driver.
</ul></p>

<p>Every &quot;filename&quot; in the <code>/dev/</code> hierarchy ressembles a supported device that can be used by the system, using the unique name assigned to it by the driver. If however <code>init_hardware()</code> was unsuccessful then no names will be published in the <code>/dev/</code> hierarchy at all. </p>

<p>When a second accelerant tries to control the same video card, the kernel driver will keep a &quot;times opened&quot; counter, and report that the driver and video card were already initialized. </p>


<a name="3.1.4"></a>
<h5>3.1.4 - uninit_driver()</h5>
<p>When a kernel driver is no longer required, and the accelerant has performed the final close routine for the driver, the operating system will call <code>uninit_driver()</code>. This routine releases all used resources and closes any open busses used by the driver. </p>


<a name="3.1.5"></a>
<h5>3.1.5 - find_device()</h5>
<p>The <code>find_device()</code> routine returns all routine names associated with the &quot;unique name&quot;, and makes it ready to be used by &quot;driver hooks&quot;. These &quot;driver hooks&quot; are the interface to the user, used to access the driver in the kernel.</p>


<a name="3.2"></a>
<h4>3.2 - Interface To The User</h4>
<p>Once the kernel driver is initialized by the operating system, it can be accessed by using the following hook routines:
<ul>
    <li><code>open_hook()</code></li>
    <li><code></code>close_hook()</code></li>
    <li><code></code>free_hook()</code></li>
    <li><code></code>control_hook()</code></li>
    <li><code></code>read_hook()</code></li>
    <li><code></code>write_hook()</code></li>
</ul></p>

<p>With this a driver can be opened and closed, can be written and read, and controlled dierctly. The hooks are based on a concept similar to file access: a driver can open or close the driver-filename in the <code>/dev/</code> hierarchy. </p>


<p><b>Applications of a kernel driver as a part of a video driver.</b></p>

<p>For a video driver only the following routines truly work:
<ul>
    <li><code>open_hook()</code></li>
    <li><code>free_hook()</code></li>
    <li><code>control_hook()</code></li>
</ul></p>

<p>The remaining routines are simply not used, according to the BeOS Documentation. </p>

<p>For the video driver the accelerant portion is considered the &quot;user&quot;, unlike other driver types where an application can use the remaining hook routines directly, such as <code>write_hook()</code>. An example of a driver that can use all hook functions would be a mass storage driver. </p>

<p>The <code>control_hook()</code> routine determines when an accelerant trying to access the kernel driver if it is allowed to do so. Input/Output commands can be given for ISA or PCI operations too. </p>

<p>The kernel driver must recognize the supported card, map it into system memory, assign ISA and PCI &quot;configuration space&quot;, assess what Input/Output commands are available, and be prepared to deal with the accelerant's use of &quot;user_hooks&quot;. One more thing to be aware of, is that IRQ's can be accessed in kernel space too, more of which will be explained later.</p>

<p>Resources such as PCI Input/Output addresses are mapped into system memory, and in some cases, the entire video memory can be allocated in system memory, further speeding up video operations. By allocating these resources into system memory, they become available to the accelerant, without having to go through the (slow) kernel driver repeatedly. Any registers that the video card has may optionally be placed into memory, depending on if the programmer chooses to do so, the video card make/model, and if it is a PCI or AGP video card. More of these concerns are covered later. </p>


<a name="3.2.1"></a>
<h5>3.2.1 - open_hook()</h5>
<p>The <code>open_hook()</code> routine makes a &quot;shared info&quot; <code>struct</code> that can be accessed by all accelerants, and contains the card's ID, the manufacturer, card specifications (DAC speed for each color depth, memory and core speed), and display settings available by it. </p>

<p>If possible a semaphore is created that later can be used to synchronize with the vertical retrace of the video card, using an interrupt handler that allows for capturing and release of the semaphore. The BeOS makes sure (since the PR2 days) that the IRQ handler is installed in such a way that in the event of a shared interrupt line (a common occurrence with PCI cards), all routines called by all affected drivers are &quot;daisy-chained&quot;. A status return type is used that indicates how the interrupt was handled, and if intended for a particular card or routine. </p>


<a name="3.2.2"></a>
<h5>3.2.2 - close_hook()</h5>
<p>The <code>close_hook()</code> routine closes the driver in principle, but according to the BeOS documentation, it does not work for video drivers, instead returning an error status. </p>


<a name="3.2.3"></a>
<h5>3.2.3 - free_hook()</h5>
<p>The <code>free_hook()</code> routine closes the kernel driver. The number of times that the driver has been opened or closed is logged by the operating system and when the kernel driver is closed for the last time, the <code>free_hook()</code> routine is called, and the driver is actually closed for real. This means that everything that was done from <code>open_hook()</code> onwards is done in reverse order, finally ending in <code>free_hook()</code>: The interrupts are cleared, the outstanding interrupts are deleted, the interrupt routine is deinstalled, the retrace-semaphore deleted, the video card memory &quot;unmapped&quot; and the &quot;shared info&quot; <code>struct</code> destroyed. </p>


<a name="3.2.4"></a>
<h5>3.2.4 - control_hook()</h5>
<p>As mentioned before the <code>control_hook()</code> routine is called whenever any accelerant attempts to access it's matching kernel driver portion. The only public function that the accelerant can use is the <code>B_GET_ACCELERANT_SIGNATURE</code> constant, which is not a real function, but selected with a switch() statement. </p>

<p>Other functions in the control_hook() are for instance execution of IO commands for ISA or PCI busses (such as PCI configuration space I/O commands), and it is possible for the accelerant to call for a private struct ("shared_info") to get all information about the card that is controlled by the driver (and other instances of the accelerant). It is also possible to activate and deactivate interrupts via the control_hook() routine if implemented. </p>


<a name="3.2.5"></a>
<h5>3.2.5 - read_hook()</h5>
<p>The <code>read_hook()</code> routine is not used, returning instead a <code>B_NOT_ALLOWED</code> status. </p>


<a name="3.2.6"></a>
<h5>3.2.6 - write_hook()</h5>
<p>The <code>write_hook()</code> routine is not used, returning instead a <code>B_NOT_ALLOWED</code> status. </p>

<a name="3.3"></a>
<h4>3.3 - Conclusion</h4>
<p>The kernel driver interface is well thought out. This is not really surprising given how long it has existed in BeOS. Part of the structural concepts were borrowed from the linux world, in which it has been around even longer, and has over the years developed into a solid implementation of how drivers should behave. </p>

<p>The construction of a kernel driver portion for a video driver is not very exciting, because most of the actual functionality exists in the accelerant. It is important to pay attention however when no separation needed programming the kernel driver, because one small mistake can crash the entire system. The kernel is special indeed. The lockups etc. are much more common in the accelerant ;-) </p>
