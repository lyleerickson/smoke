aws lambda invoke --function-name createCleaning --payload file://infile outfile
cat outfile
echo ""
rm outfile
