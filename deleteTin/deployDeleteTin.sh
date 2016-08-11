#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr deleteTin.zip *
aws lambda update-function-code --function-name deleteTin --zip-file fileb://deleteTin.zip
rm -R node_modules
rm db_fxns.js
rm deleteTin.zip
