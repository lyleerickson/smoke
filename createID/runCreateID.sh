#!/usr/bin/env bash
aws lambda invoke --function-name createID --payload '{}' outfile
cat outfile
echo ""
rm outfile
