#!/usr/bin/env bash
aws lambda invoke --function-name createSmoke --payload file://infile outfile
cat outfile
echo ""
rm outfile
