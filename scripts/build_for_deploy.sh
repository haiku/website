#!/bin/bash

set -e
for cmd in "mv rm wget unzip hugo"; do
	command -v $cmd >/dev/null 2>&1 || { echo -e >&2 "$cmd is not installed, please install it."; exit 1; }
done

if [ ! -d content ]; then
	echo "This script must be run from the root of the repository."
	exit 1
fi

wget https://github.com/haiku/haiku/archive/master.zip -O master.zip -nv
unzip master.zip 'haiku-master/docs/userguide/**'
rm master.zip

rm -rf public/
hugo
mv haiku-master/docs public/
rm -rf haiku-master/
