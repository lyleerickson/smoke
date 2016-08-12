#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr readSmokes.zip *
aws lambda update-function-code --function-name readSmokes --zip-file fileb://readSmokes.zip
rm -R node_modules
rm db_fxns.js
rm readSmokes.zip
