cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr updateCleaning.zip *
aws lambda update-function-code --function-name updateCleaning --zip-file fileb://updateCleaning.zip
rm -R node_modules
rm db_fxns.js
rm updateCleaning.zip
