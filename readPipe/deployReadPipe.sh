rm -R node_modules
cp -r ../node_modules .
zip -qr readPipe.zip *
aws lambda update-function-code --function-name readPipe --zip-file fileb://readPipe.zip
