+++
type = "blog"
author = "nielx"
title = "Report on the API Documentation Team Meeting of May 19th 2007"
date = "2007-05-19T10:12:12.000Z"
tags = ["documentation", "meeting"]
+++

<p>This is a report of the meeting of the API documentation team that was held on May 18th 2007 at 19:00 GMT on freenode.org in the #haiku-doc channel. The full IRC log is hosted by <a href="http://johndrinkwater.name/files/haiku/irclogs/20070518-%23haiku-doc.log">John Drinkwater</a>.<p>

<p>Here are some of the highlights for those that don't want to read the complete document. In this meeting people introduced themselves to the group. There was discussion on the working process, and it was decided to create a three phase working process and to start on the support kit. Communications will be done on the mailing list and on a wiki page. There were decisions on authors versus proofreaders and some small amendments to the existing API documentation guidelines were decided on.</p>

<h3>Participants</h3>
<ul>
  <li><tt>[Beta]</tt> - John Drinkwater</li>
  <li><tt>AJS</tt> - Alan Smale</li>
  <li><tt>ddew</tt> - David Weizades</li>
  <li><tt>MauriceK</tt> - Maurice Kalinowski</li>
  <li><tt>nielx</tt> - Niels Sascha Reedijk</li>
  <li><tt>niklas</tt></li>
  <li><tt>sardaukar</tt> - Bruno Antunes</li>
  <li><tt>Thom_Holwerda</tt></li>
  <li><tt>valexy</tt> - Alexey Veselovsky</li>
  <li><tt>wd</tt> - Andrey Yakovlev</li>
  <li><tt>wile_work</tt> - Mike</li>
</ul>

<h3>1. Introductions</h3>

<p>All the participants introduce themselves. There is some chitchat on a variety of things. <tt>nielx</tt> apologizes for being late. <tt>nielx</tt> will lead the meeting.</p>

<h3>2. Getting Started Information</h3>

<p><tt>nielx</tt> refers to the <a href="/documents/dev/haiku_documentation_team_how_to">Getting Started</a> document <tt>AJS</tt> wrote. He asks who has used this document and what the experiences were. Both <tt>sardaukar</tt> and <tt>ddew</tt> used that document to set up their environment in windows. They both claim that it is sufficient. <tt>Thom_Holwerda</tt> notes that it looks good and clear.</p>

<p><tt>sardauker</tt> says that he misses some examples of good and bad documentation practises. <tt>AJS</tt> thinks that this subject belongs to the API documentation guidelines. <tt>nielx</tt> agrees.</p>

<p><tt>Thom_Holwerda</tt> and <tt>niklas</tt> are on macs. <tt>nielx</tt> encourages them to try it out and send any amendments to the getting started document to <tt>AJS</tt>.</p>

<h3>3. Tasks</h3>

<p><tt>nielx</tt> wants to find the most efficient way of getting the work done. He proposes to divide the work up in small tasks. These need to be done individually because of the nature of internet work, however, he wants to make the mailing list the 'hub' of the documentation efforts where issues and contributions can be discussed. There was a list of <a href="https://www.freelists.org/archives/haiku-doc/04-2007/msg00016.html">current open tasks</a>, only the first two (proofread MIDI2 kit and support kit) are of importance.</p>

<p>At this point <tt>AJS</tt> reminds everyone in the room to subscribe to the <a href="https://www.freelists.org/list/haiku-doc">mailing list</a>.</p>

<p><tt>sardauker</tt> thinks that there should be a probation period for anyone contributing to the documentation team before they should become a team member. <tt>nielx</tt> wants to know if we really want to form an 'official' team, differentiating between team members and contributors, or that we just want to be a collaboration of contributors. <tt>niklas</tt> is in favor for the official team structure, <tt>sardauker</tt> thinks time should dictate what will happen. This issue was not discussed further.</p>

<p><tt>ddew</tt> asks if the team should be for 'regular' documentation as well. <tt>Thom_Holwerda</tt> says we should focus on the API part. <tt>nielx</tt> and <tt>niklas</tt> agree. However, <tt>nielx</tt> says that if someone comes up with a good plan on other forms of documentation, that he is willing to facilitate that person.</p>

