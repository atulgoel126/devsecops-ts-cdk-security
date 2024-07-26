import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { StorageStack } from '../src/stacks/StorageStack';

test('S3 Bucket Created', () => {
  const app = new cdk.App();
  const stack = new StorageStack(app, 'TestStorageStack');
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::S3::Bucket', {
    VersioningConfiguration: {
      Status: 'Enabled'
    }
  });
});