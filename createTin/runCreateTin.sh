#!/usr/bin/env bash
aws lambda invoke --function-name createTin --payload file://infile outfile
cat outfile
echo ""
rm outfile