<p>Then, <tt>niklas</tt> asked for a status report. <tt>nielx</tt> says that currently the support kit is documented, and the MIDI2 kit is documented, as well as the interface that drivers use if they want to communicate with the USB stack. The MIDI2 kit is written by Matthijs Hollemans, who was the developer of that kit, but it does not adhere to the API documentation guidelines, and it is informal here and there. It should be rewritten. The support kit was documented while <tt>nielx</tt> was drafting up the API documentation guidelines, which means that some parts may be outdated and not adhere fully to those guidelines. <tt>AJS</tt> proposes to start on one thing and then branch out. <tt>niklas</tt> offers to start on the MIDI2 kit, because he has some knowledge of the protocol. <tt>nielx</tt> proposes to first start with the support kit, which is relatively simple, to give everyone a good introduction into documenting API's.</p>

<p>The working process was decided after a long discussion. In short, it was proposed to see documenting the API as a three phase process. The first phase is where someone writes the documentation from scratch. The second phase is proofreading to check whether or not the technical details are correct, and if the document follows the guidelines. This is the 'rewording' phase. The third phase is when the grammar mafia goes over the document to iron out any remaining kinks. <tt>sardauker</tt> proposes a two stage commit policy, where two people need to both have gone over a document to make sure all the stages were performed, but <tt>AJS</tt> says that he doesn't think it's bad to have unpolished documentation in the repository. The task can alwas be done later. <tt>Thom_Holwerda</tt> reasserts that proofreading should not be done by the author. <tt>sardauker</tt> thinks there should be a WIKI page to keep track of who is doing what. <tt>nielx</tt> will create that page on <a href="https://dev.haiku-os.org/">Trac's WIKI</a>, but he asserts that any claim should be made on the mailing list first, and edited on the WIKI. In case of confusion, the mailing list has precedence over the WIKI. <tt>[Beta]</tt> thinks there should be an expiry date on claims of two weeks after the claim. <tt>nielx</tt> agrees, but wants to change that 'rule' to two weeks after the last sign of life on the mailing list.</p>

<p>The issue of language standard was brought up by <tt>Thom_Holwerda</tt>, he wanted to know whether to use American English or British English. It was decided to use American English, since the API was written in American English.</p>

<h3>4. API Guidelines</h3>

<p>We started off with the point stated by <tt>sardauker</tt>, who wanted to have a few examples of good and bad documentation, and the reasons for it. He suggests a WIKI. <tt>nielx</tt> and <tt>AJS</tt> think it will be best to encounter those examples during the early work on the support kit, and post them on a wiki.</p>

<p>Then the <a href="http://factory.haiku-os.org/documentation/Haiku_Book_doxygen/html/apidoc.html">API guidelines</a> came up. <tt>nielx</tt> wanted to know if there are any issues with it now. The general impression was that they were considered quite straightforward.</p>

<p>There were a few issues or amendments to discuss. The first was one from Axel Dörfler, who for the sake of consistency wanted to replace 'Documented By' in the header with 'Authors'. There was some discussion on the naming, on whether or not it would be clear that the mentioned authors were of the document and not of the source (it was decided it was), and whether or not proofreaders could be considered authors. It was decided to use the terms 'Authors' and 'Proofreaders' in the header for future work.</p>

<p>Then there was a discussion on the criteria on when someone is a proofreader and when he is an author. <tt>Thom_Holwerda</tt> asked if there should be a distinction between technical proofreaders and grammatical proofreaders. <tt>ddew</tt> also wondered when proofreading turned into authoring. <tt>nielx</tt> proposed to let people decide for themselves. As soon as they thought they did some massive rewording, they could put themselves under the 'Authors' heading, else they could be 'Proofreaders'. He wanted to leave responsibility to whoever does the patch. This was agreed upon.</p>

<p>Last point was an amendment to the guidelines to state that code examples in the documentation should follow the coding guidelines as much as possible. This change was accepted.</p>

<p>Two more complicated issues <tt>nielx</tt> wanted to bring up, will be posted on the mailing list.</p>

<h3>5. Conclusion</h3>

<p>At the end e-mailaddresses and instant messaging contacts were exchanged.</p>

<p><tt>nielx</tt> will perform the following tasks:</p>

<ol>
  <li>Write a summary of this meeting.</li>
  <li>Create a wiki page that contains the status for the support kit.</li>
  <li>Ask Waldemar which guidelines/restrictions apply for using the wiki.</li>
</ol>

<p>There was a short discussion for another meeting in the future, but no decisions were made.</p>