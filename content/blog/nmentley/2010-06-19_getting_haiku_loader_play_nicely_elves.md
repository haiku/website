+++
type = "blog"
author = "nmentley"
title = "Getting haiku_loader to play nicely with elves"
date = "2010-06-19T15:04:42.000Z"
tags = ["haiku_loader", "elf64", "x86_64", "gsoc", "gsoc2010"]
+++

One of the first steps I'm taking in setting up x86_64 support for haiku is updating haiku_loader to support elf64 binaries. I felt like it would be a bit more logical to be able to boot a 64bit kernel before trying to build one.

There are a few hurdles to jump before haiku_loader is ready to load a 64bit haiku kernel. For example, we need to add the code to detect weather a kernel is an elf32 or elf64 binary. We need to load it accordingly and finally we'll need to modify how the kernel_args data structure is handled to support 64bit pointers.

<!--more-->

<b>detecting elf binary type</b>

Detecting the elf binary type isn't a huge challenge. In fact it's actually the easiest part. The elf header format has a descriptor that  confirms the format.

In haiku, we have a few elf binary related data structures. One of which is Elf32_Ehdr.... or the elf32 header. (shown below)
<pre>
struct Elf32_Ehdr { 
	uint8		e_ident[EI_NIDENT]; 
	Elf32_Half	e_type; 
	Elf32_Half	e_machine; 
	Elf32_Word	e_version; 
	Elf32_Addr	e_entry; 
	Elf32_Off	e_phoff; 
	Elf32_Off	e_shoff; 
	Elf32_Word	e_flags; 
	Elf32_Half	e_ehsize; 
	Elf32_Half	e_phentsize; 
	Elf32_Half	e_phnum; 
	Elf32_Half	e_shentsize; 
	Elf32_Half	e_shnum; 
	Elf32_Half	e_shstrndx; 
};
</pre>
If we are to load the header up with data from the binary and we get expected  results in the data structure(specifically in the ident, phoff, and phentsize fields) then we can assume the binary is an elf32 binary. This check has been apart of haiku_loader for quiet some time now, but the  new addition of haiku_loader is an additional check if the elf32 check fails.
The binary isn't an elf32 binary we can load the elf header into an elf64 header structure,  Elf64_Ehdr (shown below) and do a similar test to figure out if the binary is a valid elf64 binary.
<pre>
struct Elf64_Ehdr { 
	uint8		e_ident[EI_NIDENT]; 
	Elf64_Half	e_type; 
	Elf64_Half	e_machine; 
	Elf64_Word	e_version; 
	Elf64_Addr	e_entry; 
	Elf64_Off	e_phoff; 
	Elf64_Off	e_shoff; 
	Elf64_Word	e_flags; 
	Elf64_Half	e_ehsize; 
	Elf64_Half	e_phentsize; 
	Elf64_Half	e_phnum; 
	Elf64_Half	e_shentsize; 
	Elf64_Half	e_shnum; 
	Elf64_Half	e_shstrndx; 
};
</pre>
Now if both tests fail... We have a problem, but hopefully haiku_loader will determine which elf format the kernel binary is.

<b>loading elf64 binaries</b>

While adding support for loading elf64 binaries to haiku_loader I had to adjust the preloaded_image data structure. The preloaded_image data structure contained many elf32 specific data structures which would need to be adjusted to support elf64s. Since we want haiku_loader to be able to load both elf32 and elf64 binaries I had to setup a system where preloaded_image could load data from either elf binary type.

It's became quiet clear that I would need preloaded_image to have an elf32 and elf64 header data structure. I would need it to have 5 more elf related variables in the data structure duplicated.

The solution that I ended up using was quiet simple. The preloaded_image structure now has a few unnamed unions in it. The corresponding elf32 and elf64 variables in the data structure are now contained in unnamed unions. For example, the elf32 and elf64 header variables are contained together in an unnamed union. Basically, this means that they're both contained in the same section of memory overlapping each other. Consequently, This also means you can really only store either the elf32 header or the elf64 header at a single time. In this case that doesn't matter. We'd only need to load either an elf32 or an elf64 at one time.

After completing the data structure it looks some thing like this:
<pre>
struct preloaded_image { 
	struct preloaded_image *next; 
	char		*name; 
	uint8		elf_size; 
	elf_region	text_region; 
	elf_region	data_region; 
	addr_range	dynamic_section; 
	union 
	{ 
		struct Elf32_Ehdr elf_header; 
		struct Elf64_Ehdr elf_header64; 
	}; 
	union 
	{ 
		struct Elf32_Sym	*syms; 
		struct Elf64_Sym	*syms64; 
	}; 
	union 
	{ 
		struct Elf32_Rel	*rel; 
		struct Elf64_Rel	*rel64; 
	}; 
	int					rel_len; 
	union 
	{ 
		struct Elf32_Rela	*rela; 
		struct Elf64_Rela	*rela64; 
	}; 
	int					rela_len; 
	union 
	{ 
		struct Elf32_Rel	*pltrel; 
		struct Elf64_Rel	*pltrel64; 
	}; 
	int					pltrel_len; 
	int					pltrel_type; 

	union 
	{ 
		struct Elf32_Sym *debug_symbols; 
		struct Elf64_Sym *debug_symbols64; 
	}; 
	const char	*debug_string_table; 
	uint32		num_debug_symbols, debug_string_table_size; 

	ino_t		inode; 
	image_id	id; 
		// the ID field will be filled out in the kernel 
	bool		is_module; 
		// set by the module initialization code 
};
</pre>
After some basic changes to the elf loading code in /src/system/boot/loader/elf.cpp elf64 binaries seem to be getting loaded by haiku_loader...

<b>kernel_args</b>

The final major hurdle that's in the way from haiku_loader to support loading an elf64 kernel is the kernel_args data structure. The kernel_args data structure is filled with 32bit pointers... which will cause many issues when it's passed to the 64bit kernel.

We have haiku_loader running in a 32bit mode before jumping to the kernel. This has some benefits. We'll be able to load either 32bit kernels or 64bit kernels from the loader and we're also reusing much of the 32bit bios code in the bootloader.... However the main downside of this approach is that the data past to the kernel in kernel_args is from a code that's using 32bit pointers from memory.... So in either the kernel or haiku_loader we'll have to account for that.

This is currently the only part of haiku_loader that I'm still working on and unsure of what the final solution will be. 

Looking at the kernel_args data structure I don't think a similar fix with unions, like in preloaded_image, will be possible with kernel_args. Another possibility, and what I'm leaning towards right now, is to define a second kernel_args data structure in haiku_loader. This second data_structure will be equivalent to the kernel_args data structure that'll be used by a 64bit haiku kernel.

If the system detects that it'll be loading an elf64 kernel before finally jumping to the kernel it'll load up a 64bit kernel_args data structure with the contents of the normal 32bit data structure and pass the 64bit structure to the kernel.

<b>after kernel_args is completed</b>
Once kernel_args is finally finished and tested work on a x86_64 kernel can begin, but the updated haiku_loader shouldn't be seen as just part of the x86_64 port. In theory most of these changes will benefit any 64bit haiku port. The elf64 data structures should be usable on almost any 64bit platform. The elf64 loading code will be needed for that platform as well. The only x86_64 specific patch here will be the kernel_args fix. Since most 64bit architectures probably won't need to start haiku_loader in a 32bit mode.