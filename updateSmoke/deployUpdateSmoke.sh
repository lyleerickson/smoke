#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr updateSmoke.zip *
aws lambda update-function-code --function-name updateSmoke --zip-file fileb://updateSmoke.zip
rm -R node_modules
rm db_fxns.js
rm updateSmoke.zip
