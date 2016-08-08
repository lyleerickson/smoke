cp -r ../node_modules .
cp ../db_fxns.js .
zip -qr deleteP.zip *
aws lambda update-function-code --function-name deletePipe --zip-file fileb://deleteP.zip
rm -R node_modules
rm db_fxns.js
rm deleteP.zip
