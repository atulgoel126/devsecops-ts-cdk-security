import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import {IRole} from "aws-cdk-lib/aws-iam";

interface SecureEC2InstanceProps {
    vpc: ec2.IVpc;
    role?: IRole;
}

export class SecureEC2Instance extends Construct {
    public readonly instance: ec2.Instance;

    constructor(scope: Construct, id: string, props: SecureEC2InstanceProps) {
        super(scope, id);

        this.instance = new ec2.Instance(this, 'SecureInstance', {
            vpc: props.vpc,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
            machineImage: new ec2.AmazonLinuxImage(),
            role: props.role, // Use the provided role or let CDK create a default one
        });
    }
}