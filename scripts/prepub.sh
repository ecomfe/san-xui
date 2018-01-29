#!/usr/bin/env bash

set -e

rm -rf lib dist es

babel src --presets babel-preset-es2015 --out-dir lib

# cp -r src es
# find es -name '*.es6' -exec sh -c 'mv "$0" "${0%.es6}.js"' {} \;

mkdir -p dist
lessc -ru src/x/xui.less > dist/xui.css
