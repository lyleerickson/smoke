#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr readBlend.zip *
aws lambda update-function-code --function-name readBlend --zip-file fileb://readBlend.zip
rm -R node_modules
rm db_fxns.js
rm readBlend.zip
