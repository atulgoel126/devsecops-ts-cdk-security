import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class SecureEC2Instance extends Construct {
    public readonly instance: ec2.Instance;

    constructor(scope: Construct, id: string, vpc: ec2.IVpc) {
        super(scope, id);

        this.instance = new ec2.Instance(this, 'SecureInstance', {
            vpc,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
            machineImage: new ec2.AmazonLinuxImage(),
        });
    }
}