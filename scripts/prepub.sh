#!/usr/bin/env bash

set -e

rm -rf lib dist es

babel src --out-dir lib --no-babelrc --presets=es2015 --plugins=transform-object-rest-spread

# cp -r src es
# find es -name '*.es6' -exec sh -c 'mv "$0" "${0%.es6}.js"' {} \;

mkdir -p dist
lessc -ru src/x/xui.less > dist/xui.css
