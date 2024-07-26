export class SecurityHelper {
    public static getSecureS3BucketName(stackName: string, bucketName: string): string {
        return `${stackName.toLowerCase()}-${bucketName.toLowerCase()}-${Date.now()}`;
    }

    public static getEC2SecurityGroupName(stackName: string): string {
        return `${stackName.toLowerCase()}-ec2-sg`;
    }
}