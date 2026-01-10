+++
type = "blog"
title = "The revamped OpenGL kit"
author = "kallisti5"
date = "2023-02-18 12:34:26-06:00"
tags = ["haiku", "software", "opengl"]
+++

X512 has been hard at work reworking the internals of our OpenGL rendering pipeline. With his
work, Haiku is going to be moving to an EGL-based renderer dispatch pipeline. This will enable
greater reuse of existing Mesa code paths, while offering our BeOS OpenGL kit API compatibility.

# The Current OpenGL Kit

The current OpenGL kit comes from Mesa (something we named "HGL" a few years ago).

OpenGL rendering is dispatched by:

* BGLView from libGL (provided by Mesa HGL)
  * HGL dispatches a BGLRenderer from add-ons/opengl (provided by our code in Mesa wrapping the renderers)
    * Options today include llvmpipe software accelerated rendering
	* Drawing surfaces between Mesa and Haiku occurs via a BBitmap passed into Mesa's renderers

This model (while identically following the BeOS API) doesn't really fit within the current design
of modern Mesa or 3D-rendering subsystems.  We must design and maintain any "BGLRenderers" add-ons
or create a DRI/DRM compatibility library to directly implement Linux subsystems.

While the current model perfectly fits the BeOS design, it isn't really viable for us "design our
own hardware 3d rendering pipeline" with the limited developers available.

# The New OpenGL Kit

X512 has redesigned Haiku's OpenGL kit into the new [libglvnd](https://github.com/NVIDIA/libglvnd) library developed by NVIDIA.

In this new model, calls for 3D rendering are dispatched by:

* BGLView from libGL (provided by libglvnd)
  * HGL dispatches an EGL renderer from add-ons/opengl/egl_vendor.d (provided by Mesa, NVIDIA?, etc)
  * Options today include llvmpipe software accelerated rendering.

This model eliminates the BGLRenderer from BeOS, however migrates us to a more standard 3D rendering
pipeline and dispatch model.  This should eliminate the need for DRI/DRM compatibility subsystems,
and offer OpenGL rendering contexts through EGL renderers provided by Mesa, or private companies)

# More Information

* [NVIDIA's libglvnd](https://github.com/NVIDIA/libglvnd)
  * [X512's libglvnd](https://github.com/X547/libglvnd) branch
* [X512's Mesa work](https://gitlab.freedesktop.org/mesa/mesa/-/merge_requests/21079)
