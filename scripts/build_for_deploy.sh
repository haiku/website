#!/bin/bash

set -e
HUGO=hugo
for cmd in "mv rm wget unzip sed $HUGO"; do
	command -v $cmd >/dev/null 2>&1 || { echo -e >&2 "$cmd is not installed, please install it."; exit 1; }
done
command -v hugo_0.18 >/dev/null 2>&1 && HUGO=hugo_0.18
echo "Using Hugo $HUGO"

if [ ! -d content ]; then
	echo "This script must be run from the root of the repository."
	exit 1
fi

wget https://github.com/haiku/haiku/archive/master.zip -O master.zip -nv
unzip -q master.zip 'haiku-master/docs/userguide/**'
unzip -q master.zip 'haiku-master/docs/welcome/**'
rm master.zip

rm -rf public/docs/

sed -i "s/BuildTypeIsDeploy = false/BuildTypeIsDeploy = true/g" config.toml
$HUGO
sed -i "s/BuildTypeIsDeploy = true/BuildTypeIsDeploy = false/g" config.toml

mv haiku-master/docs public/
rm -rf haiku-master/
