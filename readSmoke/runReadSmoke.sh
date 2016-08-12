#!/usr/bin/env bash
CMD="aws lambda invoke --function-name readSmoke --payload '{\"id\": \"$1\"}' outfile"
eval $CMD
cat outfile
echo ""
rm outfile
