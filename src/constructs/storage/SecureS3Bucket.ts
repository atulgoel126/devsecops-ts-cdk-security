import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class SecureS3Bucket extends Construct {
    public readonly bucket: s3.Bucket;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.bucket = new s3.Bucket(this, 'SecureBucket', {
            encryption: s3.BucketEncryption.S3_MANAGED,
            versioned: true,
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        });
    }
}