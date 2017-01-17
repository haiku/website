+++
type = "blog"
author = "PulkoMandy"
title = "Haiku locale kit: the translator handbook"
date = "2009-09-24T21:49:16.000Z"
tags = ["localekit"]
+++

GSoC is now over. It was quite fun to work with Haiku this summer, I learnt a lot of things, I gained commit access, and soon I'll have a new TShirt to wear :)

After the alpha release, the locale kit was merged back into the trunk. Of course, as soon as this was done I got flooded with bug reports, ranging from build breakage on freebsd to lack of grist in the jamfiles making the catalogs mix up between apps. As far as I know, both of these are now fixed, but there is still a problem when building from Dano and the bluetooth preflet doesn't want to be localized.
<!--more-->
I'm also back to school, meaning I have a lot less time to spend on Haiku.

Still, I started to localize some applications so the code gets more exposure. Now, you can see my work in the Appearance and Bluetooth preflets. However, there are only french and english catalogs available. Some people asked me on IRC how translation is supposed to work, so I decided to write it down here instead of repeating it each time I'm asked.

When an app is localized, the build system will generate a catalog file for the english language automatically. This is a two step process. First, the strings are extracted from the C++ sourcecode to a "catkey" file, which is a simple textfile. Then, the catkey file is compiled to a binary catalog, that is included in the image and actually used for translation. It is possible to use the catkey file directly instead of compiling it, but that's not recommanded, as it is slower and bigger.

To translate an application, you need to create a catkey file for your language and add it to the jamfile. The simplest way is to copy the fr.catkeys file from the source directory and work from there (I always provide a french translation when I localize an application, as I can then test it).

The file format is very simple. The first name holds the format version (1 for now), the language (usually you'll find "french", replace as appropriate) and a checksum of all the english strings (you should not touch it).
The following lines holds 4 fields:
<ul>
 <li>The English text</li>
 <li>The context (usually the name of the sourcecode file where the string is found, but there is no enforced standard so it may vary depending on who did the localization)</li>
 <li>A comment (usually empty), used only to differenciate two strings having the same english text and context, but needing a different translation</li>
 <li>The translated text</li>
</ul> 

The values are tab-separated. Tabs are used because they are usually not found in C++ strings (you use \t instead), and they are printable without any problem in any text editor. Beware not to replace them with spaces, as then the file would not work anymore. It is safe to swap lines in the file. They are put in there in a random order by the tools, so you may want to sort them a little to see what you are doing. Don't delete or add lines as this will change the checksum and make the locale kit drop your catalog. Don't ever touch anything else than the translated text column on the right. It is also important to encode the file as utf-8 and use UNIX-style line endings, or else you will see unexpected things in the application.

Once you have finished your translation, rebuilding the haiku image will generate it and add it automatically. However, if you are working under haiku you can also test your new file directly. There are multiple solutions for that :
<ul>
<li>Use the catkey file directly</li>
<li>Compile the file to binary format using the linkcatkeys tool (it is available in recent versions of Haiku, since the locale kit integration)</li>
<li>Use any of these file and copy it next to the executable</li>
<li>... or copy it in /boot/system/etc/locale/catalogs/</li>
<li>... or alternatively in /boot/common/etc/locale/catalogs/</li>

In any case, the catkeys file should be renamed to .txt if you want to use it there.
You have to put the file in a subfolder of any of these three folders, this folder must be named after the application mimetype. For example, the locale preflet french catalog is stored in /boot/system/etc/locale/catalogs/x-vnd.Haiku-Locale/fr.catalog .
Another possibility is to have the catalog stored inside the application as a resource or as an attribute. But this has not been tested yet. It may work, but it may as well corrupt your executable. See linkcatkeys inline help for more information on how to do it if you want to try.

If for some reason your catalog is not working well, you may want to look in the syslog. The locale kit is still young, so it is outputting a lot of debug info there. It will tell you where it is looking for catalogs, and what happens when it finds one.

This catalog format is not related to ICU in any way. ICU is only handling the date and time formatting aspect (and formats also some other things), not the catalogs for translation. So, it's a homemade format for Haiku only, and you will not find many tools to help working with it.

Feel free to ask me if you have any questions. I hope to see many translations for the apps I localized, and maybe people helping me to translate everything.