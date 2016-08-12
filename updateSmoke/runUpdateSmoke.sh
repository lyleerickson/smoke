#!/usr/bin/env bash
aws lambda invoke --function-name updateSmoke --payload file://infile outfile
cat outfile
echo ""
rm outfile
