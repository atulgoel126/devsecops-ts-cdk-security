#!/bin/bash

IMAGE_NAME=$1
SEVERITY=${2:-HIGH,CRITICAL}

echo "Scanning $IMAGE_NAME for $SEVERITY vulnerabilities..."

sudo trivy image --severity $SEVERITY --exit-code 1 --no-progress $IMAGE_NAME

if [ $? -eq 1 ]; then
    echo "Vulnerabilities found. Check the scan results above."
    exit 1
else
    echo "No vulnerabilities found."
    exit 0
fi