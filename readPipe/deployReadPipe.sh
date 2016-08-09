#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr readPipe.zip *
aws lambda update-function-code --function-name readPipe --zip-file fileb://readPipe.zip
rm -R node_modules
rm db_fxns.js
rm readPipe.zip
