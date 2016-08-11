#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
cp ../https_fxns.js .
zip -qr createTin.zip *
aws lambda update-function-code --function-name createTin --zip-file fileb://createTin.zip
rm -R node_modules
rm db_fxns.js
rm https_fxns.js
rm createTin.zip
