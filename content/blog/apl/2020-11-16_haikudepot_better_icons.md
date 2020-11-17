+++
type = "blog"
title = "Haiku Depot and Better Icon Handling"
author = "apl"
date = "2020-11-17 12:00:00+12:00"
tags = ["haiku", "haikudepot", "icon", "tar"]
+++

HaikuDepot displays icons through a number of areas of its user interface.  Early in the history of the Haiku packaging system, there were very few packages and very few icons.  HaikuDepot started off by downloading each individually from HaikuDepotServer.

## Download as Tar then Unpack

Downloading each icon file individually was fine for a while, but as the package and hence icon count grew it became necessary to rework this system.  HaikuDepotServer later provided the icons as a compressed tar-ball containing all of the icons.  You can [download](https://depot.haiku-os.org/__pkgicon/all.tar.gz) this yourself.  The tar-ball is unpacked on the Haiku computer into a directory and then the HaikuDepot application reads the individual files from the local disk system.

![Splitting the Tar](/files/blog/apl/haikudepot_better_icons/split-asbuilt.png)

The tar-ball also contains an `info.json` file that carries meta-data about the tar-ball payload.  Specifically this contains timestamp information that can be used to ensure that the cached icons are up to date in comparison with the data on the server.

Handling the icon transfer in this way made a huge improvement to the speed at which HaikuDepot launched. 

## Download as Tar and Use Directly

At the time of writing there are around 3000 icons in HaikuDepotServer and the unpacking of the tar-ball and use of this now larger number of icons has lead to a few problems.

* The unpacking of the icons is time-consuming because HaikuDepot has to create a large number of files.
* The updating of the icons is time-consuming because HaikuDepot also has to delete all those files to bring new ones in and then create an updated set of files again.
* The reading of all those files as images at startup can be time consuming.
* Holding all those images in memory consumes a significant quantity of memory.

For this reason a new approach has been recently implemented on the HaikuDepot side.  Instead of unpacking the tar-ball, the tar-ball is instead downloaded, decompressed and retained.

![Uncompressed Tar](/files/blog/apl/haikudepot_better_icons/to-uncompressed-tar.png)

After this change, for HaikuDepot to update the icons, a new tar-ball need only be obtained from the server, decompressed and then copied over the top of the old one.  This is quick and easy.

Within the tar ball each of the file resources is at a specific offset within the file.  This diagram shows the tar-ball with the icon files for a ficticious package with name `hello`.

![Tar Positions](/files/blog/apl/haikudepot_better_icons/tar-file-map.png)

By knowing the offset it is possible to later 'seek' to that position, read the tar-header at that location and then read the icon data that follows the header.  At launch time, HaikuDepot scans the tar-ball to find packages' icon files.  As it finds each icon file, it maintains a map of the package name + icon type to the offset where it found the icon data in the tar-ball.

It is quite surprising how fast this works at launch time as it rummages through the tar-ball.  HaikuDepot is also able to read the `info.json` file out of the tar in a similar way -- by scanning the tar-ball instead of unpacking it to a separate file.

## Icon Cache

There is still the problem of the icons all being loaded at once as HaikuDepot starts.  Better would be for HaikuDepot to load the icons as it requires them and to allow those icons which are no longer required to be released from memory.

To achieve this, an least recently used cache is employed.  The name of this structure is often abbreviated to the term "LRU cache".  At the moment that HaikuDepot asks for a package icon, the cache is queried;

* If it is already in the cache then it is returned immediately.
* Otherwise, if the cache is already full, the icon that was least recent used is dropped from the cache and the new icon is loaded in from the tar-ball and returned for use by HaikuDepot.

## LRU Cache Details

You can find the implementation of the LRU cache in the aptly named `LRUCache.h` file.  How does it work in the context of the icons?

The LRU cache has a map that maps the packages' names to nodes.  The nodes form their own secondary structure which is a double linked list.  The links provide an older and newer link from each node so that it is possible to have an ordering on the items in the map based on when an icon was last used.  Each node also has the key repeated and the icon value.

 ![LRU Cache](/files/blog/apl/haikudepot_better_icons/lru-map.png)

Adding an item to the cache means adding it to the map as well making it the newest item in the linked list.  When the cache is full and an item needs to be evicted to make space, it is an easy job to identify the oldest item and to remove it quickly.  When an item is obtained from the map, that node must then be detached and re-added at the top of the linked list so that it is the newest one.

## Outcomes

Now Haiku is able to update faster, starts faster and uses less memory as it runs.
