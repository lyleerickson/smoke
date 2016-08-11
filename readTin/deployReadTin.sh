#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr readTin.zip *
aws lambda update-function-code --function-name readTin --zip-file fileb://readTin.zip
rm -R node_modules
rm db_fxns.js
rm readTin.zip
