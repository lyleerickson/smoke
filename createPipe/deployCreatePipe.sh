cp -r ../node_modules .
cp ../db_fxns.js .
cp ../https_fxns.js .
zip -qr createPipe.zip *
aws lambda update-function-code --function-name createPipe --zip-file fileb://createPipe.zip
rm -R node_modules
rm db_fxns.js
rm https_fxns.js
rm createPipe.zip
