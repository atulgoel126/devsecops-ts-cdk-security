import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

interface ComputeStackProps extends cdk.StackProps {
    vpc: ec2.IVpc;
}

export class ComputeStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: ComputeStackProps) {
        super(scope, id, props);

        new ec2.Instance(this, 'MyInstance', {
            vpc: props.vpc,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
            machineImage: new ec2.AmazonLinuxImage(),
        });
    }
}