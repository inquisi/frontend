#!/bin/bash

# only execute this script if the master branch is checked out
if git branch | grep "* master" then
	git checkout prod
	git add -A
	git commit -am "$TRAVIS_COMMIT"
	git push origin/prod
fi