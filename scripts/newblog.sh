#!/bin/bash

req()
{
	for cmd in "$@"; do
		command -v $cmd >/dev/null 2>&1 || { echo -e >&2 "$cmd is not installed, please install it."; exit 1; }
	done
}
req mkdir cp sed tr

if [ ! -d content ]; then
	echo "This script must be run from the root of the repository."
	exit 1
fi
if [ $# -ne 1 ]; then
	echo "Usage: ./scripts/newblog.sh <name>"
	echo "e.g.: ./scripts/newblog.sh PulkoMandy"
	exit 1
fi

DIRNAME=`echo $1 | tr '[:upper:]' '[:lower:]'`
mkdir -p content/blog/$DIRNAME
cp ./scripts/blog_index.md content/blog/$DIRNAME/_index.md
sed -i s/NAME_GOES_HERE/$1/g content/blog/$DIRNAME/_index.md
