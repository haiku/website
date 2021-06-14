+++
type = "news"
title = "Haiku R1/Beta3 Timeline Approved"
author = "jt15s"
date = "2021-06-14 16:45:15+10:00"
tags = ["haiku", "software", "release", "beta3", "timeline", "schedule"]
+++

The release timeline for Haiku R1/Beta 3 has been approved after a 7 day RFC (Request for Comment) period on the mailing list.

{{< alert-info "Date changes" "Minor changes to the dates may happen, but the following is the release schedule we hope to stick to. For the latest version of the below timeline, [please view it on the Trac wiki](https://dev.haiku-os.org/wiki/R1/Beta3/Timeline).">}}

Most of these actions will be coordinated by the release coordinator and a Sysadmin.

**13 June - 20 June:** one week - last minute scramble.
- **Policy** Don't commit anything risky.
- **Promotion team** begin investigating physical CD's or USB sticks?
- **Policy** "Soft" strings freeze begins.
- **Testing** Testing starts ramping up.
21 June - June 25: branch r1beta3!
- **Sysadmin** Branch r1beta3
- **Policy** r1beta3 branch bug fix only!
- **Sysadmin** Add r1beta3 to concourse
- **Sysadmin** Concourse and Buildmaster should be generating r1beta3 TCs when forced.
- **Sysadmin** Don't forget about HaikuPorts! We didn't branch Haikuports for r1beta2
- **Sysadmin** Generate an image and name it "Test Candidate 1"
- **Sysadmin** Upgrade Haikuporter Buildmaster to a R1 / Beta 3 branch TC0 image
- ICU upgrades?, build new webkit?
**26 June - 10 July:** two weeks of xtreme testing
- **Sysadmin** Generate additional "Test Candidate" images as needed for testing.
- **Testing** All hands on deck testing of test images.
- Unless any unfixable showstoppers are found, don't halt the release.
- Do general polishing of release notes, website, etc. during this time.
**10 July - 17 July:** one week to "get the goods"
- One final strings synchronization
- **Sysadmin** Generate an image and name it "Release Candidate 0".
- Begin work on draft ​https://www.haiku-os.org/get-haiku/release-r1b3 page (Draft = true)
- **MOAR TESTING!**
**17 July - 24 July:** one week of ham-fisting final images
- **Promotion team** physical CD's or USB sticks?
- **Sysadmin** Rename your latest release candidate to r1beta3, move from haiku-r1beta3/XXX to haiku-release/r1beta3/
- **Sysadmin** Double and triple check sha256 sums
- **Sysadmin** Generate a torrent, begin seeding and get a few other people to seed.
- **Sysadmin** Give a few hours for release to make it to the mirrors.
- **Sysadmin** Force a sync to Wasabi
- **DO NOT** advertise final release images on Wasabi.. too much bandwidth.
- **Sysadmin** Sync up working mirrors and release-r1b3
- **Sysadmin** Push final images to IPFS repos and alert folks pinning to repin
- **Sysadmin** Pin R1 / Beta 3 release folder CID on Pinata
- **Sysadmin** Update website
	- Drop Draft on release-r1b3 page
	- get-haiku _index should become release-r1b1
	- release-r1b3 should become get-haiku_index
- **Release when ready; some window to account for unexpected delays.**

The Promotion Team can confirm that it is investigating DVDs and USB sticks to order: the Inc. has been notified and quotes have been requested from two possible services. 

Additional updates will be issued through the "News" and "Blog Posts" sections of the website as the release date nears.