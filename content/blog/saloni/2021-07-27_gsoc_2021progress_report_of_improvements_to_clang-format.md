+++
type = "blog"
title = "GSOC 2021:Progress Report of Improvements to clang-format"
author = "saloni"
date = "2021-07-27 12:17:53+05:30"
tags = ["haiku", "software", "gsoc 2021", "clang-format", "gsoc", "haiku-format"]
+++

This blog will contain all the information about what I have done till now.

I started with the input preferences directory and started solving the issues according to  haiku guidelines.

A few changes have been made to clang-format. This work takes a lot of time because it needs a complete understanding of how the llvm code works. As there was number of files, it was difficult to figure out which file should contain the solution of the problem but PulkoMandy really helps me alot.
While working on this project I learn new things which were really good!

## Preserve the indentation of comments

In the Haiku coding style, comments are sometimes indented one level more than the code (when they refer to the line above them) but clang-format doesn’t accept these one level indented comments and change their indentation to previous line indentation

     if (a)  
         return ;  
              // Comment to remain as it is  
    else {  
         return;  
    }

So, this comment was previously getting equal to indentation of return statement. Then, I write some code which checks the indentation of previous line and compares with the original line and formats according.
[Please have a review](https://github.com/viveris/llvm-project/commit/b2338537b8699662efaa5b51f1cf1daf6ae28c0a)

After this I added a functionality that this code should only work when “haiku” is passed as argument because some people may not want that for their project.
[Please have a review](https://github.com/viveris/llvm-project/commit/05661e0e9937699753192b298f04ecc5c46206f9)

## Removal of braces for multiline control statements
According to haiku guidelines, if there is single line control statement then the braces should be removed otherwise not.

    if (acceptFirstClickBox) {
        acceptFirstClick
    	= acceptFirstClickBox->Value() == B_CONTROL_ON;
    				}

In the above case clang-format was removing the braces for such conditions. So, I got a [patchset](https://reviews.llvm.org/D95168) from llvm which I firstly set as the base code for this.
[Base code ](https://github.com/viveris/llvm-project/commit/ca492a8015c091fccb4fd1cc6f910f2f1a48a99b)

After that some changes were made and the redundant braces remover code was removed. 
[Revert the redundant code](https://github.com/viveris/llvm-project/commit/d69e542e38fb23c834cd96feac961498ff2c1cf4)

After that finally, the final commit was made which removes the extra changes and sets the correct indentation mode matching with Haiku.
[Please have a review](https://github.com/viveris/llvm-project/commit/c5377b0c71dab755a2dc121f9e14b015d4a4d122)


## Line break after return type in function definitions

Functions with one arguments were not properly detected. But the functions with no or more than one argument, code formatted correctly.

    void
    MouseView::MouseUp(BPoint) {
    	fButtons = 0;
    	Invalidate(_ButtonsRect());
    	fOldButtons = fButtons;
    }
In this above example the clang format was not breaking after the return type with one argument but when I passed no or more than 1 argument it breaks correctly, This issue took alot of time as firstly I tried with different configuration but nothing works then I supposed that any function needs to be called for the break after return type but found nothing.

Then I tried with llvm latest code also but even then it doesn't formatted correctly. After that, I came to know that this was a problem in llvm code and was mising this specific case. At,last I write the code for this specific case in the **isFunctionDeclarationName** function.
[Please have review](https://github.com/viveris/llvm-project/commit/f488bd9b43130e186cb0f86067f8d0a447b3f7b8)

## Ongoing review
### Unusual indentation of BLayoutBuilder block
The  block was getting formatted incorrectly

    	BLayoutBuilder::Group<>(this, B_VERTICAL)
		.AddGroup(B_HORIZONTAL)
			.SetInsets(B_USE_WINDOW_SPACING, B_USE_WINDOW_SPACING,
				B_USE_WINDOW_SPACING, 0)
			.Add(fSettingsView)
			.End()
		.Add(new BSeparatorView(B_HORIZONTAL))
		.AddGroup(B_HORIZONTAL)
			.Add(fDefaultsButton)
			.Add(fRevertButton)
			.AddGlue()
			.End();
The clang-format formats this block such that the indentation level of all these lines become equal which was against Haiku guidelines. So according to the community this block needs special handling. The options was:
-   Have some very specific code to detect the use of BLayoutBuilder and the specific indentation it needs
-   Annotate the sourcecode with some comments to tell clang-format to not touch this part of the code.

As the haiku code contains number of such block, so it will become messy to use **clang-format**  **off**. So, I just proceed with first option. 
As, I was not familiar with how the indentation of this block is to be done as differnt file was following different rule so, I planned a meeting with Preetpal in which she explains me the process for this block and I write some code for this which correctly indented this block even after giving any incorrect indentation.
[Please have a review](https://github.com/saloniig/llvm-project/commit/45d221cda510e9dba5bc1f1e94d21d1393caa59e)

Then one issue remained unsolved in which the .SetInsets line was exceeding the column limit i.e. 80 according to Haiku guidelines. This line was not getting properly breaked and merged. After spending time with the code looking into this issue I found that when I changed this block LineComment block the block was getting formatted correctly as expected.
I looked into this to find such condition and change it according to the requirements but found nothing.
So, now I am working on this to write some code that will call required functions to format it correctly. I made some changes and write some code but it breaks at some point. I am looking for it and is working side by side on it.

### Extra space before ++ operator in for loop
In for loop the extra space was added before the ++ operator.

    for (itr = fMouseSettingsObject.begin(); itr != fMouseSettingsObject.end();
    	 ++itr)

Then, I take a look at files and see the configurations and made the changes for Haiku.
[Please have a review](https://github.com/saloniig/llvm-project/commit/8b7b1163109295afa7af86c19c4e338cbe8a7b89)
But the PulkoMandy suggested me that there can be much better option than this and suggested me to look into ContinuationIndentor.cpp file which will contain some function which is violating our defined options style configuration which were

> UseTab set to **UT_Always** so even if it tries to do alignment, it
   should be using only tabs.
> set bracket style to **BAS_DontAlign** so it should not be aligning      things  this way.

But we both look into it and tried to find appropriate function but till now got nothing. It’s a WIP task and working on that also.

### Tabs are converted into spaces
 
Output of Haiku-format is converting tabs into spaces :

```

    private:
    	BString fTitle;
    	BBitmap* fPrimaryIcon;
    	bool fSelected;

```
whereas the expected output is :

```

    private:
    
    	BString		fTitle;
    	BBitmap*	fPrimaryIcon;
    	bool		fSelected;

```

The basic idea is :

    indented 1 tab: qualifiers (volatile, virtual, static)  
    indented 3 tabs: type of fields and return type of functions  
    indented 2 tabs: function or field name

I have writted the code for it that need some changes which is under progress.

You can find the sources on  [Github](https://github.com/viveris/llvm-project) and my weekly blogs [here](https://hackace2.wordpress.com/category/gsoc/).

Thankyou :)
