#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr readSmoke.zip *
aws lambda update-function-code --function-name readSmoke --zip-file fileb://readSmoke.zip
rm -R node_modules
rm db_fxns.js
rm readSmoke.zip
