+++
type = "blog"
title = "[GSoc 2017] Adding Harfbuzz support to Haiku"
author = "digib0y"
date = "2017-05-06 22:36:57+00:00"
tags = ["haiku", "software", "GSoC2017", "students", "summerofcode", "google", "GSoC", "Google Summer of Code"] 
+++
<li>I am Deepanshu(Trac: digib0y IRC:digib0y), I am one of the seven students selected for GSoC this year from Haiku. I will be working to add Harfbuzz support this summer.</li>

<h3>Quick intro:</h3>
<li>I am an engineering student of Christ University, India. I am pursuing a degree in Bachelor of Technology in Computer Science and Engineering.</li>
<br>
<li>I have been a previous Google Code-In student where I worked with Haiku for the first time, I can recall the first time I ever connected to an IRC channel during GCI 2014; it was both my interest in the GCI task and my attraction to the positive, friendly environment on #haiku that convinced me to continue working with Haiku.</li>
<br>
<h3>Project Description:</h3>
<li>Text is the primary means of communication in computers, and is bound to be so for the decades to come. With the widespread adoption of Unicode as the canonical character set for representing text a whole new domain has been opened up in a desktop system software design.</li>
<br>
<li>Haiku got internation support in 2009(Thanks to Pulkomandy!). However, it only works for languages with layouting rules similar to the latin alphabet, other scripts such as arabic, devanagari, or CJK, have several problems ranging from minor(word breaks at expected places) to unreadable text(characters rendered in the wrong direction, or not rendered at all). The goal of the project is to improve the situation, with a focus on Devanagari which is a script shared by over 120 languages.</li>
<br>
<li>HarfBuzz uses GLib for Unicode functions (to get few Unicode character properties an normalisation). It can also use ICU for this, or a small bundled library called UCDN. If HarfBuzz is built without GLib or ICU, it will use UCDN. Alternatively we can provide the Unicode callbacks to interface with something else. However, we will be using ICU which is in the core of Haiku.</li>
<br>
<li>FreeType is used for loading fonts and glyph metrics etc. We can also build HarfBuzz without FreeType and use HarfBuzz's internal font functions.</li>
<br>
</li>Font rendering will be reworked to use the HarfBuzz library (The Harfbuzz package contains an OpenType text shaping engine), instead of just Freetype, providing numerous supports.</li>
<br>
<h3>What to expect on completion of project:</h3>
<li>*Rendering of  Devanagari and other scripts using ligatures properly, allowing use of the system to view and edit text in the Hindi language</li>
<li>*Automatic font installation: This feature involves automatic detection of missing fonts, and installing them.</li>
<br>
<h3>What and When to expect:</h3>
<h4>Community bonding period(May 4 - May 30)</h4>
  <p style="text-indent :5em;" > </p><li>A survey of current situation of rendering with multiple screenshots taken across different operating systems keeping in mind in web pages, in applications (labels, buttons, etc).StyledEdit and Terminal.<li>
  <p style="text-indent :5em;" > </p><li>Compiled version/combination of freetype+harfbuzz on Haiku which has the required features for text shaping enabled.<li>
<h4>First Month of Coding(June 1 - June 30)</h4>
  <p style="text-indent :5em;" > </p><li>An example application which could render some text using two tools: FreeType and Harfbuzz, which will include nicely written code that can be used elsewhere.<li>
<h4>Second Month of Coding(July 1 - July 31)</h4>
  <p style="text-indent :5em;" > </p><li>Integration of Harfbuzz in test_app_server rendering infrastructure and the necessary changes in libbe.<li>
<h4>Third Month of Coding(August 1 - August 30)</h4>
  <p style="text-indent :5em;" > </p><li>Test for already supported scripts(latin,CKJ) and making sure that integration doesnt break it.<li>
  <p style="text-indent :5em;" > </p><li>Creating Test Suites with Hindi Samples.<li>
  <p style="text-indent :5em;" > </p><li>Integration of Harfbuzz in test_app_server rendering infrastructure and the necessary changes in libbe.<li>
<li>Apart from this I will complete translation of Haiku to Hindi.<li>
<h3>References:</h3>

<a href="/files/blog/digib0y/Harfbuzz">PDF copy of my GSoC Proposal</a>
<br>
<a href="https://www.freedesktop.org/wiki/Software/HarfBuzz/">Harfbuzz freedestop.org</a> 
<br>
<a href="https://en.wikipedia.org/wiki/HarfBuzz">HarfBuzz Wiki</a> 
