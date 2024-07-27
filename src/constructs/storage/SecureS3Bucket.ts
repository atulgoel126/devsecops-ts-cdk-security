import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class SecureS3Bucket extends Construct {
    public readonly bucket: s3.Bucket;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.bucket = new s3.Bucket(this, 'SecureBucket', {
            versioned: true,
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            serverAccessLogsBucket: this.createAccessLogBucket('AccessLogsBucket'),
            serverAccessLogsPrefix: 'access-logs/',
        });
    }

    createAccessLogBucket(id: string) {
        const bucket = new s3.Bucket(this, 'AccessLogBucket', {
            versioned: true,
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        })

        const cfnBucket = bucket.node.defaultChild as s3.CfnBucket;
        cfnBucket.cfnOptions.metadata = {
            'checkov': {
                'skip': [
                    {
                        'id': 'CKV_AWS_18',
                        'comment': 'Ensure the S3 bucket has access logging enabled'
                    }
                ]
            }
        }

        return bucket;
    }
}