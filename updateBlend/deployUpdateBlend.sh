#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr updateBlend.zip *
aws lambda update-function-code --function-name updateBlend --zip-file fileb://updateBlend.zip
rm -R node_modules
rm db_fxns.js
rm updateBlend.zip
