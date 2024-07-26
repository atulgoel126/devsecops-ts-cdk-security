import * as cdk from 'aws-cdk-lib';
import { StorageStack } from '../stacks/StorageStack';
import { ComputeStack } from '../stacks/ComputeStack';
import { NetworkStack } from '../stacks/NetworkStack';

const app = new cdk.App();

const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT || process.env.AWS_ACCOUNT_ID,
    region: process.env.CDK_DEFAULT_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1'
};

if (!env.account || !env.region) {
    throw new Error('Please specify both CDK_DEFAULT_ACCOUNT and CDK_DEFAULT_REGION (or AWS_ACCOUNT_ID and AWS_DEFAULT_REGION)');
}

const networkStack = new NetworkStack(app, 'NetworkStack', { env });
new StorageStack(app, 'StorageStack', { env });
new ComputeStack(app, 'ComputeStack', {
    env,
    vpc: networkStack.vpc
});

app.synth();