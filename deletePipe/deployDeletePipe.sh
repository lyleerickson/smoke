#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr deletePipe.zip *
aws lambda update-function-code --function-name deletePipe --zip-file fileb://deletePipe.zip
rm -R node_modules
rm db_fxns.js
rm deletePipe.zip
