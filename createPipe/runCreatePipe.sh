aws lambda invoke --function-name createPipe --payload file://infile outfile
cat outfile
echo ""
rm outfile