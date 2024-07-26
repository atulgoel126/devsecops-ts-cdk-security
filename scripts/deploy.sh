#!/bin/bash

# Change to the project root directory
cd "$(dirname "$0")/.." || exit

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    color=$1
    message=$2
    echo -e "${color}${message}${NC}"
}

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    print_color $RED "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if CDK is installed
if ! command -v cdk &> /dev/null; then
    print_color $RED "AWS CDK is not installed. Please install it first."
    exit 1
fi

# Synthesize the CloudFormation template
print_color $YELLOW "Synthesizing CloudFormation template..."
cdk synth > cdk_synth_output.yaml

# Check if synthesis was successful
if [ $? -ne 0 ]; then
    print_color $RED "CDK synthesis failed. Please check your code and try again."
    exit 1
fi

print_color $GREEN "Synthesis completed. Output saved to cdk_synth_output.yaml"

# Ask user if they want to review the synthesized template
read -p "Do you want to review the synthesized template? (y/n) " review_choice
if [[ $review_choice == "y" || $review_choice == "Y" ]]; then
    less cdk_synth_output.yaml
fi

# Ask user if they want to deploy
read -p "Do you want to deploy the stacks? (y/n) " deploy_choice
if [[ $deploy_choice == "y" || $deploy_choice == "Y" ]]; then
    print_color $YELLOW "Deploying stacks..."
    cdk deploy --all --require-approval never

    if [ $? -ne 0 ]; then
        print_color $RED "Deployment failed. Please check the error messages above."
        exit 1
    fi

    print_color $GREEN "Deployment completed successfully."
else
    print_color $YELLOW "Deployment skipped."
fi

# Clean up
rm cdk_synth_output.yaml

print_color $GREEN "Script execution completed."