cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr updateP.zip *
aws lambda update-function-code --function-name updatePipe --zip-file fileb://updateP.zip
rm -R node_modules
rm db_fxns.js
rm updateP.zip
