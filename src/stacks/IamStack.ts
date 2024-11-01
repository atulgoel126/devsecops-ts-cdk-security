import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class IamStack extends cdk.Stack {
    public readonly ec2Role: iam.Role;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create EC2 role with the least privilege
        this.ec2Role = new iam.Role(this, 'EC2LeastPrivilegeRole', {
            assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
            description: 'Least privilege role for EC2 instances',
        });

        // Add minimal required permissions
        this.ec2Role.addToPolicy(new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: [
                'ec2:DescribeTags',
                'ec2:DescribeInstances',
                'cloudwatch:PutMetricData'
            ],
            resources: ['*'],
        }));

        // Export the role ARN
        new cdk.CfnOutput(this, 'EC2RoleArn', {
            value: this.ec2Role.roleArn,
            description: 'ARN of the EC2 least privilege role',
            exportName: 'EC2LeastPrivilegeRoleArn',
        });
    }
}