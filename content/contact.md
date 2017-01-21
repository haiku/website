+++
type = "article"
title = "Contact"
date = "2016-01-11T00:00:00.000Z"
tags = []
+++

<style>.hydden { display: none; }</style>

<div class="alert alert-info">
<h3 style="margin-top:0">Before asking...</h3>
<p>...have you checked or consulted any of the following online resources?</p>
<ul>
<li><strong>General info:</strong> <a href="/about">About</a> and <a href="/about/faq">General FAQ</a> pages</li>
<li><strong>Development:</strong> <a href="/development">Development</a> pages</li>
<li><strong>Technical questions:</strong> <a href="https://www.freelists.org/list/haiku-development" target="_blank">Development mailing list</a></li>
</ul>
</div>

<form name="contact" action="/contact_thanks" netlify netlify-honeypot="name">
  <p class="hydden"><label>Bot field: <input name="name"></label></p>
  <div class="form-group">
    <label for="email_address">Email address</label>
    <input type="email" class="form-control" id="email_address" name="email_address" placeholder="Email">
  </div>
  <div class="form-group">
    <label for="email_subject">Subject</label>
    <input type="text" class="form-control" id="email_subject" name="email_subject" placeholder="Subject">
  </div>
  <div class="form-group">
    <label for="email_body">Message</label>
    <textarea id="email_body" name="email_body" class="form-control" style="min-height:125px;resize:vertical;" placeholder="Message"></textarea>
  </div>
  <button type="submit" class="btn btn-default">Send</button>
</form>
