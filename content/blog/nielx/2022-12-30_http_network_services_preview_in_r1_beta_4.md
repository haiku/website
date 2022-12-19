+++
type = "blog"
title = "HTTP Network Services Preview in R1 Beta 4"
author = "nielx"
date = "2022-12-30 00:00:01+00:00"
tags = ["haiku", "software", "development", "netservices"]
+++

The newest beta of Haiku includes a preview of a redesigned, modern HTTP library as the initial part of an renewed Network Services Kit. The primary goal of including the library is to get developers to experiment with it and give feedback on how it works within their software. The secondary goal is to gather some feedback on the use of modern C++ and some additional experimental features. This article provides a background to the new kit, some pointers on how to get started, and some notes on experimental designs that utilize modern C++ features.

<!--more-->

## What's Included in the Preview

The preview that is part of Haiku R1 Beta 4 includes a basic HTTP 1.1 library. It supports the following:

* HTTP 1.1 Requests with:
    - Standard and custom methods (GET, POST, etc.)
    - Optional request body with a known size and content type
    - Custom HTTP Header Fields
    - HTTP Basic Authentication
* HTTP 1.1 responses with:
    - Request headers
    - Response bodies as a string, or written to specific files
* Configurable automatic handling of HTTP redirects
* Configuration of the number of concurrent requests per host and in total

Protocols other than HTTP 1.1, or additional functionality like proxies, cookie handling and other authentication types are not supported yet.

## Getting Started with the Preview

