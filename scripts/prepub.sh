#!/usr/bin/env bash

set -e

rm -rf lib dist

babel src --presets babel-preset-es2015 --out-dir lib

mkdir -p dist/styles
lessc -ru src/x/xui.less > dist/xui.css
cp -r src/x/styles/img dist/styles
