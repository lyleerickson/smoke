#!/usr/bin/env bash
aws s3 cp /Users/le25273/bench/smoke/ui s3://smoke.catbitten/ --recursive --exclude "*" --include "*.js" --include "*.html" --include "*.css"

