cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr readCleanings.zip *
aws lambda update-function-code --function-name readCleanings --zip-file fileb://readCleanings.zip
rm -R node_modules
rm db_fxns.js
rm readCleanings.zip
