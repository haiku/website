+++
type = "blog"
author = "mmu_man"
title = "The bowels of the Theme Manager, or How to make Haiku as ugly as Zeta"
date = "2008-01-26T00:24:15.000Z"
tags = ["BMessage", "gui themes", "theme manager", "3rdparty", "plain text"]
+++

Some people might wonder what exactly this "themes" stuff in the commits is all about. So let's see how it all started, where we are and what's left to do.

<h3>Features</h3>

The Theme Manager is an addon-based desktop theme selector. It can selectively apply parts of a theme, create a new one based on the current configuration, add a screenshot to it. 

Currently, themes contain settings for ui colors, system fonts, background pictures, window decorator, deskbar position, screensaver, Terminal colors, font and size, sounds, and even the selected winamp skin from CL-Amp and SoundPlay through a specific plugin.

Some addons simply reflect actual settings from a different API or storage (like ui colors, or backgrounds from attributes on <code>~/Desktop/</code>, screensaver...). Some other addons don't add data to a theme but use data from other addons to help specific applications to behave nicely (BeIDE, Pe, Eddie, SoundPlay all have their own color setting unrespectful of ui_color()).

It is planned to later be able to zip up the required files for a theme to ease distribution, and maybe import themes from other platforms.

With it you can now customize Haiku to look <a href="http://revolf.free.fr/beos/shots/shot_haiku_theme_citrus.png">as ugly as Zeta</a> or show your <a href="http://revolf.free.fr/beos/shots/shot_haiku_theme_sga.png">TV series tastes</a>.
It's not recommended for distro makers to deviate from the chosen defaults, however it might be useful later for specific Haiku vendors in the future to use their own branding.
Application writers should use it to check how their application works with non-standard settings. Say no to hardcoded colors!

<h3>History</h3>

