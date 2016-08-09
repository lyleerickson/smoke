#!/usr/bin/env bash
CMD="aws lambda invoke --function-name readBlend --payload '{\"blendID\": \"$1\"}' outfile"
eval $CMD
cat outfile
echo ""
rm outfile
