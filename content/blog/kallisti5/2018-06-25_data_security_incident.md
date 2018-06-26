+++
type = "blog"
title = "[NOTICE] Data Security Incident"
author = "kallisti5"
date = "2018-06-25 18:51:48-05:00"
tags = ["haiku", "software"]
+++

This afternoon, I noticed some strange heavy load on our Postgres database.
After some initial investigation, it was discovered that a server misconfiguration left our Postgres database open to the internet since late January 2018.

## Impact

  * Translation services (i18n.haiku-os.org)
    * Email addresses
    * Hashed passwords (old accounts sha1, newer accounts pbkdf2_sha256)
  * Trac (dev.haiku-os.org)
    * Usernames
    * Some emails (based on last session age)
    * We got *extremely* lucky that user passwords were **not** contained in the database for Trac.

We have notified every individual who was directly impacted via email on behalf of Haiku, Inc. to ensure they are aware of the situation and the data leak.

## What's next?

We immediately secured the open database access when discovered today. Going forward, we are going to define better security policies and push to deploy
a vm for a qa test environment where our configurations can be security tested before deployment to production.

We are doing what we can to communicate this incident as clearly as possible to the public and impacted users to assist them in their password changes.
Haiku's system administration team is conducting a thorough review of the potentially affected systems, and will notify you if there are any significant developments.

As a reminder in this imperfect password based world, some simple guidelines can help limit the scope of security incidents such as these:

  https://krebsonsecurity.com/password-dos-and-donts/

We *strongly* recommend changing your password on the services impacted above, as well as changing your password on any other websites or services leveraging the same username/password combination.
