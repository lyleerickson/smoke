#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
cp ../https_fxns.js .
zip -qr createCleaning.zip *
aws lambda update-function-code --function-name createCleaning --zip-file fileb://createCleaning.zip
rm -R node_modules
rm db_fxns.js
rm https_fxns.js
rm createCleaning.zip
