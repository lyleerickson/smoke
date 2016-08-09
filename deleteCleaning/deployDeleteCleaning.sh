#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr deleteCleaning.zip *
aws lambda update-function-code --function-name deleteCleaning --zip-file fileb://deleteCleaning.zip
rm -R node_modules
rm db_fxns.js
rm deleteCleaning.zip
