#!/bin/bash

IMAGE_NAME=$1
TAR_NAME="${IMAGE_NAME//[:\/]/_}.tar"

echo "Saving image $IMAGE_NAME to $TAR_NAME..."
docker save $IMAGE_NAME > $TAR_NAME

echo "Scanning $TAR_NAME with Trivy..."
trivy image --input $TAR_NAME

echo "Cleaning up..."
rm $TAR_NAME

echo "Scan complete."