#!/usr/bin/env bash
aws lambda invoke --function-name updateCleaning --payload file://infile outfile
cat outfile
echo ""
rm outfile
