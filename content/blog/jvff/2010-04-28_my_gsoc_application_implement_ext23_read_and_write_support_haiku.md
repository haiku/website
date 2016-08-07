+++
type = "blog"
author = "jvff"
title = "My GSOC Application: Implement ext2/3 Read and Write Support for Haiku"
date = "2010-04-28T01:04:58.000Z"
tags = ["gsoc", "gsoc2010", "ext3", "application"]
+++

Haiku currently has ext2 read-only support. My project is to extend the code to allow for full ext3 support. The code will be MIT licensed and will be object-oriented (inspired by Haiku's BFS implementation), allowing for easy understanding, learning and maintainability.

The full Google Summer of Code application follows:
<!--break-->
<h4 class="icon-person-medium">Personal Profile</h4>
<ul>
    <li><strong>Full name:</strong> Janito Vaqueiro Ferreira Filho</li>

    <li><strong>Preferred E-mail Address:</strong> jvffprog _AT_ hotmail.com</li>

    <li><strong>Trac username:</strong> jvff</li>

    <li><strong>IRC usernames:</strong> jvff, javaff, janitovff</li>

    <li><strong>Summer Education:</strong> No summer classes</li>

    <li><strong>Employment:</strong> Not currently seeking employment</li>

    <li><strong>Schedule:</strong> In June I might have some final exams, which may limit the number of hours I dedicate to the project.</li>

    <li><strong>Time Allocated:</strong> Minimum of 20 hours per week in June (because of any possible final exams) and a minimum of 40 hours per week on the other two months.</li>

    <li><strong>Internet Accessibility:</strong> Internet connection at home and at the university.</li>

    <li><strong>Previous Years:</strong> I haven't participated in the Google Summer of Code before.</li>

    <li><strong>Brief Bio:</strong></li>

I first started programming in C++ when I was 12 years-old. I became a self-motivated individual, with ever more self-taught skills. From there I learned many things about various computing related topics, and before university I started to gain interest in hobby operating systems. I researched most aspects about simple operating systems (boot process, process schedulers, memory managers, etc.). I became interested in more advanced file system concepts, especially related to snapshots and versioning, and then I became interested in following more about where file system development was heading, and also how the file system abstraction could be used for other purposes (as in Plan 9 from Bell Labs).

I am currently on the 4th year of computer engineering. In my class, I am one of the top students and also one of the four people who haven't failed any courses. My colleagues usually ask me for help on anything computer related they need, and I also enjoy these opportunities to learn more.

In the middle of my second year at university, I began an undergraduate research mentorship on fault tolerant execution of genetic algorithms of molecular simulation in clusters. The mentorship ended in the beginning of the second semester of 2009. During this one year time, I matured a lot in programming and team working. It was my first experience of being mentored, and also my first experience on developing code for another project. I also gained experience in Linux system administration and in parallel programming using MPI.

Currently I can code in a lot of languages, some of them are: Assembler (x86 and x86-64), C/C++, C#, Haskell, Lisp, Java, Ruby. The language I use most and that I am more experienced with is C and C++, followed by assembler. Most assignments in university is in C++ and, as stated before, C++ was my first language. My development tools include Vim, the GNU compiler collection and the GNU debugger. For developing Haiku, I also plan to use Qemu to do testing.

<h4 class="icon-kernel-medium">Project Idea Information</h4>

    <li><strong>Project title:</strong> Implement ext2/3 read and write support to Haiku.</li>

    <li><strong>List of project goals:</strong>
	<ul>
          <li>Implement initial ext3 read support (1 week).</li>
            <li>Implement support for the ext3 journal (2-4 weeks). Includes:
		<ul>
                  <li>Replaying the log;</li>
                  <li>Storing transactions.</li>
		</ul>
	    </li>
            <li>Implement an ext3 block allocator (2-3 weeks).</li>
            <li>Implement support for altering file data (1 weeks).</li>
            <li>Implement support for writing file meta-data (1-2 weeks). Including:
		<ul>
                  <li>Truncating files;</li>
                  <li>Deleting files and directories;</li>
                  <li>Creating files and directories;</li>
                  <li>Changing file stats.</li>
		</ul>
		</li>
            <li>Test implementation (1-2 weeks):
		<ul>
                  <li>Test implemented operations;</li>
                  <li>Test journal consistency;</li>
                  <li>Stress test the file system.</li>
		</ul>
		</li>
            <li>Possibly implement and test initial xattr support.</li>
            <li>Possibly support advanced journal features (shared and/or external journals).</li>
            <li>Possibly start ext4 read support.</li>
	</ul>
	</li>

    <li><strong>Project Description:</strong></li>

The project will start off based on the current ext2 code. It already has many useful functions and the basic structures are already implemented. The aim is to follow the design and structure of the BFS code where possible. Read support for ext2 is already implemented, and this includes directory traversal. However, to support ext3 read support, it will also be necessary to add support for Htree indexed directories.

Initially, the priority will be to support ext3 read support. Development on this will start before the coding period of the Google Summer of Code begins. This is to allow a better familiarization with the Haiku code and build tools. The first requirement will be to implement a Journal class to allow to read the on disk journal and to verify it's consistency. Emphasis will be given to an on-disk journal, and advanced journal features, such as shared journals or external journals, will not be implemented. These features might be implemented if the other goals are completed ahead of schedule.

The next step will be to support Htree indexed directories. It is planned to create a Htree class to better structure the code.

When the coding period begins, the first step is to implement journaling support. This will allow all write operations that will be implemented to be journaled. The first step will be to support replaying the journal, to maintain disk consistency. To actually represent transactions inside the journal, a Transaction class will be implemented to support all write operations to register their intentions inside a Transaction object. The object will then be responsible for separating what will be stored inside the journal, and in what order. Therefore it will control the actual disk writing.

Before actual write operations are implemented, a BlockAllocator class will be created. The responsibility of this class is to allow allocation of blocks in the file system. Support will be added to specify specific blocks for allocation and to specify a specific block group from where to allocate. Bitmap update will be stored in a specified Transaction object.

File data altering operation is then implemented, storing the specified changed blocks into a Transaction object, which will control when to flush it to the device. Integration with the file cache will be supported to allow memory mapped files. To do this, further experience and knowledge of the file cache will be required, and will be researched before the coding period begins.

Using the BlockAllocator class and Transaction support, file meta-data operations will be implemented. To allow this, the inode will be stored in a transaction, allowing file stats to be changed (including it's size). Truncating files is simply a matter of changing the inode and using the BlockAllocator to allocate (and possibly pre-allocate) or deallocate blocks for the file.

Finally, everything will be glued together (most probably as they are ready for testing) in the kernel_interface.cpp, including the necessary hooks in the respective data structures. Initial testing will be to verify each implemented feature to see if they work correctly, and if the journal is updated correctly. It would also be interesting to elaborate some kind of “power-down” test to see if the journal retains it's consistency. An automatic stress test would then be used to do random operations and then verify the resulting file system state.

After achieving all of these goals, if there's enough spare time, a few sub-projects could also be done. They include support for extended attributes (and possibly incorporating BFS attributes into them), support for advanced journaling features (such as external journals or shared journals) and initiate support for ext4 read support. Access control lists will not be implemented.

    <li><strong>Why I want to work on this project:</strong></li>

I am very interested in OS development and specifically file systems implementation. Implementing ext3 support is something I believe will allow me to earn lots of experience in something I hope I can continue developing. Building off existent ext2 read-support allows me to head-start my project, and I can base off of it's design to continue coding. Also, Haiku appeals to me because it represents an effort to make a clean, consistent and fast desktop operating system, and since I started following it in 2007 I've clearly seen lot's of progress and that it has a bright future. It's ideology is reflected in it's code, having it clean and clear, which makes it easy to study, learn and use. Because of all of these reasons and because it's coded in C++, the language I'm most experienced in, Haiku is the best operating system for me to try to fulfill my goals in studying file systems and operating systems, and in contributing something useful for an open source project.

I learn quickly, I'm not afraid to read deep code (be it from Haiku or from other ext3 implementations), and I have the motivation to do this project. Hopefully I can fulfill all that is required to do so.

</ul>