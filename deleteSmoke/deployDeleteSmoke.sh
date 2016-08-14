#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr deleteSmoke.zip *
aws lambda update-function-code --function-name deleteSmoke --zip-file fileb://deleteSmoke.zip
rm -R node_modules
rm db_fxns.js
rm deleteSmoke.zip
