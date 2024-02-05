+++
type = "blog"
title = "RFC Coding Guidelines: Formatting Class Member Declarations"
author = "nielx"
date = "2024-02-05 16:13:58+00:00"
tags = ["haiku", "rfc", "development", "coding-guidelines"]
+++


This RFC proposes to change the Haiku [coding guidelines](https://www.haiku-os.org/development/coding-guidelines) to change the formatting of class and struct member declarations in class and struct definitions from a **Table Class Member Declaration Style**, to a **Normalized Class Member Declaration Style.** The arguments are that (1) the current format has severe limitations which limits the aesthetic value of the current formatting, especially when modern C++ language features are used, and (2) it is not a good use of the time of Haiku's contributors to modify and maintain custom logic in the `haiku-format` tool (derived from `clang-format`). If the proposal is adopted, any new code contributions will have to use the new formatting style, and contributors are required to reformat any struct and class definitions that they modify. There will be an exception for shared headers.

<!--more-->

Haiku currently does not have a formal RFC process. Please see the end of this document about the proposed procedure.

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

The first group of inconsistencies are when the code leads to column length violations. The first type of violation is when the qualifier is oversized.  According to the rule, tabs 2 and 3 are for leading qualifiers and specifiers. In order for content to fit in nicely, this means 2*4-1 = 7 characters. The example from the code guidelines already shows this breaks:

```c++
class LeadingQualifierSpecifierExample
{
	// 'good' example
			int32				fData1;
	// volatile makes the return type unaligned.
	volatile int32				fData2;
};
```

Tabs 4 through 7 are for the return value in case of a member function, or a type in case of member data. This means 5*4-1 = 19 characters. If the return value is a `const`, that reduces the space down to 13 characters. In the worst case, the return type is an r-value, so the appended `&&` reduces the space to 11 characters. This limitation currently is not too bad in existing Haiku code, but I expect that future APIs may make more use of language features like `std::expected<>` (15 characters, and then it still needs two type parameters) or  `std::shared_ptr<>` (17 characters without the type).

```c++
class LongReturnTypeExample
{
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
class MoreAtTheEndExample
{
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

## Example of the Normalized Class Member Declaration Style

As part of this proposal, I will demonstrate `haiku-format`'s current formatting for class member declarations. I will call this style the **Normalized Class Member Declaration Style**. The example shows the existing formatting of a simplified `BHandler` declaration:

```c++
class BHandler : public BArchivable {
public:
							BHandler(const char* name = NULL);
	virtual					~BHandler();

	// BHandler guts.
	virtual	void			MessageReceived(BMessage* message);
			BLooper*		Looper() const;
			const char*		Name() const;

	// Fictional very long member function declaration
			status_t		Launch(const entry_ref* ref,
								const BMessage* initialMessage = NULL,
								team_id* _appTeam = NULL) const volatile noexcept;

private:
	typedef BArchivable		_inherited;
	friend inline int32		_get_object_token_(const BHandler* );
	friend class BLooper;

			int32			fToken;
			char*			fName;
};

```

After applying `haiku-format`:

```c++
class BHandler : public BArchivable
{
public:
	BHandler(const char* name = NULL);
	virtual ~BHandler();

	// BHandler guts.
	virtual void MessageReceived(BMessage* message);
	BLooper* Looper() const;
	const char* Name() const;

	// Fictional very long member function declaration
	status_t Launch(const entry_ref* ref, const BMessage* initialMessage = NULL,
		team_id* _appTeam = NULL) const volatile noexcept;

private:
	typedef BArchivable _inherited;
	friend inline int32 _get_object_token_(const BHandler*);
	friend class BLooper;

	int32 fToken;
	char* fName;
};
```

The example above is generated by `haiku-format` as it is right now: it does not require any additional configuration or changes.

## Proposal: Update Class Definitions Rules with Legacy Shared Header Exception

Given the arguments above, I propose changing the rule to use the **Normalized Class Member Declaration Style** that is currently implemented in the `clang-format` (and by extension `haiku-format`) rule set to format the member declarations of classes and structs. This means no longer trying to align the modifiers, return types and member names in a table format, but instead using spaces as a separator without requiring specifiers/qualifiers, return types and names to be aligned.

In order not to force a rewrite of the entire code base, the rule only applies to new contributions. Furthermore, I propose making an opt-in exception for shared headers, so that we do not have to reformat public (and semi-public) headers, and keep those consistent.

I propose the following rules:

- **By default**, any new code must use the formatting of class and struct members as `haiku-format` and the (updated) Haiku code style guidelines.

- **Exception**: any existing shared header, which is defined as any header in the haiku repository under `headers`, is allowed to continue to use the legacy class member formatting style, given that they [explicitly mark the class as opting out](https://clang.llvm.org/docs/ClangFormatStyleOptions.html#disabling-formatting-on-a-piece-of-code) of `clang-format`.

In practical terms, I do not suggest going through the entire code base at this time and reformatting all class and struct declarations, however if contributors are introducing changes to the code, they will share the responsibility to reformat any existing declarations (or add in the exception markers if they opt into the legacy format). This means:

- If a contributor makes a change that touches on a struct or class declaration in a source code file or in a header file that is not shared, then reformatting that struct or class is a requirement of the change being accepted.

- Likewise, if a contributor makes a change in a shared header and they choose to put that header under the legacy rules, they must add the appropriate markers around the class as part of their change, in order to prevent clang-format/haiku-format from touching it.

- If someone previously has made a choice whether to use legacy or modern formatting, then that practise must be continued.

- This may mean that in some cases, it might be beneficial for a contributor to break up their change into two commits, a reformat commit and a commit with the actual changes, to help code review.

- Likewise, if a contributor is making a series of changes in a particular module in the code, it might be more efficient if they introduce an overall reformatting change touching all files for that module, in order to make reviews of subsequent changes easier.

## Out of Scope

This RFC is limited to changing the formatting guidelines for member declarations within class definitions.

Out of scope for this RFC are:

- The discussion of whether any of the language features used as examples above must be added to the style guide.

- Any proposal about the further use of the Haiku Format Bot.

## Next Steps

Haiku currently does not have a formal RFC process. This proposal will follow the following process:

- This proposal is published as a blog post on the author's personal blog on www.haiku-os.org.

- When published, the haiku-development mailing list will be notified of the proposal.

- The proposal can be discussed on the Haiku Discussion forum. The Haiku website will link the comment thread to the RFC.

- The discussion will be open for comments for at least 7 days after the mailing list is notified.

- When the author thinks the discussion is concluded, they will inform the haiku-development mailing list of the outcome. Outcomes can be (a) consensus reached, (b) vote required or (c) proposal withdrawn. In the case of outcome (a), core contributors can request a vote. In case of outcome (c), another contributor can adopt the proposal and continue discussion or put it up for a vote.
