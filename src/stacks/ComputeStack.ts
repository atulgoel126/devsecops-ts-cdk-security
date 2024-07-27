import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import {SecureEC2Instance} from "../constructs/compute/SecureEC2Instance";

interface ComputeStackProps extends cdk.StackProps {
    vpc: ec2.IVpc;
}

export class ComputeStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: ComputeStackProps) {
        super(scope, id, props);
        new SecureEC2Instance(this, 'SecureEC2Instance', props.vpc);
    }
}