#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr updateTin.zip *
aws lambda update-function-code --function-name updateTin --zip-file fileb://updateTin.zip
rm -R node_modules
rm db_fxns.js
rm updateTin.zip
