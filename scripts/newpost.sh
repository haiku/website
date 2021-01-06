#!/bin/bash

req()
{
	for cmd in "$@"; do
		command -v $cmd >/dev/null 2>&1 || { echo -e >&2 "$cmd is not installed, please install it."; exit 1; }
	done
}
req cp sed tr date

if [ ! -d content ]; then
	echo "This script must be run from the root of the repository."
	exit 1
fi
if [ $# -ne 2 ]; then
	echo "Usage: ./scripts/newpost.sh <title> <author>"
	echo "e.g.: ./scripts/newpost.sh \"Website Rewrite Complete\" waddlesplash"
	exit 1
fi

DIRNAME=content/blog/`echo $2 | tr '[:upper:]' '[:lower:]'`

if [ ! -d "$DIRNAME" ]; then
	echo "Blog not found, please check author or run ./scripts/newblog.sh $2"
	exit 1
fi

AUTHOR=$(sed -n 's/^\s*author\s*=\s*//p' $DIRNAME/_index.md)
if [ -z "$AUTHOR" ]; then
	AUTHOR=\"$2\"
fi

POSTFILE=`date --rfc-3339=date`_`echo $1 | tr '[:upper:]' '[:lower:]' | sed "s/ /_/g" | tr -cd '[[:alnum:]]_-'`.md
cp ./scripts/blog_post.md $DIRNAME/$POSTFILE
sed -i "s/TITLE_GOES_HERE/$(echo $1 | sed -e 's/\\/\\\\/g' -e 's/\//\\\//g' -e 's/&/\\\&/g')/g" $DIRNAME/$POSTFILE
sed -i "s/\"AUTHOR_GOES_HERE\"/$AUTHOR/g" $DIRNAME/$POSTFILE
sed -i "s/DATE_GOES_HERE/$(date --rfc-3339=seconds)/g" $DIRNAME/$POSTFILE
echo "Done; post is at $DIRNAME/$POSTFILE"
