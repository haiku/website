+++
type = "blog"
author = "PulkoMandy"
title = "Contract weekly report #58"
date = "2015-01-09T08:45:54.000Z"
tags = []
+++

Hello there, welcome to the first contract report for 2015!

This report summarizes changes done since 19 of december as I was a bit away from keyboard for the winter break. But I'm back for another year of Haiku coding!

<!--more-->

First some more usability and user interface fixes and improvements.
<ul>
<li>Diver, our most active QA tester, noticed that several applications missed either an icon or a group title for their notifications. This was fixed for Web+ downloads and media server restart (hrev48528). I worked on fixing the layout of the Team Monitor window (hrev48529, still not complete) and fixed the TeamMonitorTest which allows to run the Team Monitor window as a standalone app (it is usually embedded in the input server, having it as a separate app allows testing without restarting the server).
<li>hrev48544 improves ActivityMonitor display when a graph has an odd number of items.
<li>hrev48548 converts more of DiskProbe to the layout kit. This fixes some more glitches in the attribute editor.
<li>Terminal now displays the encoding in the window title by default (unless it is utf-8) (hrev48549, hrev48550)
<li>AboutSystem 3rd-party licenses were cleaned up in hrev48555 to remove some code we don't use anymore. hrev48603 also updates the localization credits as there is ongoing effort to add support for more languages in Haiku and more people contributing to this.
<li>hrev48562 optimization to FileTypes when opening many files with the Tracker add-on.
<li>hrev48588 fixes some broken BMessageFormat format strings.
<li>hrev48605,hrev48610: when dropping a color on Appearance preferences, the revert button is enabled as it should.
<li>hrev48606: RTF translator was sometimes preventing StyledEdit from opening plain text files.
<li>hrev48614 fixes BColorControl color preview to show the correct color in the sliders.
<li>hrev48623 allows to install NetworkStatus in the Deskbar from Network preferences. hrev48632 fixes a layout issue in the Network preferences.
<li>hrev48634 makes it possible to show an existing about window when AboutSystem is re-launched.
</ul>

Some changes to core part of the system.
<ul>
<li>BLocker will now call debugger() if you try to unlock it from a thread that does not hold the lock. BeOS allowed applications to do this, but it is considered bad practice. So Haiku does not allow it. But until now it only silently ignored the unlock request, which could lead to application deadlocks. As a way to highlight possible probles with this, BLocker will now call debugger(), making the problem visible and easy to identify (hrev48542). So far this was triggered once (by Beam) and it turnesd out to be an error in the Beam code, which was fixed there. If we find other BeOS apps doing this, we may need to allow it just like BeOS did - or we can fix the apps instead, if source is available.
<li>hrev48545, hrev48607 cleanups to the BMessage code to avoid code duplication and add some extra error checking.
<li>hrev48611 fixes HttpRequest to properly handle POST data when HTTP authentication or redirects are involved.
</ul>

Work on tests as well: hrev48543 cleans some old code that was in the midi tests, including two early incarnations of MidiPlayer.

MediaConverter and the Media Kit got some attention too. hrev48552 fixes the bug that made MediaConverter truncate the end of files, and hrev48554 improves the format negociation, making it possible to use MediaConverter to transcode with more different formats. You can now encode AAC and AC-3 files instead of only FLAC, and the allowed container/codec pairs are individually tested (some container can't handle all the codecs). MP3 and OGG support is still missing, but I'll get back to this.

Outsourcing efforts: hrev48608 removes an unused version of bash_completion from Haiku sources. hrev48613 removes RCS which is now available as a package (with help from waddlesplash).

All fairly small changes, but the global result is an improved experience of using Haiku and a more polished feel. We are now 2425 tickets away from R1. I also spent some time reviewing the ticket list and triaging things to the "unscheduled" milestone to get the R1 one more focused on the things really needed for R1. This allows a clearer view of what needs to be done.