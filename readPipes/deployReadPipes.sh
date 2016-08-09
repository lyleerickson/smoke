#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr readPipes.zip *
aws lambda update-function-code --function-name readPipes --zip-file fileb://readPipes.zip
rm -R node_modules
rm db_fxns.js
rm readPipes.zip
