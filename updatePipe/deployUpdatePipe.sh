#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr updatePipe.zip *
aws lambda update-function-code --function-name updatePipe --zip-file fileb://updatePipe.zip
rm -R node_modules
rm db_fxns.js
rm updatePipe.zip
