#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr readTins.zip *
aws lambda update-function-code --function-name readTins --zip-file fileb://readTins.zip
rm -R node_modules
rm db_fxns.js
rm readTins.zip
