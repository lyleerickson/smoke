CMD="aws lambda invoke --function-name deleteP --payload '{\"id\": \"$1\"}' outfile"
eval $CMD
cat outfile
echo ""
rm outfile