It all began by playing around with some public calls I found in Dano's InterfaceDefs.h, namely get_ui_settings() and update_ui_settings(). There wasn't any documentation so I wrote a test prog to call it and PrintToStream() the message returned. It looked like:
<pre>BMessage(0x00000000) {
	be:c:PanBg = rgb_color(216,216,216,255)
	be:c:PanTx = rgb_color(0,0,0,255)
	be:c:PanLn = rgb_color(0,137,204,255)
	...
	be:f:MenTx = BFont(Swis721 BT/Roman/12.0, shear=90.0, rot=0.0, h
eight=11.5547+2.83008+0.0)
	be:MenSep = int32(0 or (nil))
	be:MenTrig = bool(false)
}</pre>
(note Dano's output from BMessage::PrintToStream() was changed from R5. It's more structured, which is why I wrote a parser for that kind of plain text dump, and a dumper because some types weren't that nicely printed. This makes themes user editable and easy to diff)

It seems Be wanted to centralize ui customization data (colors, fonts...). The names in this message were made accessible through const strings derived from ui_color() values (B_UI_FOO_COLOR). Those were usable through string versions of the SetViewcolor() calls so that on settings change the colors would be updated. The "names" message in get_ui_settings() contained strings describing each of the field name. It will later be used to generate the comments in the theme file.

Saving and reading this to change the color was nice, but I wanted better. So I started writing a proper theme manager that would use a superset of this data to describe a theme. For once I did some design on it so one can safely read the code without risking a headache. At some point it got added to Zeta's Appearance preference, but some addons were disabled. This explains the naming scheme used, which probably needs some cleanup.

<h3>Architecture</h3>

The core part is composed of the following classes:
<dl>
<dt>ThemeManager</dt><dd>The theme manager proper, it handles loading, saving and manipulating themes, loading addons and asking them to do their job.</dd>
<dt>ThemesAddon</dt><dd> The base class for addons, of which we have, from the addons/ subfolder:

<dl>
<dt>BackgroundThemesAddon</dt><dd>which handles the Desktop backgrounds</dd>
<dt>BeIDEThemesAddon</dt><dd>which sets BeIDE's background and foreground color according to the new B_DOCUMENT_*_COLOR.</dd>
<dt>UISettingsThemesAddon</dt><dd>from either DanoUISettingsAddon.cpp or HaikuUISettings.cpp depending on the __HAIKU__ define. </dd>
<dt>DeskbarThemesAddon</dt><dd>handles Deskbar position, to mimic windows' taskbar, MacOS menu...</dd>
<dt>...</dt><dd></dd>
<dt>WinampSkinThemesAddon</dt><dd>this one automatically changes the winamp skin used by both SoundPlay and CL-Amp (through a selector plugin). So a redmond theme can select a win2k skin for example.</dd>
</dl></dd>
</dl>

GUI stuff:
<dl>
<dt>ThemesApp</dt><dd></dd>
<dt>ThemesInterfaceView</dt><dd>the main view of the app.</dd>
<dt>ThemeAddonItem</dt><dd>has checkboxes to allow the addon to apply or save its part of the theme.</dd>
<dt>ThemeItem</dt><dd>Represents a theme in the list, it marks a readonly theme (from /etc) with a different background color.</dd>
</dl>

Utility files:
<dl>
<dt>CompareMessages.cpp</dt><dd></dd>
<dt>DumpMessage.cpp</dt><dd>Is used to flatten the theme BMessage container to plain text.</dd>
<dt>MakeScreenshot.cpp</dt><dd>The function here hides the theme manager window, and takes a screenshot to be added to the current theme.</dd>
<dt>ParseMessage.cpp</dt><dd>Makes a BMessage out of a plain text dump.</dd>
<dt>TextInputAlert.cpp</dt><dd>A hacked BAlert that allows text input (to name a new theme).</dd>
<dt>Utils.cpp</dt><dd>Various wrapper for platform dependant stuff (Add/FindRGBColor, Add/FindFont, file storage, findind the .TTF where a BFont comes from).</dd>
<dt>ViewItem.cpp</dt><dd>a BListItem subclass that can embbeds a BView (used to create a list of checkboxes).</dd>
</dl>

The ThemeManager class contains a list of themes and addons, and is used to manipulate both. When requested an action it tells each addon about it in sequence. It also takes care of saving the current settings before applying new ones to allow reverting the action.

A theme consists of a BMessage which contains other BMessages, one for meta infos (name, name of screenshot...), and usually one for each addon. The global BMessage is then dumped to a text file, with comments generated from the names message.

A theme file looks like:
<pre>// new BMessage
BMessage('ZThm') {
        z:theme:infos = BMessage(0x00000000) {
                z:theme:name = string("Default", 5 bytes)
                z:theme:screenshot = string("screenshot.png", 14 bytes)
        }
        // Desktop backgrounds and color; please respect count and ordering of all fields!
        be:bgndimginfo = BMessage(0x00000000) {
                // If true, use desktop color as icon text background
                be:bgndimginfoerasetext = bool(false)
                // Actual backdrop image file
                be:bgndimginfopath = string("/boot/beos/etc/Backgrounds/ZETA_1.2.png", 39 bytes)
                ... more of the background message
        ... more BMessages</pre>

Some messages are 1:1 copies of the actual native storage, like the backgrounds attribute, others include it (the screensaver one contains both the name of the selected saver and its settings), or a BMessage representation of another data.

<h3>Hands on addon</h3>

Themes addons are responsible for applying the theme or acquiring the data to make a new one. It usually uses its own sub message (via [Set]MyMessage()), but can also snoop other messages. Helper addons for BeIDE and others just read the ui settings message to get the wanted color and overwrites the settings file of the app with it.

The following methods can be implemented by addons:

<dl>
<dt>(constructor)</dt><dd>usually only calls the base class constructor, with the addon name and optional message name as arguments.</dd>
<dt>Name(), Description()</dt><dd>Return the pretty name and a description for an addon.</dd>
<dt>OptionsView()</dt><dd>returns a BView that can be used to control the addon. Currently unused.</dd>
<dt>RunPreferencesPanel()</dt><dd>Does what its name says.</dd>
<dt>LoadSettings(), SaveSettings()</dt><dd>Hooks that loads and saves addon settings along with the theme manager's own. The base class handles the addon flag. You can override them to add your own settings but remember to call the baseclass'.</dd>
<dt>SetAddonFlags()</dt><dd>Is call'd by the theme manager to change the addon's behaviour to the user's taste. don't use it directly.</dd>
<dt>AddonFlag()</dt><dd>Use it to check what you can do and what you can skip.</dd>
<dt>AddNames()</dt><dd>Override this to add descriptions for the fields your addon generates in the theme message. They will be used as comments in the theme file.</dd>
<dt>MessageName()</dt><dd>returns the name of the message generated by your addon, or NULL if it doesn't have its own.</dd>
<dt>MyMessage()</dt><dd>searches theme for your addon's message (the one named by MessageName()).</dd>
<dt>SetMyMessage()</dt><dd>Updates theme with your own submessage.</dd>
<dt>ApplyTheme()</dt><dd>This method is called with the selected theme and flags telling whether to try to apply the settings to running applications (APPLY) or save to the application's settings file (SAVE) or both (SET_ALL), with provision for new flags. Sometimes you can only apply settings to live applications, sometimes only to settings file, just try your best. Either use <code>MyMessage()</code> to get your own submessage, or search the <code>theme</code> argument for the one you want.</dd>
<dt>MakeTheme()</dt><dd>The duty of the MakeTheme() call is to add data to the message to create or update a theme from the current settings. It usually reads an application settings file or attributes or queries a known API like BMediaFiles, but can also query a running application (though it should be avoided). If you have your own named submessage just call SetMyMessage(). Some helper addon would just do nothing as they reuse existing data taken from another source.</dd>
<dt>ApplyDefaultTheme()</dt><dd>There you should generate a sensible default message and apply it.</dd>
<dt>BackupCurrent() and RestoreCurrent()</dt><dd>these just call MakeTheme() and ApplyTheme() on a backup message to allow reverting an action. No need to touch this.</dd>
<dt>CompareToCurrent()</dt><dd>Compares the current settings with a theme. Again no need to touch.</dd>
<dt>InstallFiles() and BackupFiles()</dt><dd>Reserved for later implementation of theme archival. They are supposed to locate and copy the files required to use the theme (specific background pictures, TTF fonts...), and install them from a fresh unzipped theme.</dd>
</dl>

There is also a C function instantiate_themes_addon(), which is re#defined by default to make a single binary.

Now let's see how the <a href="http://dev.haiku-os.org/browser/haiku/trunk/3rdparty/mmu_man/themes/addons/DeskbarAddon.cpp">Deskbar addon</a> works.

First, because it's part of the main binary, some global headers reference it:
The message name is declared in UITheme.h:
<pre>#define Z_THEME_DESKBAR_SETTINGS "deskbar_settings"</pre>
The instantiator function is declared in ThemesAddon.h:
<pre>extern "C" Z::ThemeManager::ThemesAddon *instantiate_themes_addon_deskbar();</pre>
And of course ThemeManager.cpp calls it and adds the addon to the list:
<pre>	ta = instantiate_themes_addon_deskbar();
	ADDA(ta); // this is a macro</pre>

Then in the addon file itself, we define the instantiator name, addon name and description, and the message name (would be NULL for helper addons):
<pre>#ifdef SINGLE_BINARY
#define instantiate_themes_addon instantiate_themes_addon_deskbar
#endif

#define A_NAME "Deskbar"
#define A_MSGNAME Z_THEME_DESKBAR_SETTINGS
#define A_DESCRIPTION "Deskbar on-screen position"</pre>
</pre>

Then the classic class definition, constructor and destrictor.
RunPreferencesPanel tries to launch the native preferences panel, in case of Deskbar, Zeta has one, so it tries to run it.
Then this one adds descriptions for the submessage and fields we will add:
<pre>status_t DeskbarThemesAddon::AddNames(BMessage &names)
{
	// the sub message name
	names.AddString(Z_THEME_DESKBAR_SETTINGS, "Deskbar position");
	// its fields
	names.AddString("db:location", "Deskbar on-screen position");
	names.AddString("db:expanded", "Deskbar is expanded");
	return B_OK;
}</pre>

And the big part:
<pre>status_t DeskbarThemesAddon::ApplyTheme(BMessage &theme, uint32 flags)
{
	BMessage deskbar;
	status_t err;
	int32 loc = 5;
	bool expanded = true;
	BDeskbar db;
	
	// check if the addon is supposed to do anything
	// this one had only one way of action,
	// but others will differentiate the APPLY and SAVE cases,
	// and either send messages to applications via the roster,
	// or read and write-back settings file, or both.
	// see other addons.
	if (!(flags & UI_THEME_SETTINGS_SET_ALL) || !(AddonFlags() & Z_THEME_ADDON_DO_SET_ALL))
		return B_OK;
	
	// get our submessage
	err = MyMessage(theme, deskbar);
	if (err)
		return err;
	
	// find the recorded position
	if (deskbar.FindInt32("db:location", &loc) != B_OK)
		return ENOENT;
	// see if it was expanded or not...
	deskbar.FindBool("db:expanded", &expanded);
	// and try to tell Deskbar to go there.
	return db.SetLocation((deskbar_location)loc, expanded);
}</pre>

<pre>status_t DeskbarThemesAddon::MakeTheme(BMessage &theme, uint32 flags)
{
	BMessage deskbar;
	status_t err;
	
	// ThemeManager would only call us if we have the RETRIEVE flag set.
	(void)flags;
	// get the current submessage (it should be empty though)
	err = MyMessage(theme, deskbar);
	if (err)
		deskbar.MakeEmpty();
	
	deskbar_location loc;
	bool expanded;
	BDeskbar db;

	// just in case clear up the fields we'll change
	deskbar.RemoveName("db:location");
	deskbar.RemoveName("db:expanded");

	// ask Deskbar for its location
	loc = db.Location(&expanded);
	// and save it
	deskbar.AddInt32("db:location", (int32)loc);
	deskbar.AddBool("db:expanded", expanded);
	
	// now put the updated message back to the theme.
	err = SetMyMessage(theme, deskbar);
	return err;
}
</pre>

The ApplyDefaultTheme() method jsut fills in a default message and calls ApplyTheme() on it.
Then we have the simple instantiator function.

Oh and of course one must add a new addon source file to the Jamfile.

<h3>Testing</h3>
First make sure you run configure with the --include-3rdparty option.
Then either add the application to the image in your UserBuildConfig:
<pre>AddFilesToHaikuImage apps : &lt;3rdparty&gt;Themes ;</pre>

or build a BeOS version with:
<pre>TARGET_PLATFORM=r5 jam '&lt;3rdparty&gt;Themes'</pre>

(it might actually not build for R5 but only dano though for now).

Themes go to ~/config/settings/UIThemes/(theme name)/

<h3>Writing Theme-friendly applications</h3>
Application writers should of course use ui_color() and system fonts as much as possible, and avoid caching them, as they might change any time. Using SetViewColor(ui_color(B_PANEL...)) isn't much of a problem for short-time popups, but other views will stay this way. And don't forget foreground colors! Some people (including visually impaired persons) might want to have a white-on-black interface for various reasons. There is nothing more frustrating than a window using hardcoded black text on a ui_color(B_DOCUMENT_BACKGROUND_COLOR) set to black.

Minimal theme support would at least have application work with new settings on restart. 
If you want to support live changes fully, you can check for Dano's B_UI_SETTINGS_CHANGED, that is the '_UIC' what code, in your BWindow. Theme Manager will broadcast it on Haiku. Then you can tell your views to refresh their ViewColor and others. Live change should also include font update, which means relayouting the whole gui. That's where Haiku's layout engine might become handy.

If you use specific colors (like syntax coloring), either try to tint a system color (and remember they might even be white on black), or make them changeable and use system ones for default colors. Also keep in mind someone might want to make an addon to support your app. So don't invent a weird file format for your settings file. Using attributes makes it simpler to just replace one value without having to parse a file. Flattened BMessage should do as well. Also if you send yourself (BApplication or BWindow...) a message from the preferences window others will be able to tell your application to change live. You can even think about trying scripting...

<h3>Things to come</h3>
Maybe one day a one-click zipping up of themes for upload will be supported.
Some fixes are still required for Haiku, and some parts of Haiku still requires fixes to behave correctly (hardcoded colors...).
Maybe a way to fine edit the theme itself to change the values from a gui would be more user friendly than a text editor... the best is probably to export to a .rsrc in some way and use a resource editor.
There are other ideas for addons in the TODO list.
Feel free to pick one or submit others.

See also:
<ul>
<li>Use <a href="http://dev.haiku-os.org/browser/haiku/trunk/3rdparty/mmu_man/themes">the Source</a>, Luke.</li>
<li>Some <a href="http://revolf.free.fr/z/themes/">sample themes</a> as an incentive to do better.</li>
</ul>

Now you know everyting required to help fix the <a href="http://dev.haiku-os.org/browser/haiku/trunk/3rdparty/mmu_man/themes/TODO.txt">things to do</a> !
