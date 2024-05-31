#!/usr/bin/env sh

set -env

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:TimoW75/DynamicWeb.git master:gh-pages

cd -