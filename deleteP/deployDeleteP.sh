rm -R node_modules
cp -r ../node_modules .
zip -qr deleteP.zip *
aws lambda update-function-code --function-name deleteP --zip-file fileb://deleteP.zip
