#!/usr/bin/env bash
aws lambda invoke --function-name updateTin --payload file://infile outfile
cat outfile
echo ""
rm outfile
