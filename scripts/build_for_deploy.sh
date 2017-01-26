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

if [ ! -d haiku ]; then
	git clone https://github.com/haiku/haiku/ --depth=5
fi
cd haiku
git pull --ff-only
if [ ! -d generated ]; then
	mkdir generated
	cd generated
	wget https://ftp.stack.nl/pub/users/dimitri/doxygen-1.8.13.linux.bin.tar.gz -O doxygen.tar.gz -nv
	tar -xvf doxygen.tar.gz
	mkdir doxybin
	cp doxygen-*/bin/* doxybin/
	rm -rf doxygen-*/
	rm doxygen.bin.tar.gz
	cd ..
fi
generated/doxybin/doxygen --help || true
rm -rf generated
cd ..

rm -rf public/docs/

sed -i "s/BuildTypeIsDeploy = false/BuildTypeIsDeploy = true/g" config.toml
$HUGO
sed -i "s/BuildTypeIsDeploy = true/BuildTypeIsDeploy = false/g" config.toml

mkdir public/docs/
cp -R haiku/docs/userguide/ public/docs/
cp -R haiku/docs/welcome/ public/docs/
