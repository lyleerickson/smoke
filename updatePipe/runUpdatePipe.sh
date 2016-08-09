aws lambda invoke --function-name updatePipe --payload file://infile outfile
cat outfile
echo ""
rm outfile
