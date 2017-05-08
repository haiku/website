+++
type = "blog"
title = "[GSoC 2017] Calendar Application"
author = "AkshayAgarwal007"
date = "2017-05-08 06:51:03+05:30"
tags = ["haiku","gsoc2017","gsoc","Google Summer of Code"]
+++ 

Hello I'm Akshay (IRC/Trac: akshay, GitHub: AkshayAgarwal007) from Kolkata, India. I would be working on developing a native **Calendar Application** for Haiku as a part of Google Summer of Code 2017. My mentors for the project are Scott McCreary and Kacper Kasper. I am very excited for this project.

### Why a Calendar Application? Isn't there already one?

A Calendar application is a must have application for any operating system and would be beneficial for end users as well as developers. Haiku doesn't have a calendar application yet. There are a few existing 3rd party Calendar apps out there, but none are close to a simple and elegant Calendar app that an end user would like to use, with all the necessary features a modern Calendar app should have.

Also the existing ones ([**Borg**](https://github.com/HaikuArchives/Borg), [**A-Book**](https://github.com/HaikuArchives/A-Book), [**Organizer**](https://github.com/HaikuArchives/Organizer), [**Eventual**](https://github.com/HaikuArchives/Eventual)) have issues of their own and hence I would be writing one completely from scratch, referring them wherever required.

### Features the Calendar app would have

I reviewed a bunch of Calendar apps on other platforms and came up with a subset of necessary features to be implemented:

1. Create, modify and synchronise events.
2. Set event reminders.
3. Display Day, Month Calendar views.
4. Set event color
5. All day long events, recurring events.
6. Google Calendar integration.
7. A minimal look with intuitive UI design.

### Future features

These are the features that I plan to work upon after GSoC:

1. Support for alternate calendars.
2. Categorize events.
3. Search for events.
4. Week, Year View.
5. Timeline view for a single day/week.

### Google Calendar Integration 

This is one of the most important feature the Calendar app would have. It is a must have so that the users can get their events synchronised between devices and other platforms they use. Since almost all the calendar apps have a Google Calendar integration, this would be the best way to achieve event synchronisation.

A Google Calendar API client would be written using Haiku APIs and would be integrated into the application. 


### Wireframes

These are some tentative designs for the Calendar application.

#### Add Event
* I would be coming up with a final design for this incorporating all the options required for supporting recurring events and an event color picker.

![Add Event](/files/blog/AkshayAgarwal007/add-event.png)

#### Day View 
* All day long events would be pinned to the top.
* Right click on an event will open a context menu with three options (View, Modify, Delete)
* View will open the entire event details in read only mode. Modify and Delete options would also be available inside View mode.
* Using the calendar widget in the side panel, user can navigate through months. Buttons to navigate one month at a time can be replaced by a dropdown to simply select month+year for user's ease.

![Day View](/files/blog/AkshayAgarwal007/day-view.png)

#### Month View

* Clicking on a particular day in month view will show events of that day in side panel.
* Right click on an event in side panel will trigger the same options as in Day view.
* Again the buttons to navigate one month/year at a time can be replaced by a dropdown to simply select month+year for user's ease.

![Month View](/files/blog/AkshayAgarwal007/month-view.png)

I would be finalising the user interface design in the upcoming week and suggestions from you all would be highly valuable for the same.

### Icons

I plan to use the following icons in the application (icons be Michele Frau [Zumi] are really cool):

1. **Main Application** icon: http://zumi.xoom.it/myhaiku/3rd%20party%20apps/schedule%20r3.png
2. **Add Event** toolbar icon: http://zumi.xoom.it/myhaiku/btoolbar/document%20open%20recent.png
3. I would be needing a **Calendar** toolbar icon similar to one in the wireframes.

Apart from this I would also be working on to improve date/time classes in Haiku as required for the application.

### References

* [PDF copy of my GSoC Proposal](https://drive.google.com/file/d/0BxAs33Lm1mJwNkItUnFoWGlRZnc/view?usp=sharing)
* [Eventual Documentation](https://sourceforge.net/projects/eventual/files/Documentation/)
* [GNOME 3 Calendar App Design](https://wiki.gnome.org/Design/Apps/Calendar)