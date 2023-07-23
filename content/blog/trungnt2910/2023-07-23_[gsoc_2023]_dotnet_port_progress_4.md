+++
type = "blog"
title = "[GSoC 2023] .NET Developer Platform - Progress Report #4"
author = "Trung Nguyen"
date = "2023-07-23"
tags = ["haiku", "software", "gsoc", "gsoc2023", "dotnet", "workload"]
+++

# Project status overview

C# bindings for some parts of the Haiku API is now available, along with basic .NET SDK support for
building Haiku applications, in a .NET workload (more details below). The source code and install
instructions are currently in [this GitHub repo](https://github.com/trungnt2910/dotnet-haiku).

.NET [custom builds](https://github.com/trungnt2910/dotnet-builds) for Haiku are still regularly
updated to reflect the latest changes in both .NET and Haiku. Most recently, the datagram socket
hack has been removed as `SOCK_DGRAM` support for Haiku has been merged.

At the moment, while waiting for necessary Haiku changes to allow .NET SDK builds to be stable,
I am looking at ways to improve the API bindings and workloads. Specifically, I am trying to
extract Doxygen documentation from the
[Haiku Book](https://github.com/haiku/haiku/tree/master/docs/user). I am also actively listening
and responding to community feedback on my recent work on
[this forum thread](https://discuss.haiku-os.org/t/gsoc-2023-net-port/13237/87).

# Technical details

In this section I will go deep into the implementation details of the bindings and the Haiku
workload in case anyone wants to take over this project or collaborate with me. Some may a be a bit
too technical and uninteresting, so feel free to skip this section.

## Haiku API bindings for C#

### CppSharp bugs

CppSharp consists of a large number of hacks structured into "passes" and AST "visitors". The
implementation is imperfect; bugs are fixed on a case-by-case basis.

I have submitted several pull requests to CppSharp for bugs uncovered when generating Haiku
API headers. For more details, you can visit the list of pull requests below.

### Binding conventions

#### Kits

A kit is defined as the collection of symbols completely declared in the `os/{KitName}Kit.h`
header, or any header included by it, excluding standard library and POSIX symbols.

Each kit is placed in its own C# namespace, prefixed with `Haiku.`. For example, the Interface
kit will be available by `using Haiku.Interface;`.

Supported kits are declared in [`HaikuApiLibrary.cs`](
https://github.com/trungnt2910/dotnet-haiku/blob/6186785a7ae7497be17469e9b9a402c5213b69e2/generator/HaikuApiGenerator/HaikuApiLibrary.cs#L32C1-L36C58).

#### Classes and members

Classes and member functions (methods) are named exactly the same in the bindings as in the Haiku
API (in `PascalCase`).

#### Enumerations and members

Enumerations without names are ignored (more details in the
[Unfriendly elements](#unfriendly-elements) section).

Enumerations with names are generated using `PascalCase`. Member of these `enum`s are converted to
`PascalCase` after stripping the `B_` prefix. For example,

```cpp
enum window_type {
	B_UNTYPED_WINDOW					= 0,
	B_TITLED_WINDOW						= 1,
	B_MODAL_WINDOW						= 3,
	B_DOCUMENT_WINDOW					= 11,
	B_BORDERED_WINDOW					= 20,
	B_FLOATING_WINDOW					= 21
};
```

translates to:

```csharp
public enum WindowType : uint
{
    UntypedWindow = 0,
    TitledWindow = 1,
    ModalWindow = 3,
    DocumentWindow = 11,
    BorderedWindow = 20,
    FloatingWindow = 21
}
```

The conversion of `enum` names is handled automatically by CppSharp. `enum` members, on the
other hand, are handled by [`HandleEnumItemNamesPass`](
https://github.com/trungnt2910/dotnet-haiku/blob/6186785a7ae7497be17469e9b9a402c5213b69e2/generator/HaikuApiGenerator/Passes/HandleEnumItemNamesPass.cs#L21).

The exception to this rule is the `BTabView::tab_side` enumeration. Since a function named
`TabSide()` already exists in the class, `tab_side` is translated to C# as `TabSides`. In the
future, there should be a better way to handle this type of clash.

#### Non-member variables

Non-memeber variables, if not ignored, are gathered into a static class in the corresponding kit's
namespace. The class name is currently `Symbols`, but the name may change in future revisions of
this bindings in favor of a more futureproof name (one that will not clash with any future Haiku
kits/classes). For example, the variable `be_app` will be available as `Haiku.App.Symbols.be_app`.
`using static Haiku.App.Symbols;` would therefore allow `be_app` to be used standalone just like
in C++ code.

The name of these variables are the same as their original Haiku names; no name conversion
occurs for members of the `Symbols` class.

The gathering of non-member variables is handled in the [`ProcessConstantsAndEnumerationsPass`](
https://github.com/trungnt2910/dotnet-haiku/blob/6186785a7ae7497be17469e9b9a402c5213b69e2/generator/HaikuApiGenerator/Passes/ProcessConstantsAndEnumerationsPass.cs#L70).

### Unfriendly elements

These are some Haiku API elements that do not have any direct equivalent construct in C# or
otherwise complicate the binding generation process.

Most of these are handled by [`SkipUnwantedSymbolsPass`](
https://github.com/trungnt2910/dotnet-haiku/blob/6186785a7ae7497be17469e9b9a402c5213b69e2/generator/HaikuApiGenerator/Passes/StripUnwantedSymbolsPass.cs).

#### Macros

There are no macros in C#. Preprocessor symbols can only serve `#if` statements can cannot carry
a value.

Furthermore, macros are invisible to the C++ syntax tree. CppSharp expands all macros before
analyzing the headers.

Therefore, macros are currently ignored from API generation. Luckily, many `B_`-prefixed macros can
and have been converted into `const` variables and/or `enum`s.

There are some exceptions though. Macros that hold a string constant (such as `B_UTF8_BULLET`)
cannot be converted into `const char *`, as pointers do not support compile-time concatenation
like:

```cpp
    B_UTF8_BULLET "Hello World!"
```

Then, there are some macros that signals the availability of features or API/ABI versions. These
macros can be safely ignored in the C# bindings.

When the need arises, some special handling is required for string macros. Other macros (integral
or floating-point) can be converted to constants and/or `enum`s as needed in the Haiku API headers
themselves.

#### Unnamed enumerations

C# requires all `enum`s to have a name. The name is necessary for any code that uses that `enum`'s
members.

For unnamed enumerations, CppSharp generates a random identifier, which is not user-friendly at
all. Therefore, instead of letting a weirdly named `enum` appear in the library, members of
these enumerations are converted into constant variables by
[`ProcessConstantsAndEnumerationsPass`](
https://github.com/trungnt2910/dotnet-haiku/blob/6186785a7ae7497be17469e9b9a402c5213b69e2/generator/HaikuApiGenerator/Passes/ProcessConstantsAndEnumerationsPass.cs#L49).
These variables are then handled similar to other non-member variables.

#### Non-member variables

C# does not support non-member variables. Therefore, they are gathered into a single static
class by [`ProcessConstantsAndEnumerationsPass`](
https://github.com/trungnt2910/dotnet-haiku/blob/6186785a7ae7497be17469e9b9a402c5213b69e2/generator/HaikuApiGenerator/Passes/ProcessConstantsAndEnumerationsPass.cs).

#### Non-member functions

Non-member functions are currently ignored. These functions often provide some low-level
functionality that should have been exposed either by .NET standard libraries or by the Haiku API.

Like on any other OSes, to use these functions, applications should write their own P/Invoke or
`LibraryImport` wrappers.

#### Fields with the same name as methods

Some classes like `BSize` expose public fields (`width`, `height`) while also use getter functions
(`Width`, `Height`). When converted to C# convention, the fields and the methods have a name clash.

Therefore, [`SkipUnwantedSymbolsPass`](
https://github.com/trungnt2910/dotnet-haiku/blob/6186785a7ae7497be17469e9b9a402c5213b69e2/generator/HaikuApiGenerator/Passes/StripUnwantedSymbolsPass.cs#L72)
ignores these fields in favor of the getter functions.

#### Kernel kit

The Kernel kit contains a large number of C-style `struct`s serving non-member functions (which
are already ignored). These `struct`s might then reference POSIX structures, some of which might
be a huge pain like `union sigval`.

To keep things simple, all `struct`s in the Kernel kit are ignored. This should be fine since I am
not aware of any essential OOP APIs present in the Kernel kit.

#### `BPrivate` symbols

All declarations in `BPrivate` are ignored. As the name suggests, analyzing these symbols require
private headers, which are unstable.

### Symbol references

While processing unfriendly elements, some references may become missing or invalid.
[`ProcessDefaultParametersPass`](
https://github.com/trungnt2910/dotnet-haiku/blob/6186785a7ae7497be17469e9b9a402c5213b69e2/generator/HaikuApiGenerator/Passes/ProcessDefaultParametersPass.cs)
fixes bad `enum` item/non-member variable references.

CppSharp does not seem to work well with multiple modules referencing symbols from each other.
When, for example, code in Support kit uses forward-declared classes in the App kit, CppSharp
thinks that that class also exists in the Support kit. This causes compile errors in C#. To fix
this, [`ProcessIncompleteTypesPass`](
https://github.com/trungnt2910/dotnet-haiku/blob/6186785a7ae7497be17469e9b9a402c5213b69e2/generator/HaikuApiGenerator/Passes/ProcessIncompleteTypesPass.cs)
replaces all incomplete types with complete declarations from other modules.

### Symbol names

CppSharp automatically replaces the names of every symbol to match with C# conventions. This is
undesired for members of the `Symbols` static class. [`RestoreNamePass`](
https://github.com/trungnt2910/dotnet-haiku/blob/6186785a7ae7497be17469e9b9a402c5213b69e2/generator/HaikuApiGenerator/Passes/ProcessIncompleteTypesPass.cs)
resolves this issue.

### Default parameters

C# is more restrictive about default parameters than C++. C# default parameters must be a compile
time constant (`const` variables, numbers, boolean, string, or `null` literals). C++, on the other
hand, seems to allow any valid expression.

To handle this, CppSharp generates an overload when it detects that a default parameter cannot be
calculated in compile time. However, the detection method is faulty and refuses to accept `float`
constant variables.

Since fixing the underlying algorithm is complicated, I have added a
[`EliminateFloatOverloadsPass`](
https://github.com/trungnt2910/dotnet-haiku/blob/6186785a7ae7497be17469e9b9a402c5213b69e2/generator/HaikuApiGenerator/Passes/EliminateFloatOverloadsPass.cs)
to restore `float` default parameters.

### BLooper problem

`BLooper` objects `delete` themselves after `Quit()` is called. When owning the object memory,
the managed instance should know about this and dispose of the native pointer to prevent a
double `free()`.

To solve this problem, two lines of code has been injected into `_QuitDelegateHook`. This is the
function whose address will be stored directly in the `vtable`. It acts as a trampoline between
native C++ code and the managed `BLooper.Quit()` method:

```cs
        private static void _QuitDelegateHook(__IntPtr __instance)
        {
            var __target = global::Haiku.App.BLooper.__GetInstance(__instance);
            __target.Quit();
            __target.__ownsNativeInstance = false;
            __target.Dispose(false, callNativeDtor: false );
        }
```

When C++ code calls `BLooper::Quit()`, the function above will forward the call to managed
`Haiku.App.BLooper.Quit()`. After that, the managed looper will renounce its ownership of
the pointer and call `Dispose()`.

Note that this only affects calls from the C++ side. Calling the `Haiku.App.BLooper.Quit()`
function from .NET does not dispose the looper. Managed callers should therefore make sure that
`Dispose()` is called right after `Quit()`.

Also note that attempting to use a managed `BLooper` after it has quitted would result in a
segmentation fault due to a `NULL` pointer access, not a managed, catchable exception. This is
because CppSharp does not handle wrapper objects with `NULL` pointers. Every wrapped function
calls P/Invokes native C++ functions without conducting any sanity checks on the `this` pointer.
The problem is therefore not `BLooper`-specific. This may be fixed (by me, if needed) in a future
CppSharp version.

### Miscellaneous hacks

There are a few more hacks here and there in the `HaikuApiGenerator` project. Most of these hacks,
especially the ones involving evil regex usage, come with a comment explaining the motivation.

## .NET workload for Haiku

.NET workloads are extensions to the SDK that provides developers with tools to work with a certain
technology. Most of the time this "technology" is often a specific OS like Android, macOS, but
sometimes it could be a framework like MAUI.

Workloads are scarcely documented by .NET. The `dotnet workload` CLI command is documented
[here](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-workload), but it does not show
how workloads work in the inside. There are also workload-related design proposals published
[on GitHub](https://github.com/dotnet/designs/tree/main/accepted/2020/workloads), but these have
some differences to what is actually implemented. This might be the reason why not many people
outside of Microsoft (and [Samsung](https://github.com/Samsung/Tizen.NET)) knows how to create
workloads.

In this blog I will document the basic components of every workload, including the new one made
for Haiku.

### Advertising manifest

This package advertises the presence of workloads to the .NET SDK. For Microsoft workloads, they
are shipped along with the main SDK. For Haiku, an installation script has been provided.

For every [.NET SDK version band](https://github.com/dotnet/designs/blob/main/accepted/2020/workloads/workload-manifest.md#sdk-band),
there should be a different manifest package.

Manifests are often named `$"{Publisher}.NET.Sdk.{WorkloadName}"`. The containing package is
named `$"{Publisher}.NET.Sdk.{WorkloadName}.Manifest.{SdkVersionBand}"`. Haiku's manifest is
therefore called `$"Trungnt2910.NET.Sdk.Haiku.Manifest.{SdkVersionBand}"` (the publisher might be
changed to `Haiku` if the Haiku organization decides to make this official and take over the
project).

The manifest package is installed in `$"{DOTNET_ROOT}/sdk-manifests/{SdkVersionBand}"`. A folder
named after the manifest, in **lowercase**, should be present after installation. For example,
for our package the folder should be nameed `"trungnt2910.net.sdk.haiku"` (notice the lack of the
`".manifest"` suffix).

The installation folder typically contains two files:

#### WorkloadManifest.json

This file declares the workloads, their supported platforms, and the NuGet packages they require.

```json
{
  "version": "0.1.0",
  "workloads": {
    "haiku": {
      "description": ".NET SDK Workload for building Haiku applications.",
      "packs": [
        "Haiku.Sdk",
        "Haiku.Ref",
        "Haiku.Runtime.haiku-x64"
      ],
      "platforms": [ "win-x64", "linux-x64", "osx-x64", "osx-arm64", "haiku-x64" ]
    }
  },
  "packs": {
    "Haiku.Sdk": {
      "kind": "sdk",
      "version": "0.1.0"
    },
    "Haiku.Ref": {
      "kind": "framework",
      "version": "0.1.0"
    },
    "Haiku.Runtime.haiku-x64": {
      "kind": "framework",
      "version": "0.1.0"
    },
    "Haiku.Templates": {
      "kind": "template",
      "version": "0.1.0"
    }
  }
}
```

The file recognizes three kinds of packs:
- `sdk`: SDK packs often contains MSBuild logic. More will be discussed in [SDK pack](#sdk-pack).
- `framework`: Framework packs contain binaries, both native and managed. There are two main kinds,
reference and runtime.
- `template`: Template packs contain useful templates for the workload. These packages are the same
as normal .NET template packages found on NuGet.

The packs listed in the manifest JSON file will be searched on every installed NuGet feeds. At the
time of writing, Haiku workload packages are not available on `nuget.org` yet, so the installation
of a custom GitHub Packages NuGet feed is required.

#### WorkloadManifest.targets

This MSBuild target file is called by all .NET SDK projects. It should therefore be minimal to
avoid negatively affecting all projects built on the current machine. The actual SDK build logic
should be placed in the SDK package.

A typical file:

- Calls the OS-specific SDK if an OS-specific TFM (Target Framework Moniker) is detected:

```xml
  <Import Project="Sdk.targets" Sdk="Haiku.Sdk" Condition="'$(TargetPlatformIdentifier)' == 'haiku'" />
```

- Registers the OS name as a supported target platform on supported SDK versions:

```xml
  <ItemGroup Condition=" '$(TargetFrameworkIdentifier)' == '.NETCoreApp' and $([MSBuild]::VersionGreaterThanOrEquals($(TargetFrameworkVersion), '6.0')) ">
    <SdkSupportedTargetPlatformIdentifier Include="haiku" DisplayName="Haiku" />
  </ItemGroup>
```

### SDK pack

This package should contain MSBuild logic that sets appropriate properties and add necessary
targets in .NET projects consuming the workload.

By convention, the MSBuild entry point of the SDK pack is `Sdk.targets`. This target can import
other MSBuild files in the same package if needed.

The SDK pack for Haiku currently only contains a simple `Sdk.targets` file. It can be broken down
into three parts.

#### Register supported platforms and versions

```xml
  <ItemGroup>
    <SupportedPlatform Include="haiku" />
  </ItemGroup>

  <PropertyGroup>
    <_DefaultTargetPlatformVersion>0.1.0</_DefaultTargetPlatformVersion>
  </PropertyGroup>

  <PropertyGroup>
    <TargetPlatformSupported>true</TargetPlatformSupported>
    <TargetPlatformVersion Condition=" '$(TargetPlatformVersion)' == '' ">$(_DefaultTargetPlatformVersion)</TargetPlatformVersion>
  </PropertyGroup>

  <ItemGroup>
    <SdkSupportedTargetPlatformVersion Include="0.1.0" />
  </ItemGroup>
```

The target platform version should match the Haiku OS version. Technically, it should be 1 (for
Haiku R1). `0.1.0` is currently used for experimental workload versions.

In the future, if Haiku R2 is released, the workload can declare `2` as a
`SdkSupportedTargetPlatformVersion` along with `1`. This way, Haiku .NET projects can use this
workload to build `net[something].0-haiku2.0` along with `net[something].0-haiku1.0` for Haiku R1.

#### Register and reference runtime packs

```xml
  <!-- Register Haiku runtime -->
  <ItemGroup>
    <KnownFrameworkReference
      Include="Haiku"
      TargetFramework="net8.0"
      RuntimeFrameworkName="Haiku"
      DefaultRuntimeFrameworkVersion="**FromWorkload**"
      LatestRuntimeFrameworkVersion="**FromWorkload**"
      TargetingPackName="Haiku.Ref"
      TargetingPackVersion="**FromWorkload**"
      RuntimePackNamePatterns="Haiku.Runtime.**RID**"
      RuntimePackRuntimeIdentifiers="haiku-x64"
      Profile="Haiku"
    />
  </ItemGroup>

  <!-- Reference Haiku runtime -->
  <ItemGroup Condition=" '$(DisableImplicitFrameworkReferences)' != 'true' ">
    <FrameworkReference
      Include="Haiku"
      IsImplicitlyDefined="true"
      Pack="false"
      PrivateAssets="All"
    />
  </ItemGroup>
```

This code tells the .NET SDK about Haiku API libraries that should be included in every Haiku
project. `TargetingPackName` should point to the reference libraries pack, and
`RuntimePackNamePatterns` should point to the runtime libraries pack (`**RID**` will be
substituted with the actual RID by .NET).

Should .NET on Haiku reach more platforms like `arm64`, the new RID should be added to
`RuntimePackRuntimeIdentifiers`.

#### Set project properties

```xml
  <!-- Project properties -->
  <PropertyGroup>
    <_IsHaikuDefined>$([System.Text.RegularExpressions.Regex]::IsMatch('$(DefineConstants.Trim())', '(^|;)HAIKU($|;)'))</_IsHaikuDefined>
    <DefineConstants Condition="!$(_IsHaikuDefined)">HAIKU;$(DefineConstants)</DefineConstants>
  </PropertyGroup>

  <PropertyGroup>
    <_HaikuIsExe>false</_HaikuIsExe>
    <_HaikuIsExe Condition="$(OutputType.Equals('exe', StringComparison.InvariantCultureIgnoreCase)) or $(OutputType.Equals('winexe', StringComparison.InvariantCultureIgnoreCase))">true</_HaikuIsExe>
  </PropertyGroup>

  <PropertyGroup Condition="'$(_HaikuIsExe)' == 'true'">
    <!-- Must be self-contained. Framework-dependent builds cannot see our custom runtime. -->
    <SelfContained>true</SelfContained>
    <RuntimeIdentifier>haiku-x64</RuntimeIdentifier>
  </PropertyGroup>
```

The first property group defines the `HAIKU` constant, allowing code such as:

```csharp
#if HAIKU
    // Some Haiku-specific hack
#endif
```

The second and third groups are related to a hack. When building an `Exe` project, `SelfContained`
must be set when using custom workloads. Otherwise, .NET will not copy workload libraries and
errors will occur. When `SelfContained` is `true`, a `RuntimeIdentifier` must also be set
in the project. For more details about this hack, see my
[Reddit](https://www.reddit.com/r/dotnet/comments/umnlp8/how_can_i_register_a_custom_framework_to_the_net/)
post.

This SDK package is still in its early stages. In the future, just like how the Android .NET SDK
can do a variety of Android-related tasks, the SDK for Haiku can also be expanded to do things
like (not included in this GSoC project's scope):

- Handling application [resources](https://www.haiku-os.org/documents/dev/compile_them_resources).
- Automaticallly generating Haiku recipes, or even `.hpkg` files for testing.
- Running Roslyn analzyers to detect Haiku API anti-patterns.

### Reference libraries pack

References libraries packs, or targeting packs, provide a set of lightweight libraries used only
during development and compilation. These libraries contain platform-neutral APIs, and may or may
not have complete implementations. They are the .NET equivalent of C/C++ headers.

Currently, for the Haiku workload, the reference library is the same as the runtime library for
`haiku-x64` (the only supported platform at the moment).

To allow the .NET SDK to recognize reference libraries, `.dll` files (and `.xml` documentation
files, if any), should be placed at `$"ref/net{Version}/"`. This is handled in the package's
project file:

```xml
  <ItemGroup>
    <_ManagedFiles Include="$(_HaikuRootDirectory)src/Haiku/bin/$(Configuration)/net$(_HaikuNetVersion)/Haiku.dll"
                   CopyToOutputDirectory="PreserveNewest" Visible="false" Link="ref/net$(_HaikuNetVersion)/Haiku.dll"
                   PackagePath="ref/net$(_HaikuNetVersion)" TargetPath="ref/net$(_HaikuNetVersion)" />
    <_DocumentationFiles Include="$(_HaikuRootDirectory)src/Haiku/bin/$(Configuration)/net$(_HaikuNetVersion)/Haiku.xml"
                         CopyToOutputDirectory="PreserveNewest" Visible="false" Link="ref/net$(_HaikuNetVersion)/Haiku.xml"
                         PackagePath="ref/net$(_HaikuNetVersion)" TargetPath="ref/net$(_HaikuNetVersion)" />

    <_PackageFiles Include="@(_ManagedFiles)" />
    <_PackageFiles Include="@(_DocumentationFiles)" />
  </ItemGroup>
```

Building the targeting pack also involves generating a `FrameworkList.xml`, which is a declaration
of all reference libraries available in a pack. The format of this file is the same as
`RuntimeList.xml` of the runtime libraries pack documented below.

### Runtime libraries pack

Unlike reference libraries, runtime libraries contain full implementations and are
platform-specific. They are used by applications during runtime.

Runtime libraries can also include native `.so` files. In the Haiku workload, `libHaikuGlue.so`,
the glue library containing `inline` functions not included in `libbe.so`, is provided.

As these packages are platform-specific, their names are often ended by a RID, such as
`Haiku.Runtime.haiku-x64`, or `Haiku.Runtime.haiku-arm64` if arm64 support is added in the future.

Runtime library package paths are also different from targeting ones. They are located at
`"runtimes/{RID}/lib/net{Version}/"` (for managed `.dll` and `.pdb` symbols), or
`"runtimes/{RID}/native/"` (for native libraries).

```xml
  <ItemGroup>
    <_ManagedFiles Include="$(_HaikuRootDirectory)src/Haiku/bin/$(Configuration)/net$(_HaikuNetVersion)/Haiku.dll"
                   CopyToOutputDirectory="PreserveNewest" Visible="false" Link="runtimes/haiku-x64/lib/net$(_HaikuNetVersion)/Haiku.dll"
                   PackagePath="runtimes/haiku-x64/lib/net$(_HaikuNetVersion)" TargetPath="runtimes/haiku-x64/lib/net$(_HaikuNetVersion)" />

    <_SymbolFiles Include="$(_HaikuRootDirectory)src/Haiku/bin/$(Configuration)/net$(_HaikuNetVersion)/Haiku.pdb" IsSymbolFile="true"
                  CopyToOutputDirectory="PreserveNewest" Visible="false" Link="runtimes/haiku-x64/lib/net$(_HaikuNetVersion)/Haiku.pdb"
                  PackagePath="runtimes/haiku-x64/lib/net$(_HaikuNetVersion)" TargetPath="runtimes/haiku-x64/lib/net$(_HaikuNetVersion)" />

    <_NativeFiles Include="$(_HaikuRootDirectory)out/generated/libHaikuGlue.so" IsNative="true"
                  CopyToOutputDirectory="PreserveNewest" Visible="false" Link="runtimes/haiku-x64/native/libHaikuGlue.so"
                  PackagePath="runtimes/haiku-x64/native" TargetPath="runtimes/haiku-x64/native" />
    <_NativeFiles Include="$(_HaikuRootDirectory)out/generated/libHaikuGlue.a" IsNative="true"
                  CopyToOutputDirectory="PreserveNewest" Visible="false" Link="runtimes/haiku-x64/native/libHaikuGlue.a"
                  PackagePath="runtimes/haiku-x64/native" TargetPath="runtimes/haiku-x64/native" />

    <_PackageFiles Include="@(_ManagedFiles)" />
    <_PackageFiles Include="@(_SymbolFiles)" />
    <_PackageFiles Include="@(_NativeFiles)" />
  </ItemGroup>
```

In addition to libraries, the package should provide a `RuntimeList.xml` declaration. Microsoft
has provided a `CreateFrameworkListFile` in its internal package,
`Microsoft.DotNet.SharedFramework.Sdk`, to handle the generation of this file as well as
`FrameworkList.xml`.

The MSBuild code for this is included in
[`workload/Shared/Frameworks.targets`](https://github.com/trungnt2910/dotnet-haiku/blob/master/workload/Shared/Frameworks.targets)
in my `dotnet-haiku` repo. It is adapted from internal Microsoft code. There are some parts I do
not fully understand, such as the `_Classifications` part, but what's important is that _it just
works_ if you set `_ManagedFiles`, `_SymbolFiles`, `_NativeFiles`, and `_DocumentationFiles`
correctly in the runtime and targeting pack projects.

### Templates pack

Template packages in .NET workloads are not different from normal template packs, which are already
fully [documented](
https://learn.microsoft.com/en-us/dotnet/core/tutorials/cli-templates-create-template-package) by
Microsoft.

# Conclusion

This is the longest blog post in this series, and it took me a whole day to write. Some parts might
sound boring; some might seem like gibberish for those who are not used to MSBuild. That said, this
really is the content I wish I had when I was building my first .NET 6 workload last year.

Once again, I might have left some points behind, if there are any questions about any part of my
port, builds, or workloads, feel free to leave them in the comments section or ping me on IRC.

### Appendix - Pull requests/patches

Like the previous blog, I will have a list of pull requests/patches. Those that have been included
in the previous blog (pending and still pending now, or already merged) are not displayed here.

#### Merged

##### [haiku/haiku](https://review.haiku-os.org/admin/repos/haiku,general)

- [unix: Implement datagram sockets (#6617)](https://review.haiku-os.org/c/haiku/+/6617)
- [headers/os: Make headers generator-friendly (#6716)](https://review.haiku-os.org/c/haiku/+/6716)
- [headers: Explicitly hide BAlert functions (#6718)](https://review.haiku-os.org/c/haiku/+/6718)

##### [mono/CppSharp](https://github.com/mono/CppSharp)

- [CSharpExpressionPrinter: Wrap expression in parenthesis (#1741)](https://github.com/mono/CppSharp/pull/1741)
- [CSharpExpressionPrinter: Recurse into operands (#1745)](https://github.com/mono/CppSharp/pull/1745)
- [CSharp: More default parameter fixes (#1747)](https://github.com/mono/CppSharp/pull/1747)
- [Array marshalling (#1748)](https://github.com/mono/CppSharp/pull/1748)
- [SymbolResolver: Use filename when path cannot be found (#1752)](https://github.com/mono/CppSharp/pull/1752)
- [CSharpSources: Dereference pointer variables (#1753)](https://github.com/mono/CppSharp/pull/1753)

#### Pending

No new pending pull requests at the time of writing, though
[haiku/haiku#6616](https://review.haiku-os.org/c/haiku/+/6616) ("Add clone_memory syscall") and
[dotnet/runtime#86391](https://github.com/dotnet/runtime/pull/86391) ("Haiku: Configuration
support") have both been pending for quite a long time.
