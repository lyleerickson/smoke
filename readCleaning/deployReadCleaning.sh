cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr readCleaning.zip *
aws lambda update-function-code --function-name readCleaning --zip-file fileb://readCleaning.zip
rm -R node_modules
rm db_fxns.js
rm readCleaning.zip
