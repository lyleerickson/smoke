#!/usr/bin/env bash
aws lambda invoke --function-name createBlend --payload file://infile outfile
cat outfile
echo ""
rm outfile
