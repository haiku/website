Haiku Project website
======================================
This repository contains the source code for Haiku's main website.

## Blogging
To create a new blog for a new user, run `./scripts/newblog.sh`.

To create a new blogpost, run `./scripts/newpost.sh`.

## Shortcodes
Shortcodes introduce the ability to leverage special formatting
in markdown documents. All available shortcodes are in layouts/shortcodes.

### Alerts
A classic alert or notification div with a title and a body

  * ``{{< alert-danger "Title" "Body text here">}}``
  * ``{{< alert-warning "Title" "Body text here">}}``
  * ``{{< alert-info "Title" "Body text here">}}``

### Keyboard
A small keyboard like span. Normally used to represent pressing
a physical key on the keyboard.

  * ``{{< keyboard ALT >}}``
