#!/bin/bash

IMAGE_NAME=$1
TAR_NAME="${IMAGE_NAME//[:\/]/_}.tar"

echo "Saving image $IMAGE_NAME to $TAR_NAME..."
docker save $IMAGE_NAME > $TAR_NAME

echo "Scanning $TAR_NAME with Trivy..."
trivy image --exit-code 1 --severity HIGH,CRITICAL --no-progress --input $TAR_NAME

SCAN_EXIT_CODE=$?

echo "Cleaning up..."
rm $TAR_NAME

if [ $SCAN_EXIT_CODE -ne 0 ]; then
    echo "Vulnerabilities found. Commit rejected."
    exit 1
else
    echo "No vulnerabilities found. Commit allowed."
    exit 0
fi