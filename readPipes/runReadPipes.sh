#!/usr/bin/env bash
CMD="aws lambda invoke --function-name readPipes --payload '{\"pipeid\": \"$1\"}' outfile"
eval $CMD
cat outfile
echo ""
rm outfile
