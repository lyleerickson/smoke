CMD="aws lambda invoke --function-name getP --payload '{\"id\": \"$1\"}' outfile"
eval $CMD
cat outfile
echo ""
