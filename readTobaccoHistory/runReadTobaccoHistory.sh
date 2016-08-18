#!/usr/bin/env bash
CMD="aws lambda invoke --function-name readTobaccoHistory --payload '{}' outfile"
eval $CMD
cat outfile
echo ""
rm outfile
