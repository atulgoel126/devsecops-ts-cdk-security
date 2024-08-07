#!/bin/bash

IMAGE_NAME=$1

echo "Scanning $IMAGE_NAME for vulnerabilities..."

sudo trivy image --format json $IMAGE_NAME > scan_results.json

echo "Total vulnerabilities found:"
jq '.Results[].Vulnerabilities | length' scan_results.json | awk '{sum += $1} END {print sum}'

echo "Vulnerabilities by severity:"
jq '.Results[].Vulnerabilities[].Severity' scan_results.json | sort | uniq -c | sort -nr

echo "Top 10 most common vulnerabilities:"
jq -r '.Results[].Vulnerabilities[] | "\(.VulnerabilityID) (\(.Severity))"' scan_results.json | sort | uniq -c | sort -nr | head -n 10

echo "For detailed results, check scan_results.json"