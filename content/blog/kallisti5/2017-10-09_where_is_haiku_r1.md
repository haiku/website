+++
type = "blog"
title = "Where is Haiku R1?"
author = "kallisti5"
date = "2017-10-09 10:48:48-05:00"
tags = ["haiku", "software", "r1"]
+++

Haiku released R1 Alpha 4.1 on November 14th, 2012. (5 years ago next month).

Since our last release, we have seen a huge number of groundbreaking
[new features](https://dev.haiku-os.org/wiki/R1/Beta1/ReleaseNotes) slip into the
nightly code including package management.

Along with the addition of Package Management (which was added pretty shortly
after R1A4), we were presented with the massive task of building "all the ports"
into packages and maintaining their dependencies within our repositories.

### New infrastructure

Haiku, Inc. recently approved the purchase of a new larger server to replace our
aging (and full) baron server. This new server is only slightly more expensive,
has 4x the amount of RAM as baron (16GB to 64GB), more disk space (3TiB to 4TiB),
and a much newer i7-7700 (vs the aging i7-3770).

This new system has been named _maui_ (In honor of BeOS R5's engineering code-name.)

We plan on better leveraging our resources by reducing our dependence on full
virtulization of core infrastructure. We plan on doing this by leveraging
[docker](http://docker.com) containers and outsourcing anything we can to
external services. For example, Haiku's
[main website](https://github.com/haiku/website) has been hosted by
[Netlify](https://www.netlify.com/) for quite a while now. These changes
to offload the "simple" things help distribute the risk, while leaving more
of our dedicated server resources free for the "less simple" things.

Baron over the years became a unique snowflake of complexity, hidden from
everyone except the system administrators. Our new [docker](http://docker.com)
container approach makes our services more portable, and maintained in the
[light of day](https://github.com/haiku/infrastructure). _maui_ leverages
docker running as non-root with enforcing selinux to ensure persistent data
security. Anyone who wants to spin up our infrastructure can simply do so based
on the infrastructure git repository. (minus critical sensitive user + application data of course)

The work to transition to the new _maui_ server is on-going as time permits.

#### Waiting for package build automation.

One reason getting Package Management ready has taken so long is the need for a
builder (and hardware resources) to perform mass-builds of software. Most
operating systems have a full-time team of people to write such a system;
however we only have a few individuals working on it in their free time.

_mmlr_ has been developing and improving the haikuporter buildmaster and feels
it is almost ready for production use.

#### Build services

With the newly free resources, we now have the capacity to place the Haiku
package builders on the new _maui_ server. With our simplified infrastructure,
we can keep these systems behind a NAT to ensure their security while building
software, without risking downtime of critical production services such as git.

The reduction of dependence on the personal hardware of our developers and
community should help improve the reliability and security of our critical
package build systems.

### So, where is Haiku R1?

> Keep in mind plans can change as we determine what works and what doesn't.
> This is a lot of uncharted water for us, however there seems to be consensus
> with these plans for the moment.

With all the infrastructure changes and improvements, paired with the bug fixes
in our master Haiku branch, we are slowly and steadily moving towards the
R1 Beta 1 release which will live in its own R1(!) branch.

R1 Beta 1 installations should slowly roll towards the final R1 release via
package updates. R1 Beta 1 is going to be a big step towards our first stable
release.

The exact dates are still not solid. I know we have been saying "soon" for
quite a while... but soon.
