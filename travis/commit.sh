#! /usr/bin/env sh

git checkout -b prod
gulp buildProd
git add -f app/app.js
git add -f app/app.css
git commit --allow-empty-message -am ''