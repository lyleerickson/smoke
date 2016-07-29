zip -qr getID.zip *
aws lambda update-function-code --function-name getID --zip-file fileb://getID.zip
rm getID.zip
