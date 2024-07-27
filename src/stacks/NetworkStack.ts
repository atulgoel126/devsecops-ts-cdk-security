import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import {SecureVPC} from "../constructs/network/SecureVPC";

export class NetworkStack extends cdk.Stack {
    public readonly vpc: ec2.Vpc;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        const secureVpc = new SecureVPC(this, 'SecureVPC');
        this.vpc = secureVpc.vpc;
    }
}