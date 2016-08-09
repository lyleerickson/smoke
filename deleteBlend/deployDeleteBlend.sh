#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr deleteBlend.zip *
aws lambda update-function-code --function-name deleteBlend --zip-file fileb://deleteBlend.zip
rm -R node_modules
rm db_fxns.js
rm deleteBlend.zip
