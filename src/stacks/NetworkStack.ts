import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { SecureVPC } from "../constructs/network/SecureVPC";

export class NetworkStack extends cdk.Stack {
    public readonly vpc: ec2.Vpc;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        const secureVpc = new SecureVPC(this, 'SecureVPC');
        this.vpc = secureVpc.vpc;

        // Apply Checkov skip metadata to the VpcRestrictDefaultSGCustomResourceProvider
        this.applyCheckovSkipMetadata();
    }

    private applyCheckovSkipMetadata() {
        this.node.findAll().forEach(construct => {
            if (construct.node.path.includes('VpcRestrictDefaultSGCustomResourceProvider')) {
                if (!construct.node.children.length) {
                    return;
                }
                // Find the Lambda function within this construct
                const lambdaFunctionChild = construct.node.findChild('Handler') ;
                if (!lambdaFunctionChild) {
                    return;
                }
                const lambdaFunction = lambdaFunctionChild as lambda.CfnFunction
                if (lambdaFunction && lambdaFunction.addMetadata) {
                    lambdaFunction.addMetadata('checkov', {
                        skip: [
                            {
                                id: 'CKV_AWS_117',
                                comment: 'Lambda function is used internally by CDK to manage VPC default security group'
                            },
                            {
                                id: 'CKV_AWS_116',
                                comment: 'Lambda function is used internally by CDK to manage VPC default security group'
                            },
                            {
                                id: 'CKV_AWS_115',
                                comment: 'Lambda function is used internally by CDK to manage VPC default security group'
                            }
                        ]
                    });
                    console.log("Metadata added to Lambda function");
                } else {
                    console.log("Lambda function not found or doesn't support addMetadata");
                }
            }
        });
    }
}