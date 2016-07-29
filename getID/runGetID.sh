aws lambda invoke --function-name getID --payload '{}' outfile
cat outfile
echo ""
rm outfile
