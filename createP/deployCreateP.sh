rm -R node_modules
cp -r ../node_modules .
zip -qr createP.zip *
aws lambda update-function-code --function-name createP --zip-file fileb://createP.zip
