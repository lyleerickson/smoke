#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
cp ../getstyletotals.js .
cp ../getagetotals.js .
zip -qr readCellar.zip *
aws lambda update-function-code --function-name readCellar --zip-file fileb://readCellar.zip
rm -R node_modules
rm db_fxns.js
rm getstyletotals.js
rm getagetotals.js
rm readCellar.zip
