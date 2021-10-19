#!/bin/bash

set -e
HUGO=hugo
for cmd in "mv rm wget unzip sed pip $HUGO"; do
	command -v $cmd >/dev/null 2>&1 || { echo -e >&2 "$cmd is not installed, please install it."; exit 1; }
done
echo "Using Hugo $HUGO"

if [ ! -d content ]; then
	echo "This script must be run from the root of the repository."
	exit 1
fi

if [ ! -d haiku ]; then
	git clone https://github.com/haiku/haiku/ --depth=5
fi
pushd haiku
	if [ ! -d generated ]; then
		mkdir generated
		pushd generated
		wget https://nchc.dl.sourceforge.net/project/doxygen/rel-1.8.16/doxygen-1.8.16.linux.bin.tar.gz -O doxygen.tar.gz -nv
		tar -xvf doxygen.tar.gz doxygen-1.8.16/bin/
		mkdir doxybin
		mv doxygen-*/bin/* doxybin/
		rm -rf doxygen-*/
		rm doxygen.tar.gz
		popd
		pip install sphinx
	fi
	gitout=$(git pull --ff-only)
	if [[ $gitout != *"Already up-to-date"* ]] || [ ! -d "generated/doxygen/html" ]; then
		pushd docs/user/
			../../generated/doxybin/doxygen
		popd
	fi
	if [[ $gitout != *"Already up-to-date"* ]] || [ ! -d "docs/develop/generated/html" ]; then
		pushd docs/develop/
			make html
		popd
	fi
popd

rm -rf public/docs/

sed -i "s/BuildTypeIsDeploy = false/BuildTypeIsDeploy = true/g" config.toml
$HUGO --minify
sed -i "s/BuildTypeIsDeploy = true/BuildTypeIsDeploy = false/g" config.toml

mkdir public/docs/
cp -R haiku/docs/userguide/ public/docs/
cp -R haiku/docs/welcome/ public/docs/
cp -R haiku/docs/interface_guidelines/ public/docs/
cp -R haiku/generated/doxygen/html/ public/docs/
cp -R haiku/docs/develop/generated/html public/docs/develop

mv public/docs/html/ public/docs/api/
mv public/docs/interface_guidelines/ public/docs/HIG/
