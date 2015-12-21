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
if [ $# -lt 2 ]; then
	echo "Usage: ./scripts/newpost.sh <title> <author>"
	echo "e.g.: ./scripts/newblog.sh \"Website Rewrite Complete\" waddlesplash"
fi

DIRNAME=`echo $2 | tr '[:upper:]' '[:lower:]'`
POSTFILE=`echo $1 | tr '[:upper:]' '[:lower:]' | sed "s/ /_/g" | tr -cd '[[:alnum:]]_-'`.md
cp ./scripts/blog_post.md content/blog/$DIRNAME/$POSTFILE
sed -i "s/TITLE_GOES_HERE/$(echo $1 | sed -e 's/\\/\\\\/g' -e 's/\//\\\//g' -e 's/&/\\\&/g')/g" content/blog/$DIRNAME/$POSTFILE
sed -i "s/AUTHOR_GOES_HERE/$2/g" content/blog/$DIRNAME/$POSTFILE
sed -i "s/DATE_GOES_HERE/$(date --rfc-3339=seconds)/g" content/blog/$DIRNAME/$POSTFILE
echo "Done; post is at content/blog/$DIRNAME/$POSTFILE"
