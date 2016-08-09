#!/usr/bin/env bash
aws lambda invoke --function-name updateBlend --payload file://infile outfile
cat outfile
echo ""
rm outfile
