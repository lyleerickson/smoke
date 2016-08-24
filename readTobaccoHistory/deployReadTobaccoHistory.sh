#!/usr/bin/env bash
cp -r ../node_modules .
cp ../db_fxns.js .
cp ../getstyletotals.js .
zip -qr readTobaccoHistory.zip *
aws lambda update-function-code --function-name readTobaccoHistory --zip-file fileb://readTobaccoHistory.zip
rm -R node_modules
rm db_fxns.js
rm getstyletotals.js
rm readTobaccoHistory.zip