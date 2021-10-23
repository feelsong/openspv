#!/bin/zsh

# tool to update all external open source repos that we control from source
# code contained inside the master repo. for now, this means just the OpenSPV
# project.

# make sure we are in the coasian source directory
dir=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
cd $dir

# get all open-source repos ("subtree" - currently only OpenSPV)
git subtree pull --prefix=open-source/openspv openspv master

# delete all non-hidden files in OpenSPV
cd $dir/open-source/openspv
rm -rf ./projects/*

# copy all files from the latest version on npm
curl `npm view "@openspv/lib" dist.tarball` > openspv-lib.tgz
tar -xzf openspv-lib.tgz
mv package/* ./projects/openspv-lib
mv package/.* ./projects/openspv-lib
rmdir package
rm openspv-lib.tgz

# update on github
version=`npm view openspv version`
git add .
git commit -m "$version"
cd $dir
git subtree push --prefix=open-source/openspv openspv master
