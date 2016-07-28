rm -R node_modules
cp -r ../node_modules .
zip -qr updateP.zip *
aws lambda update-function-code --function-name updateP --zip-file fileb://updateP.zip
