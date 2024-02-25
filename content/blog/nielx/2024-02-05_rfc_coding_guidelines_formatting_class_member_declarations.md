+++
type = "blog"
title = "RFC Coding Guidelines: Formatting Class Member Declarations"
author = "nielx"
date = "2024-02-05 16:13:58+00:00"
tags = ["haiku", "rfc", "development", "coding-guidelines"]
+++


This RFC proposes to change the Haiku [coding guidelines](https://www.haiku-os.org/development/coding-guidelines) to change the formatting of variable and member declarations from a **Table Class Member Declaration Style**, to a **Normalized Declaration Style** or a **Aligned Declaration Style**. The arguments are that (1) the current format has severe limitations which limits the aesthetic value of the current formatting, especially when modern C++ language features are used, and (2) it is not a good use of the time of Haiku's contributors to modify and maintain custom logic in the `haiku-format` tool (derived from `clang-format`). If the proposal is adopted, any new code contributions will have to use the new formatting style, and contributors are required to reformat any declarations that they modify.

<!--more-->

Haiku currently does not have a formal RFC process. Please see the end of this document about the proposed procedure.

## Change Log

The [initial version](https://github.com/haiku/website/blob/53e092e580ee12c06a3d20ce608e4b55e49c420a/content/blog/nielx/2024-02-05_rfc_coding_guidelines_formatting_class_member_declarations.md) of this article was published on 5 February 2024. After consulting with the community on the forum, the article was updated into the version you are currently reading.

Note the following changes:

- The proposal now covers all function and variable declarations, so including the ones outside of the class definition. This is both for pragmatic reasons (changing `haiku-format` would automatically apply to non-class members) as well as the finding that currently this is also not consistent.
- In course of the community discussion, there was a desire to see if there was an alternative that kept the spirit of the aligned declarations. This proposal therefore gives two options, namely the **Normalized Declaration Style** and the **Aligned Declaration Style**. Both can be implemented with `haiku-format` as it currently is.
- The discussion also reviewed the implementation process. My takeaway was that there is a strong preference for a single style (and to not have a legacy option), so the implementation kill the exception for the legacy style. There was no consensus on whether a big one time reformat was in order, so this proposal punts on that point and only applies to new code.

## Background: Coding Guidelines

Like many open source projects and companies, Haiku has [coding guidelines](https://www.haiku-os.org/development/coding-guidelines) that standardize the practices around code formatting, naming conventions, and the use of C++ language features. As our coding guidelines state, the main aim is to have the "Haiku code base (...) remain clean, uniform, and easy to read and maintain." If done right, a uniform code style will reduce the cognitive load for contributors when they are modifying the code base, and for core developers while reviewing contributions.

In the field of code guidelines, a lot of tooling has been introduced to help automate the process of writing code in the right style. A common tool for code formatting is [clang-format](https://clang.llvm.org/docs/ClangFormat.html), which is part of the LLVM project. Since 2018, owenca has been maintaining [haiku-format](https://github.com/owenca/haiku-format/), which is a patched version of clang-format that both incorporates some haiku-specific formatting changes, as well as codifying the Haiku style by default. In 2021, there were also two GSOC projects.  In [saloni worked on a project](https://www.haiku-os.org/blog/saloni/) to implement some more of Haiku's style in clang-format. And [ritz](https://www.haiku-os.org/blog/ritz/) worked on a [bot](https://www.haiku-os.org/blog/ritz/) that would automate running over changes submitted to Gerrit.

Recently, I have taken the initiative for the [Haiku Format Bot](https://github.com/haiku/haiku-format-bot/). It leverages `haiku-format` to check changes submitted to Gerrit. I have taken inspiration from ritz' initiative, though I have concluded that the use of concourse is probably overkill, and it could be implemented with a lighter, stateless, web service that can be ran independently from concourse. Read more about the plan for that tool in the [0.1 announcement](https://discuss.haiku-os.org/t/introducing-haiku-format-bot-0-1/14485).

## The Issue with Class and Struct Member formatting

Currently, `haiku-format` does not implement our table class member declaration style formatting rules. That is not for the lack of trying: the 2021 GSoC project by saloni has an implementation of [Haiku's member formatting rules](https://github.com/saloniig/llvm-project/commit/2892ce0387f356576b1de2ea07cadeda79ac399b). That code was never adopted by `haiku-format` though, and it is currently not maintained. Inclusion in `haiku-format` has been discussed, but has never been completed due to the GSoC project being finished.

Could this change be included in `haiku-format`? Potentially, yes, though not with a bit of work. It is a few years out of sync with the newest changes in `clang-format`, and the patch also does not include any (automated) tests to validate the logic. Furthermore, there is also a philosophical argument whether this type of parsing fits in the view of how `clang-format` should work. As owenca notes, the reason that the patch is complex, is because it has to work around the fact that`clang-format` only uses LLVM's C++ lexer, but not the part where it parses the AST and thus infers meaning of the tokens ([see this note on Github](https://github.com/owenca/haiku-format/issues/19#issuecomment-860130695)). This means that for our type of formatting to work, a lot of additional logic to identify whether something is a modifier, a return type or the name of a member is added.

This has lead me to the point on whether or not it is worth putting in the effort codifying this part of our coding style into `haiku-format`. Ultimately, I do not think it is worth the effort to introduce and maintain this change. After careful consideration, I have ergonomic and economic arguments to break with the existing style on this point. I will first review the current rule (and its interpretation). After that I will illustrate with examples why the rules actually might introduce inconsistency. Finally I will discuss why I think it is not economical for a small, volunteer driven project to invest time in complex customization and maintenance of `clang-format`.

### Review of the Table Class Member Style

Haiku has codified a particular style when it comes to declaring classes or structs. The example below is given in the code guidelines:

```c++
class Foo : public Bar {
public:
								Foo(int32);
	virtual						~Foo();

	virtual void				SomeFunction(SomeType* argument);

	// indent long argument lists by a tab:
	virtual const char*			FunctionLotsOfArguments(const char* name,
									const char* path, const char* user);

private:
			int32				_PrivateMethod();
	static  int32				_SomeStaticPrivateMethod();

// Redundant private: to separate the fields from the methods:
private:
	volatile int32				fMember;
			const char*			fPointerMember;
};
```

As you can see, the resulting code is a table-like formatted class definition. I am unsure whether the rule is actually explicitly spelled out somewhere, so I am going to quote [pulkomandy's definition](https://github.com/owenca/haiku-format/issues/19#issuecomment-852410195) which I use as a guideline myself:


> The basic idea is:
>
> indented 1 tab: qualifiers (volatile, virtual, static)
>
> indented 3 tabs: type of fields and return type of functions
>
> indented 8 tabs: function or field name

And indeed, if you look at any of our [public API headers](https://git.haiku-os.org/haiku/tree/headers/os?h=r1beta4), you will see that this generally works out to give decent table-like class definitions. However, a closer look at the headers will also reveal the rule is a bit more flexible than one may think. As PulkoMandy in the same comment clarified:

> In some cases we move the function and field names to a further tab stop (9 or 10) to keep things aligned even when there are long return types. Sometimes we move them back to the left when return types are short, but function or field names are very long.

Whether that is the rule or not is not entirely clear; the coding guidelines are not explicit about this, they just give the example of the main rule as illustrated by the 1 tab, 3 tabs, 8 tabs guideline. For the purpose of this RFC, that explicit definition is taken as the starting point.

### Why the Current Rule Introduces Inconsistencies

The current rule introduces a table-like format for class members. In the (quick) historical search, I did not find the exact origins of this style. From my perspective, it works particularly well under the following conditions:

- It is used in simple, non-nested classes and structs with (mostly) member functions and member data.

- It works best when the class merely declares its members, but does not define them. This works best when there is a clear separation between a definition of a class with the declaration of its members in the header file, and a definition of the members in the source file.

- It works well with standard Haiku's C++style, which (generally) does not use nested classes or exceptions. There is also very limited use of templated types.

Admittedly, when a class or a struct can be implemented in such a way that it does not break any of the rules, the resulting class definition looks really quite nice and organized. However, not all classes are neat. And I would argue, that it is likely that we are going to introduce more complex C++ constructs into the codebase, in which case the style starts to break down and introduces inconsistencies.

#### Column Length Violations

The first group of inconsistencies are when the code leads to column length violations. The first type of violation is when the qualifier is oversized.  According to the rule, tabs 2 and 3 are for leading qualifiers and specifiers. In order for content to fit in nicely, this means 2*4-1 = 7 characters. The following examples show how this breaks:

```c++
class LeadingQualifierSpecifierExample {
	// 'good' example
			int32				fData1;
	// volatile makes the return type unaligned.
	volatile int32				fData2;
	// so does [[nodiscard]]
	[[nodiscard]] int32			fData3;
};
```

Tabs 4 through 7 are for the return value in case of a member function, or a type in case of member data. This means 5*4-1 = 19 characters. If the return value is a `const`, that reduces the space down to 13 characters. In the worst case, the return type is an r-value, so the appended `&&` reduces the space to 11 characters. This limitation currently is not too bad in existing Haiku code, but I expect that future APIs may make more use of language features like `std::expected<>` (15 characters, and then it still needs two type parameters) or  `std::shared_ptr<>` (17 characters without the type).

```c++
class LongReturnTypeExample {
public:
	// uncomplicated return value
			BKey				Key();

	// existing problematic return type
			const BMessageQueue* Key()

	// potential future complex return type
			const std::expected<BKey, BError> Key();
};
```

#### No Focus on Anything After the Member Name

The second group of issues with the current style is that it emphasizes the qualifiers and specifiers at the beginning of the declaration, but it de-emphasizes the parts after the parameter list. See the following list for a collection of important specifiers and qualifiers, and see how visually they are second order of importance.

```c++
class MoreAtTheEndExample {
public:
	// emphasis in this line is on the return type and the name of the member function
	virtual BKey				Key(const BString& key, bool searchWell, int32 offset);

	// however, C++98 already puts some important information at the end...
	virtual BKey				Key(const BString& key, bool searchWell, int32 offset) const =0;

	// and modern C++ adds much more
	virtual BKey				Key(const BString& key, bool searchWell, int32 offset) const
									noexcept override;

private:
	// and what about initializers for data members?
			BKeyChain*          fKeyChain = nullptr;
			int32               fCount = -1;
};

```

#### Unhandled Language Constructs

The third and final group of issues are that the language allows for several language features, that do not quite align with the rules on member function and member data column layout. Think of the following:

- Friend classes, friend functions, typedefs, and aliases.

- Subclass declarations within the parent class.

- Member value initialization

Furthermore, while the current style also does not seem to allow for the definition of member functions within a class definition (*with the exception of empty methods*), if the rules around member definitions inside the class change, they will also mesh less well with the table member declaration formatting.

#### Summary about Ergonomic Limitations of the Style

Above, I have tried to show how the current formatting rules does not cleanly deal with column length violations (and how that may be more frequent in the future), how it de-emphasizes important parts of member definitions, and how it does not account for various language features that we may want to use in our code. Note that I am aware many of these problems can be 'solved' or worked around, I have done so in my own Haiku contributions. But the main point is that as our code will eventually adopt more modern C++ concepts, it is likely that the advantage of the column layout is diminished.

### Why Keeping the Custom Format is not Economical

The second part of my argument on why to ditch the existing custom class member formatting, is of an economical nature. Technically, it is not impossible to teach `clang-format` to apply our rules, as demonstrated by the GSoC 2021 patch that implements [Haiku's member formatting rules](https://github.com/saloniig/llvm-project/commit/2892ce0387f356576b1de2ea07cadeda79ac399b). As discussed in the previous paragraph though, this patch needs to be brought up to date, needs to have automated test cases added, and ultimately needs to be maintained in the future. I would argue, though, that this is not worth the effort.

In order to make this case, I start with the following assumptions:

1. Haiku is a volunteer-driven open source project, where individual contributors put in their time in exchange for value they derive from their contributions. While the value is personal to everyone, I suspect a common shared value is the pride of contributing to an experimental alternative desktop operating system.

2. As an Open Source project, Haiku shares the values of community, and collective improvement through the competition of ideas to generally improve the overall software world. OSS projects absorb, assimilate and depend on the best ideas in the ecosystem, and contribute in parts where they think they can improve the ecosystem. Haiku's contributions are in the space of OS Design, UI Design and Application Design.

3. A common code style is very important in an OSS project, and in principle should be enforced.

Given the three assumptions, I would say that the value of Haiku contributors is not in creating and maintaining extended changes to `clang-format` in order to satisfy a particular historical code style format. I personally do not have any interest in digging into the internals of `clang-format` in order to implement and maintain a solution. Given the fact that two and a half years after GSOC 2021 no one else has, indicates that this is not where our volunteer developers think our project's contributions add value.

Furthermore, if you accept point 3 about the importance of code style, it must then also be true that our developers spending a lot of time checking code formatting, is not the best use of their time. Getting `haiku-format` off the shelf and putting it in use on a bigger scale, unlocks the value of the tool, and the value of the ideas created during GSoC 2021.

It is for those reasons that I consider us spending time adding support for our particular formatting of class member declarations, is uneconomic: it is not where individual contributors to Haiku will get their pleasure, nor will it be where Haiku delivers value to the larger community.

## Two proposals for a new style

This section introduces two options for a new style, both of which can be configured with the current version of `haiku-format`. The **Normalized Declaration Style** is actually the current style of `haiku-format`. It does away with any form of table formatting, and is the simplest form when writing code. The second style is the **Aligned Declaration Style**, which retains some form of vertical alignment to enhance reading code, though it will require developers to do (re-)alignment of code when they make changes. This, of course, can be done with `haiku-format`.

Note that both styles will apply beyond member declarations of classes and structs, as they will apply to any function or variable declaration anywhere in the source code!

### Option 1: Normalized Declaration Style

As part of this proposal, I will demonstrate `haiku-format`'s current formatting for function and variable declarations. I will call this style the **Normalized Declaration Style**. The example shows the existing formatting of a simplified `BHandler` declaration and some function declarations:

After applying `haiku-format`:

```c++
class BHandler : public BArchivable {
public:
	BHandler(const char* name = NULL);
	virtual ~BHandler();

	// BHandler guts.
	virtual void MessageReceived(BMessage* message);
	BLooper* Looper() const;
	const char* Name() const;

	// Long declaration, split over multiple lines
	status_t Launch(const entry_ref* ref, const BMessage* initialMessage = NULL,
		team_id* _appTeam = NULL) const volatile noexcept;

private:
	typedef BArchivable _inherited;
	friend class BLooper;

	friend inline int32 _get_object_token_(const BHandler*);
	std::list<int32> fTokens;
	char* fName;
};

extern DIR* fs_open_index_dir(dev_t device);
extern int fs_close_index_dir(DIR* indexDirectory);
extern struct dirent* fs_read_index_dir(DIR* indexDirectory);
extern void fs_rewind_index_dir(DIR* indexDirectory);

BLooper*
BLooper::Looper() const
{
	// example of the existing style of declarations inside functions
	int count;
	const char* name;
	int32 index = 0;
}

```

The example above is generated by `haiku-format` as it is right now: it does not require any additional configuration or changes. The coding guidelines would be amended as follows.

**Declarations**
- _Declarations_ of types, variables, functions, methods, aliases, friends, etcetera are on a single line, with each token in the declaration separated spaces according to the rules in the 'Indenting and Whitespace' section.

### Option 2: Aligned Declaration Style

Additionally, `haiku-format` can be configured to support an alternative style. I will call this style the **Aligned Declaration Style**. The example shows the existing formatting of a simplified `BHandler` declaration and some function declarations:

```c++
class BHandler : public BArchivable {
public:
	BHandler(const char* name = NULL);
	virtual ~BHandler();

	// BHandler guts.
	virtual void MessageReceived(BMessage* message);
	BLooper*     Looper() const;
	const char*  Name() const;

	// Long declaration, split over multiple lines
	status_t Launch(const entry_ref* ref, const BMessage* initialMessage = NULL,
		team_id* _appTeam = NULL) const volatile noexcept;

private:
	typedef BArchivable _inherited;
	friend class BLooper;

	friend inline int32 _get_object_token_(const BHandler*);
	std::list<int32>    fTokens;
	char*               fName;
};

extern DIR*           fs_open_index_dir(dev_t device);
extern int            fs_close_index_dir(DIR* indexDirectory);
extern struct dirent* fs_read_index_dir(DIR* indexDirectory);
extern void           fs_rewind_index_dir(DIR* indexDirectory);

BLooper*
BLooper::Looper() const
{
	// aligned declarations inside functions as well!
	int         count;
	const char* name;
	int32       index = 0;
}
```

The example above is generated by `haiku-format` as it is right now: it does not require any additional configuration or changes. The coding guidelines would be amended as follows.

**Indention and whitespace** (amendment)
- Use spaces to align tokens within a line (such as aligned function declarations).

**Declarations**
- _Declarations_ of variables and functions are on a single line.
- When two or more declarations are consequitive they form a block. Within a block, the identifiers of the variable or function are vertically aligned. The point of alignment is based on the identifier that is positioned at the rightmost position in the line.
- Constructors and destructors are not aligned (even when the destructor is `virtual`).
- A block ends when there is a comment, or a statement that is not a variable or function declaration. In a class, a block is also ends when an access modifier (public, protected, private) is found. Empty lines do _not_ break a block, so that they can be used to further group declarations within a block.
- Other types of declarations (such as types and aliases) are on a single line, with each token in the declaration separated spaces according to the rules in the 'Indenting and Whitespace' section.

## Proposal & Implementation of the New Rules

Given the arguments above, I propose changing the rule to use one of the two styles described above, which both are currently implemented in the `clang-format` (and by extension `haiku-format`) rules.

When adopting either of these proposals, the existing formatting becomes obsolete. In order not to force a rewrite of the entire code base, the rule only applies to new contributions.

Therefore, **any new code must use the formatting of class and struct members as `haiku-format` and the (updated) Haiku code style guidelines**.

The implementation of this proposal does _not_ require going through the  entire code base at this time and reformatting all declarations, however if contributors are introducing changes to the code, they will share the responsibility to reformat any existing declarations. This means:

- If a contributor makes a change that touches on a struct or class declaration in a source code file or in a header file that is not shared, then reformatting that struct or class is a requirement of the change being accepted. Likewise, if their contribution changes a declaration outside a class that is part of a block of declarations, the entire block must be reformatted.
- This may mean that in some cases, it might be beneficial for a contributor to break up their change into two commits, a reformat commit and a commit with the actual changes, to help code review.
- Likewise, if a contributor is making a series of changes in a particular module in the code, it might be more efficient if they introduce an overall reformatting change touching all files for that module, in order to make reviews of subsequent changes easier.

## Out of Scope

This RFC is limited to changing the formatting guidelines for member declarations within class definitions.

Out of scope for this RFC are:

- The discussion of whether any of the language features used as examples above must be added to the style guide.

- Doing a one-time reformat of (parts) of the codebase.

- Any proposal about the further use of the Haiku Format Bot.

## Next Steps

Haiku currently does not have a formal RFC process. This proposal will follow the following process:

- This proposal is published as a blog post on the author's personal blog on www.haiku-os.org.

- When published, the haiku-development mailing list will be notified of the proposal.

- The proposal can be discussed on the Haiku Discussion forum. The Haiku website will link the comment thread to the RFC.

- The discussion will be open for comments for at least 7 days after the mailing list is notified.

- When the author thinks the discussion is concluded, they will inform the haiku-development mailing list of the outcome. Outcomes can be (a) consensus reached, (b) vote required or (c) proposal withdrawn. In the case of outcome (a), core contributors can request a vote. In case of outcome (c), another contributor can adopt the proposal and continue discussion or put it up for a vote.
