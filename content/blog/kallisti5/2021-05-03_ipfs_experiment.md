+++
type = "blog"
title = "Haiku's CDN, an IPFS Experiment"
author = "kallisti5"
date = "2021-05-03 15:50:05-05:00"
tags = ["haiku", "software"]
+++

I'm Alex, a member of our systems administration team and on the Haiku, Inc. board of directors.
I have been playing with moving our repositories over to [IPFS](https://ipfs.io), and wanted to collect some feedback on the idea.

## First a little history

With the addition of package management in 2013, Haiku's amount of data to manage has been growing.

In ~2018 I moved our Haiku package repositories (and nightly images, and release images) to S3 object storage. This helped to reduce the large amount of data we were lugging around on our core infrastructure, and offloaded it onto an externally mananged service which we could progmatically manage. All of our CI/CD could securely and pragmatically build artifacts into these S3 buckets. We found a great vendor which let us host a lot of data with unlimited egress (outbound) bandwidth for an amazing price. This worked great through 2021, however the vendor recently began walking back their "unlimited egress bandwidth" position.  In late April 2021, they shutdown our buckets resulting in a repo + nightly outage of ~24 hours while we negotiated with their support team.

## The problem

In these S3 buckets, we host around 1 TiB of data, and have between 2-3 TiB of egress data monthly. We also have around 4 TiB of egress data on our servers.

***This is almost 8 TiB of bandwidth a month***

We have large number of wonderful organizations and individuals offering to mirror our package repositories and artifacts via rsync (the defacto way to mirror large amounts of data in the open source world)... however we have one major issue which historically has prevented us from taking people up on these offers for anything except release images.  Haiku's package management kit doesn't have any kind of built-in signature checking of packages.  While our CI/CD system **does** sign Haiku nightly images, releases, and repositories with minisig (and haikuports buildmaster could be extended to do the same), our package management tools today perform zero checking of package or repository security.

This means a malicious actor could add tainted packages to a mirror, regenerate the repository file (which contains checksums of each package), and redistribute "bad things" to every Haiku user using the mirror.

Is this likely to happen? No. Is it possible? Yes.

## The solution

In steps IPFS (InterPlanetary File System). In mid-2020, I (quietly) setup http://ipfs.haiku-os.org as an IPFS mirror of our release images.

You can access this on any public ipfs gateway...

* https://ipfs.io/ipns/ipfs.haiku-os.org
* https://cloudflare-ipfs.com/ipns/ipfs.haiku-os.org

The official description states *"A peer-to-peer hypermedia protocol designed to make the web faster, safer, and more open."*. In a bit more technical words, essentially IPFS is a network of peer-to-peer systems exchanging chunks of data based on a hash (called CID) of the data within the chunk. (Think BitTorrent, where every seed is also an http gateway, and you're almost there).

A great overview is available on their [website](https://ipfs.io/#how) (which is also hosted on IPFS).

**Essentially:**

* We add repositories and artifacts to our "central" IPFS node (A Raspberry Pi 4 on my home network today)
* We update /ipns/hpkg.haiku-os.org (using our private key) to point to the latest "hash" of our repositories
* If you want to help host our repositories and artifacts, you *pin* /ipns/hpkg.haiku-os.org nightly, weekly, etc
* People pinning our repositories don't need a "static ip", they only need to be able to expose port 4001 to the internet from their instance of IPFS
* Users can access our repositories, artifacts, etc on **any** public or private IPFS gateway node.
  * Gateway nodes "pull in all of the chunks" from all of the users pinning /ipns/hpkg.haiku-os.org when requested, and serve them to users
* Haiku hosts a few dedicated gateway nodes globally. These act as regional gateways to the "closest people hosting artifacts"

**Out of this we get:**

* Anyone can mirror Haiku (not just those with large amounts of free bandwidth or static ip addresses)
* Reduced concern about country-level IP blocks
  * Russia blocks our Digital Ocean VM's as an example.
  * The community can launch a Russian gateways and pin our data within Russia.
* We get transparent deduplication
  * The repo today is ~140 GiB of data, and is ~95 GiB to mirror on disk via IPFS.
* Users can just "access data", or mirror everything locally for a "hyper fast" software repository.
  * Since I have an IPFS node on my network pinning our repos, my Haiku instances update in ~5 seconds.

## The downsides

IPFS *is* a new technology, and there are a lot of sharp edges.

* Everyone pinning needs to to manually "repin" data to pull and mirror the latest repository chunks
* If few people are pinning the latest data, initial lookups of a CID can be a bit slow (3+ minutes)
  * Notice, 3+ minutes is longer than the default HTTP timeout (30 seconds).
  * Gateway timeouts can happen until the IPFS gateway "locates" the data.
* IPFS has a steep learning curve for anyone mirroring. It takes time to find out how to do what
* Haiku's go-lang port needs a lot more work before we can build IPFS on Haiku.

## Summary

I have no idea if this will work.

The idea is great since it fixes "pretty much all" of our content distribution issues.

* We empower tech-savy users to leverage IPFS locally, while still offering "turn key" access to our software
* We decouple the "large amount of storage" and "large amount of bandwidth" making infrastructure easier
* We enable getting Haiku's software into restrictive geographic regions
* Built-in signature checking ensuring security of data on IPFS
* Deduplication is built-in, saving space

Time will tell if the implementation is viable and reliable enough.

In the short term, our current more traditional repositories
are not going away as long as we can continue to host data from our S3 buckets.  I'm hopeful we can get enough
people playing with the new system to reduce S3 bandwidth and give us some time to investigate this alternative path.

A few users have mentioned adding native IPFS support to pkgman.. this would enable Haiku to obtain updates
directly from a peer-to-peer network or from traditional HTTP gateways. That seems like an awesome potental future.

## What *you* can do

* Learn about the [CID](https://proto.school/anatomy-of-a-cid), [IFPS](https://blog.infura.io/an-introduction-to-ipfs/), and [libp2p](https://proto.school/introduction-to-libp2p)
* [Try to run IPFS, and pin Haiku's repositories at locations that don't have bandwidth caps](https://github.com/haiku/infrastructure/blob/master/docs/ipfs/ipfs-pinning.md)
* Try out our experimental IPFS gateway for haiku updates
  * Official: ```pkgman add-repo https://de.hpkg.haiku-os.org/haiku/master/$(getarch)/current```
  * Any [public gateway](https://ipfs.github.io/public-gateway-checker/)
    * Just append ```/ipns/hpkg.haiku-os.org/haiku/master/$(getarch)/current``` to hostname
    * Example: ```pkgman add-repo https://cloudflare-ipfs.com/ipns/...```
  * To revert back to the standard repository:
    * ```pkgman add-repo https://eu.hpkg.haiku-os.org/haiku/master/$(getarch)/current```
* Provide feedback on performance and documentation
