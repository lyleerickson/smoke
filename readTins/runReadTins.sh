#!/usr/bin/env bash
echo "just for 2016-08-09T22:38:52.701Z"
CMD="aws lambda invoke --function-name readTins --payload '{\"blendID\": \"2016-08-09T22:38:52.701Z\"}' outfile"
eval $CMD
cat outfile
echo ""
rm outfile
echo "all tins"
CMD="aws lambda invoke --function-name readTins --payload '{}' outfile"
eval $CMD
cat outfile
echo ""
rm outfile
