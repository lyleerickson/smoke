rm -R node_modules
cp -r ../node_modules .
zip -qr getP.zip *
aws lambda update-function-code --function-name getP --zip-file fileb://getP.zip
