#!/bin/bash

# Exit on error
set -e

echo "Synthesizing CloudFormation templates..."
npm run cdk-synth

echo "Running cfn-nag scans..."

# Scan all CloudFormation templates
for template in cdk.out/*.template.json; do
    echo "Scanning $template..."
    cfn_nag_scan --input-path "$template" --blacklist-path .cfn-nag-blacklist.yml || exit 1
done

echo "All compliance checks completed successfully!"