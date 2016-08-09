#!/usr/bin/env bash
zip -qr createID.zip *
aws lambda update-function-code --function-name createID --zip-file fileb://createID.zip
rm createID.zip
