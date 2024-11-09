import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as kms from 'aws-cdk-lib/aws-kms';
import { Construct } from "constructs";

export interface CompliantStorageProps {
    bucketName?: string;
    logRetention?: number;
}

export class CompliantStorage extends Construct {
    public readonly bucket: s3.Bucket;
    public readonly key: kms.Key;

    constructor(scope: Construct, id: string, props?: CompliantStorageProps) {
        super(scope, id);

        // Create KMS key for encryption
        this.key = new kms.Key(this, 'EncryptionKey', {
            enableKeyRotation: true,
            removalPolicy: cdk.RemovalPolicy.RETAIN,
            description: 'KMS key for compliant storage encryption'
        });

        // Create compliant S3 bucket
        this.bucket = new s3.Bucket(this, 'CompliantBucket', {
            bucketName: props?.bucketName,
            encryption: s3.BucketEncryption.KMS,
            encryptionKey: this.key,
            enforceSSL: true,
            versioned: true,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            serverAccessLogsBucket: new s3.Bucket(this, 'AccessLogs', {
                encryption: s3.BucketEncryption.KMS,
                encryptionKey: this.key,
                removalPolicy: cdk.RemovalPolicy.RETAIN,
                autoDeleteObjects: false,
            }),
            removalPolicy: cdk.RemovalPolicy.RETAIN,
        });
    }
}
