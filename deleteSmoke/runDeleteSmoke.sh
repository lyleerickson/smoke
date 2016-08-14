#!/usr/bin/env bash
CMD="aws lambda invoke --function-name deleteSmoke --payload '{\"id\": \"$1\"}' outfile"
eval $CMD
cat outfile
echo ""
rm outfile
