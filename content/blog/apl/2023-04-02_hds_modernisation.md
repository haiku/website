+++
type = "blog"
title = "Haiku Depot Server Technology Modernisation"
author = "apl"
date = "2023-04-02 12:00:00+12:00"
tags = ["haiku", "haikudepot", "haikudepotserver", "hds", "java"]
+++

_This article is cross-posted from Andrew Lindesay's blog [here](http://www.lindesay.co.nz/blog/2023/2023-hds-spring-boot-3/)._

[Java](https://openjdk.org/) technology has been moving forward much faster in recent years with more frequent updates. Java 17 Long Term Support (LTS) was introduced in September 2021 and will be followed by Java 21 LTS in September 2023.

With [HaikuDepotServer](https://github.com/haiku/haikudepotserver) (HDS) still on Java 11 introduced in September 2018, it was time to upgrade to 17 and then also make the transition from [Spring](https://spring.io/) 5 to [SpringBoot](https://spring.io/projects/spring-boot) 3 which was released in November 2022. Spring is a base technology for SpringBoot with SpringBoot providing more configuration and functionality by _convention_.

These upgrades will bring HDS up to date with the current state of the art in backend Java and allow HDS to be maintained more easily going forward.

## Steps

The following are the main blocks of work undertaken to complete this modernisation.

### Moving APIs Early

An early preparatory step for the modernisation was started in mid 2021; knowing that the [jsonrpc4j](https://github.com/briandilley/jsonrpc4j) library was unlikely to work smoothly for HDS in the future, I moved all the APIs from JSON-RPC protocol (V1) to a quasi "REST-RPC" protocol (V2). The resulting API is able to be expressed as an [Open-API](https://www.openapis.org/) specification that uses [generated](https://openapi-generator.tech/) code in HDS.

First a small set of APIs were re-implemented to cover the needs of the [HaikuDepot](https://www.haiku-os.org/docs/userguide/en/applications/haikudepot.html) desktop application early on so that once the V1 API were removed, only a very small subset of older HaikuDepot clients would be likely to be impacted. The full set of APIs were re-implemented by mid 2022 and the HDS web front-end was migrated to use the V2 API around that time.

A collateral benefit of this work is that a future re-worked front-end or a desktop client such as HaikuDepot could also generate API clients off the same Open-API specification.

### Spring 5 to SpringBoot 2

The upgrade process started in earnest around mid 2022.  The first major step was a move from Spring to SpringBoot.

This was first done in a light-weight way and then later in a more comprehensive way. Some functionality that was previously done in an "HDS style" had to be modified to work in the "SpringBoot style" reflecting the SpringBoot conventions. The most notable changes at this point are around the setup of `DataSource`-s and changing server-side rendering from legacy JSP to modern [Thymeleaf](https://www.thymeleaf.org/).

An application based off SpringBoot has no need for a "server" to run in because SpringBoot has this built in. This fact resulted in some changes to the HDS Docker container image structure and application launch scripts.

### Java 11 to Java 17

The next step was to get the system to Java 17 which ended up being relatively simple. Once settled, code changes were implemented to better take advantage of features in 17.

Java 17 is a prerequisite for SpringBoot 3.

### SpringBoot 2 to SpringBoot 3

Now HDS was ready for some preparatory work for SpringBoot 3.  SpringBoot 3 uses recently re-packaged Java server (JEE) libraries which are incompatible with older versions of some dependencies -- should they have not been modernised in recent years. This was the biggest catalyst for change in HDS getting to SpringBoot 3, but it was generally good change in the end! The larger points include;

* Moved from bespoke to SpringBoot standard mechanism for running [Flyway](https://flywaydb.org/) database migrations and also re-baselined the database migrations
* Metrics moved from DropWizard to [Micrometer](https://micrometer.io/)
* [JAWR](https://j-a-w-r.github.io/) was removed and the HDS front-end (using AngularJS) is now controlled/built with an NPM build system
* Removed the API V1 and [jsonrpc4j](https://github.com/briandilley/jsonrpc4j) library

The small subset of V1 API that was used by older HaikuDepot desktop application versions (< 0.0.5) is now simulated in the current version of HDS so that those older HaikuDepot application versions will continue to function. At the time of writing the use of V1 API by HaikuDepot applications accounts for around 2% of traffic based on metrics captured (anonymously) in HDS from HTTP `User-Agent` headers.

Many points in the [documentation](https://depot.haiku-os.org/__docs/index.html) have also changed as a result of this process as well.

Now the system is happily running on SpringBoot 3 and is ready for Java 21!

## Automated Testing Helped

Through this modernisation work, the goal was **not** to change any functionality and hence the application's suite of automated narrow-integration tests could be run at each step to ensure that the system was behaving correctly as it did before. This ability was key to being able to confidently make these changes.

## Thanks

Thanks to `nielx` for his support in handling the deployments required to complete this process as HDS has no CI/CD pipeline implemented as yet.