The new HTTP library was first merged in [`hrev56572`](https://git.haiku-os.org/haiku/commit/?id=1111dda699f8093bfdc9b232a919110a1c1b49a7), and is part of the Haiku R1 Beta 4 development package.

There is a specific section in the [API documentation](https://www.haiku-os.org/docs/api/group__netservices.html). The headers can be found in `/boot/system/develop/headers/private/netservices2/` and in order to use the API, you should link against `libnetservices2.a`.

If you use the Makefile engine to build your application, then you should tweak the `LIBS` to add the `libnetservices2.a` library, as well as the applicable C++ runtime libraries (`$(STDCPPLIBS)`) and the network libraries (`libnetwork.so` and `libbnetapi.so`). You also need to add the headers to the `SYSTEM_INCLUDE_PATHS`. For example:

```
LIBS =  be netservices2 $(STDCPPLIBS) network bnetapi

SYSTEM_INCLUDE_PATHS =  /boot/system/develop/headers/be \
 /boot/system/develop/headers/cpp \
 /boot/system/develop/headers/private/netservices2
```

If you are building your applications on a 32 bit Haiku image, you will have to make sure you use the modern compiler kit. If you are getting unexpected/odd build errors, double check you have run `setarch x86`.

In the nightly images and the master branch, development continues, and therefore there may be incompatible changes to the kit, so be sure to test your software whenever you build it against a newer (unstable) version of the kit. The advice is that if you want to release software based on the preview, then make sure to build it against a known Haiku image. Because the preview functionality is statically linked in your application, it is likely any binaries will continue to work on more modern Haiku builds.

## Experimental Design Features

The Preview of the HTTP Network Services Kit uses some of the C++ language and library features that are currently (mostly) unused in the rest of the project. Most of Haiku follows the design standards originating from Be, which means that most of the API and the code is based on the (pre-) C++98 version of the language. Furthermore, because of Haiku's promise of binary compatiblity, most of the code will still have to build on GCC 2.95.3, which was released on 16 March 2001. This compatibility guarantee is not there for any new APIs and kits. While the new Network Services Kit is in development, it will include some experiments in its design and use of the language.

This section highlights three of those changes: the use of modern C++ language and library features, the introduction of exceptions for error handling, and an experiment in data access and control mechanisms through exclusive borrows.

### Modern C++ (C++17)

| Feature | Example | Description |
| ------- | ------- | ----------- |
| **Move Semantics** | [`BHttpSession::Execute()`](https://git.haiku-os.org/haiku/tree/src/kits/network/libnetservices2/HttpSession.cpp?h=r1beta4#n219) | Arguably [move semantics](https://www.cprogramming.com/c++11/rvalue-references-and-move-semantics-in-c++11.html) is the largest new feature in the language in C++11. The libnetservices2 kit utilizes move semantics to the fullest, meaning in the implementation all classes abide by the [rule of six](https://www.modernescpp.com/index.php/c-core-guidelines-constructors-assignments-and-desctructors), which makes it possible to pass objects by value in most cases. The example of the [`Execute()`](https://www.haiku-os.org/docs/api/classBPrivate_1_1Network_1_1BHttpSession.html#ae14a7c52aaddfd69e22be4a8aeff727f) method, is the only place where the new API forces you to pass the request object as an r-value reference. |
| **Range-based Iteration** | [`BHttpFields`](https://git.haiku-os.org/haiku/tree/src/kits/network/libnetservices2/HttpFields.cpp?h=r1beta4#n477) | The [range-based `for` loop](https://learn.microsoft.com/en-us/cpp/cpp/range-based-for-statement-cpp?view=msvc-170) syntax is supported by the `BHttpFields` class. This allows you to loop through all the header fields in the object using this construct. Internally, it is used in most cases where there are loops through containers. |
| **String Views** | [`BHttpMethod::BHttpMethod()`](https://git.haiku-os.org/haiku/tree/src/kits/network/libnetservices2/HttpRequest.cpp?h=r1beta4#n70) | The [`std::string_view`](https://en.cppreference.com/w/cpp/string/basic_string_view) object is a very simple concept: it is a pointer to a string, with a length embedded. This makes the use of borrowing (parts of) strings a lot simpler and safer. In the internals of the HTTP parser, it is used to represents certain elements in the HTTP response that are stored in a buffer. This reduced the need for copies. It is worth investigating if it is useful to support string_views in the wider Haiku API, by providing conversions to/from `BString` and as an alternative to `const char*` arguments. |
| **Optional** | [`BHttpRequest::SetRequestBody()`](https://git.haiku-os.org/haiku/tree/src/kits/network/libnetservices2/HttpRequest.cpp?h=r1beta4#n349) | The [`std::optional`](https://en.cppreference.com/w/cpp/utility/optional) utility allows you to express the situation where something either has a value, or it does not. It is useful both for return values, data structure members, and function arguments. In the example, it is used to handle the situation where sometimes you know the size of the request body, and therefore you can submit an `off_t` size argument, but sometimes you do not, and then you can express it by passing `std::nullopt`. Previously this would have required overloaded methods, or by overloading the meaning of the the size argument so that `0` equates to unknown. |
| **Smart Pointers** | [`BHttpRequest::SetRequestBody()`](https://git.haiku-os.org/haiku/tree/src/kits/network/libnetservices2/HttpRequest.cpp?h=r1beta4#n349) | C++'s `std::unique_ptr` and `std::shared_ptr` are a great help to reducing data leaks by making it explicit who owns an object on the heap. They are amazing when [used correctly](https://herbsutter.com/2013/05/29/gotw-89-solution-smart-pointers/)! In the example, it is used to move ownership of a data stream (like a file) to the request. If the request then goes out of scope, it automatically cleans up the data stream object. More importantly, smart pointers and their allocation mechanisms (like [`std::make_unique()`](https://en.cppreference.com/w/cpp/memory/unique_ptr/make_unique) ) are used throughout the internal implementation. In fact, you will not be able to find a single `new` or `delete` in the libnetservices2 source code! The Haiku API has [`BReference`](https://www.haiku-os.org/docs/api/classBReference.html) and [`BAutoDeleter`](https://git.haiku-os.org/haiku/tree/headers/private/shared/AutoDeleter.h#n30) utilities, but these do not effectively use move semantics and therefore do not offer the same level of safety as the standard library versions do. |
| **Scoped Enums** | [`BHttpStatusCode`](https://git.haiku-os.org/haiku/tree/headers/private/netservices2/HttpResult.h?h=r1beta4#n40) | The API uses [`enum class`](https://en.cppreference.com/w/cpp/language/enum) where it makes sense. |
| **Lambdas** | [`BHttpSession::Request::SendMessage()`](https://git.haiku-os.org/haiku/tree/src/kits/network/libnetservices2/HttpSession.cpp?h=r1beta4#n1052) | [C++ lambda's](https://www.sandordargo.com/blog/2018/12/19/c++-lambda-expressions) allows the definition of anonymous functions. In the example, this is used by a the `SendMessage()` method to allow the caller to add additional information to the `BMessage` that will be sent to an observer/listener. The alternative would be, that the caller of the method would create a BMessage, which would then be enhanced by the `SendMessage()` method. That alternative does pose a dilemma about safe ownership, or copying. This solution circumvents that. |

In addition to these features, the implementation of the kit also uses some other modern language features internally, like [initializer lists](https://en.cppreference.com/w/cpp/language/constructor), the `auto` keyword for variable declaration, `constexpr`, and [string literals](https://en.cppreference.com/w/cpp/language/string_literal).

### Exceptions for Error Handling

The Preview of the HTTP Network Services Kit uses exceptions for error handling, as an alternative to the traditional way of error handling in the APIs inherited from BeOS. In the current public API, error codes are the way to identify and handle errors: functions and methods that may fail have a `status_t` return type, as well as the use of negative values in `ssize_t` or `off_t` return values to signal errors. For many objects, there is an `InitCheck()` method that should be called in order to check if the object is valid and working correctly. For consistency reasons, all new public APIs and most other code do not use exceptions. There is some precedent for experimentation with exceptions, for example in the [private parts of the package kit](https://git.haiku-os.org/haiku/tree/src/kits/package/hpkg?h=r1beta4).

The preview of the HTTP Network Kit requires the user of the API to do all error handling through exceptions. It has the following characteristics:
* All error handling is done through exceptions. This means that no method will return `status_t` or overload any other return value to signal an error has occurred. It will no longer be necessary to call `InitCheck()` after creating a new object, any issues in the constructor will raise an exception.
* The API consistently shows which methods and functions can throw exceptions, by the consistent use of the `noexcept` keyword. This is also part of the documentation.
* The API documentation explicitly states which types of exception can be thrown, as to allow the user of the API to determine which exceptions to handle.
* The API introduces the [`BPrivate::Network::BError`](https://www.haiku-os.org/docs/api/classBPrivate_1_1Network_1_1BError.html) abstract base class, which defines a standard API for all derived exceptions. Part of this base class is the `origin` property, which holds the location of where the exception occurred in order to aid debugging.
* Next to the exceptions derived from `BError`, users of the API will also find exceptions of the `std::bad_alloc` type for when allocations fail due to the fact that the system is low on memory.

In the internal implementation of the kit, exceptions are also used to handle error conditions and other exceptional states. Inside the code that runs in the threads that execute HTTP requests, the [`BNetworkRequestError`](https://www.haiku-os.org/docs/api/classBPrivate_1_1Network_1_1BNetworkRequestError.html) is thrown when there are network or protocol errors. For example, when there is a parsing error of an incoming response, the [exception is raised and caught](https://git.haiku-os.org/haiku/tree/src/kits/network/libnetservices2/HttpSession.cpp?h=r1beta4#n441), and then [saved as part of the `HttpResult` object](https://git.haiku-os.org/haiku/tree/src/kits/network/libnetservices2/HttpResultPrivate.h?h=r1beta4#n92) which is then [re-thrown](https://git.haiku-os.org/haiku/tree/src/kits/network/libnetservices2/HttpResult.cpp?h=r1beta4#n217) whenever the user tries to access data on that object.

The discussion on whether or not exceptions should be used are mostly ideological and fundamental in nature. This preview allows developers to get some hands-on first hand experience of using it in the context of Haiku development, in order to better form their arguments on whether or not the future of the Haiku API is in way of exceptions, or through alternative to `status_t` return values like the [`std::expected`](https://en.cppreference.com/w/cpp/utility/expected) type, which is going to be part of C++23. Or a mixture; there might be good arguments to apply both strategies.

### Thread-safe Data Access with Exclusive Borrows

One of the biggest challenges in software development is about writing code that handles reading and writing data safely over multiple threads. The main rule is that objects should be owned, read and written by one single thread. As soon as data is shared with more than one thread, there should be mechanisms to synchronize read and write access to the data. The most common methods of synchronization are atomic data structures and semaphores/mutexes. You **need** to employ these synchronization mechanisms, otherwise you will introduce nasty bugs in your code.

The previous iterations of the network services kit has experimented with several ways of delivering the response body of a request. Initially, there were callback functions that allowed a consumer to directly copy the contents of the response in the context of the network request's thread. This was efficient, but it was up to the user to determine and implement a safety strategy for multithreading. The second option was to deliver the incoming data using BMessages. This was extremely safe, but it was also very inefficient. The current implementation allows the user to provide a `BDataIO` object to write the data to, which is efficient. However, the `BDataIO` interface itself does not presume or implement any locking mechanism, so that means that it is still up to the user of the API to iplement safety, which is not easy.

In the case of the Preview of the HTTP Network Services kit, the response body can either be stored as the [`BHttpBody::text`](https://www.haiku-os.org/docs/api/structBPrivate_1_1Network_1_1BHttpBody.html#a2c22caaff871835ac25ecafe3789c4d3) string member, or it can be saved to an object that supports the `BDataIO` interface. When the latter option is used, the API forces the user to do this in a thread-safe manner, by implementing a synchronization mechanism with the following properties:

1. The owner should be able to create an object, and manipulate while they have that in their control.
2. The borrower can then exclusively borrow their object from the owner, so that they then can manipulate the object. The borrow is exclusive, meaning that the owner can no longer access or write to the object, until the borrower releases it.
3. The owner can decide that it is no longer interested in the object. However, if the object is still borrowed, the memory cannot be freed until the borrower is done with it.

This model is implemented in the [`BExclusiveBorrow`](https://www.haiku-os.org/docs/api/classBPrivate_1_1Network_1_1BExclusiveBorrow.html) smart pointer which provides this functionality. It is used when scheduling HTTP requests for execution, and requesting the response body to be written to a custom target, in [`BHttpSession::Execute()`](https://www.haiku-os.org/docs/api/classBPrivate_1_1Network_1_1BHttpSession.html#ae14a7c52aaddfd69e22be4a8aeff727f).

Note that the problem of streaming data needs to be solved differently, as the mechanisms of `BExclusiveBorrow` do not allow for writing in one thread and reading in the other. This will be a future improvement of the kit.

## Legacy Network Services Kit

The legacy network services kit is still bundled with Haiku, though with Haiku R1 beta 4 it is no longer part of `libbnetapi.so`. The headers can still be found in `/boot/system/develop/headers/private/netservices` and the library to link to is `libnetservices.a`. Note that in a lot of cases, applications will also have to link against `libshared.a`, due to a separate change where symbols of static libraries are hidden in the operating-system supplied shared libraries.

## Reporting Bugs & Other Feedback

In order report bugs, please use the [Haiku issue tracker](https://dev.haiku-os.org/newticket?component=Kits/Network%20Kit) and report it as a Network Kit bug. Make sure to note that the issue was found in Haiku R1 Beta 4.

Other feedback can be posted on the [Haiku 3rd Party mailing list](https://www.freelists.org/list/haiku-3rdparty-dev).

Note that the forums are not regularly monitored by the developers of this kit.
