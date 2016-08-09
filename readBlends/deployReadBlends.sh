#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr readBlends.zip *
aws lambda update-function-code --function-name readBlends --zip-file fileb://readBlends.zip
rm -R node_modules
rm db_fxns.js
rm readBlends.zip
