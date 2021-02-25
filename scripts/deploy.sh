#!/usr/bin/env bash

yarn build &&
cd build &&
git init &&
git add . &&
git commit -m 'deploy' &&
git branch -M main &&
#git remote add origin git@github.com:Amayw/tallybookwiredwebsite.git &&
git remote add origin git@gitee.com:wen_yue_wang/tallybookwiredwebsite.git &&
git push -u origin main -f &&
cd -
