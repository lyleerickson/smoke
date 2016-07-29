CMD="aws lambda invoke --function-name readPipe --payload '{\"pipeid\": \"$1\"}' outfile"
eval $CMD
cat outfile
echo ""
rm outfile
