+++
type = "article"
title = "Building Haiku on Mac OS X 10.6 or 10.7 with Homebrew"
date = "2012-05-08T02:24:05.000Z"
tags = ["build"]
+++

The recommended method for building Haiku on Mac OS X is to use MacPorts, but, with a little bit of work it is possible to build Haiku using homebrew on Mac OS X 10.6 or 10.7 instead. You'll need to install Xcode or at least the Command Line Tools before installing homebrew. 

If you don't want to install all of XCode you can install just gcc from the packages available here:

<a href="https://github.com/kennethreitz/osx-gcc-installer" title="osx-gcc-installer">https://github.com/kennethreitz/osx-gcc-installer</a>

Once you've installed gcc and homebrew installing most of the required software can be done with this command:

<code>brew install autoconf automake gawk gnu-sed yasm wget libjpg</code>

Optionally you can install cdrtools to build iso images with this command:

<code>brew install cdrtools</code>

There are a few formulas required by Haiku that are not included in homebrew including flex, bison, and gnu-regex. I have created formulas for these missing pieces of software.

bison:

<pre>
require 'formula'

class Bison < Formula
  url 'http://mirrors.xmission.com/gnu/bison/bison-2.5.tar.gz'
  homepage 'http://www.gnu.org/software/bison/manual/'
  md5 '687e1dcd29452789d34eaeea4c25abe4'
  version '2.5'

  def install
    system "./configure", "--disable-debug", "--disable-dependency-tracking",
                          "--prefix=#{prefix}"
    system "make install"
  end

  def test
    system "bison --version"
  end
end
</pre>

flex:

<pre>
require 'formula'

class Flex < Formula
  url 'http://sourceforge.net/projects/flex/files/flex/flex-2.5.35/flex-2.5.35.tar.gz'
  homepage 'http://flex.sourceforge.net'
  md5 '201d3f38758d95436cbc64903386de0b'
  version '2.5.35'

  def install
    system "./configure", "--disable-debug", "--disable-dependency-tracking",
                          "--prefix=#{prefix}", "--mandir=#{man}", "--infodir=#{info}"
    system "make install"
  end

  def test
    system "flex --version"
  end
end
</pre>

gnu-regex:

<pre>
require 'formula'

class GnuRegex < Formula
  homepage 'http://ftp.gnu.org/old-gnu/regex/'
  url 'http://ftp.gnu.org/old-gnu/regex/regex-0.12.tar.gz'
  sha256 'f36e2d8d56bf15054a850128fcb2f51807706a92d3bb4b37ceadd731535ce230'

  def install
    system "./configure"
    system "make subdirs=test all"
    system "mkdir -p #{prefix}/lib"
    system "libtool -lSystem -dynamic -install_name #{prefix}/lib/libgnuregex.dylib -o #{prefix}/lib/libgnuregex.dylib regex.o"
    system "mkdir -p #{prefix}/include"
    system "cp regex.h #{prefix}/include/gnuregex.h"
  end
end
</pre>

To install these formulas download them to rb files for instance flex.rb, bison.rb, and gnu-regex.rb and then use brew to install them by running:

<pre>
brew install flex.rb
brew install bison.rb
brew install gnu-regex.rb
</pre>

Haiku looks for gnu-regex.dylib in /opt/local/lib which is where MacPorts installs the file, but, homebrew installs it in /usr/local/lib/libgnuregex.dylib. No problem just create a symlink like this:

<pre>
sudo mkdir /opt
sudo mkdir /opt/local
sudo mkdir /opt/local/lib
sudo ln -s /usr/local/lib/libgnuregex.dylib /opt/local/lib/libgnuregex.dylib
</pre>

Haiku also looks for gnuregex.h in /opt/local/include/gnuregex.h so make another symlink like this:

<pre>
sudo mkdir /opt/local/include
sudo ln -s /usr/local/include/gnuregex.h /opt/local/include/gnuregex.h
</pre>

Once you've done this, you should be able to build the buildtools, install jam, and finally build Haiku!