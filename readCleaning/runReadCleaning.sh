CMD="aws lambda invoke --function-name readCleaning --payload '{\"cleaningID\": \"$1\"}' outfile"
eval $CMD
cat outfile
echo ""
rm outfile
