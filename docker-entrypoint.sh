#!/bin/bash
set -e

# Print the Node.js version
echo "Node.js version: $(node --version)"
echo "NPM version: $(npm --version)"

# Print the current working directory
echo "Current working directory: $(pwd)"

# List the contents of the current directory
echo "Contents of the current directory:"
ls -la

# Print the CDK version
echo "CDK version: $(cdk --version)"

# If a command is passed to the container, execute it
if [ "$1" ]; then
    exec "$@"
else
    # Otherwise, start an interactive bash session
    exec /bin/bash
fi