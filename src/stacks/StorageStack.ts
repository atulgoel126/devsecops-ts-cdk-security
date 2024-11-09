import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SecureS3Bucket } from '../constructs/storage/SecureS3Bucket';
import {CompliantStorage} from "../constructs/storage/compliant-storage";

export class StorageStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new SecureS3Bucket(this, 'SecureS3Bucket');
    new CompliantStorage(this, 'CompliantS3Bucket')
  }
}