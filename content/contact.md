+++
type = "article"
title = "Contact"
date = "2017-01-11T00:00:00.000Z"
tags = []
+++

<div class="alert alert-info">
<h3 style="margin-top:0">Before asking...</h3>
<p>...have you checked or consulted any of the following online resources?</p>
<ul>
<li><strong>General info:</strong> <a href="/about">About</a> and <a href="/about/faq">General FAQ</a> pages</li>
<li><strong>Development:</strong> <a href="/development">Development</a> pages</li>
<li><strong>Technical questions:</strong> <a href="https://www.freelists.org/list/haiku-development" target="_blank">Development mailing list</a></li>
</ul>
</div>

<form name="contact" action="contact_thank_you" netlify>
  <div class="form-group">
    <label for="em_addr">Email address</label>
    <input type="email" class="form-control" id="email" placeholder="Email">
  </div>
  <div class="form-group">
    <label for="em_subj">Subject</label>
    <input type="text" class="form-control" id="em_subj" placeholder="Subject">
  </div>
  <div class="form-group">
    <label for="em_body">Message</label>
    <textarea id="em_body" class="form-control" style="min-height:125px;resize:vertical;" placeholder="Message"></textarea>
  </div>
  <button type="submit" class="btn btn-default">Send</button>
</form>
