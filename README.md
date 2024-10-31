# DevSecOps with TypeScript and AWS CDK

This repository documents my journey in learning and implementing DevSecOps practices, focusing on Infrastructure as Code (IaC) security using TypeScript and AWS CDK.

## Project Overview

The goal of this project is to explore and implement security best practices in Infrastructure as Code, specifically using AWS CDK with TypeScript. This includes learning to use security scanning tools like Checkov, implementing secure patterns in AWS CDK, and creating custom constructs that encapsulate security best practices.

## Weekly Progress

### Week 1: Infrastructure as Code (IaC) Security with TypeScript and AWS CDK

#### Day 1-2: AWS CDK and TypeScript Fundamentals
- ✅ Set up development environment
    - ✅ Install Node.js and npm
    - ✅ Install AWS CDK CLI
    - ✅ Configure AWS CLI with your credentials
- ✅ Study AWS CDK basics
    - ✅ Complete the AWS CDK Workshop for TypeScript
    - ✅ Understand CDK constructs, stacks, and apps
- ✅ Create a basic CDK project
    - ✅ Initialize a new CDK project with TypeScript
    - ✅ Implement a simple stack (e.g., S3 bucket and EC2 instance)
    - ✅ Deploy the stack to your AWS account

#### Day 3-4: Introduction to IaC Security and Checkov
- ✅ Study IaC security concepts
    - ✅ Read about common IaC security misconfigurations
    - ✅ Understand the importance of IaC security scanning
- ✅ Set up Checkov
    - ✅ Install Checkov
    - ✅ Run Checkov on your basic CDK project
    - ✅ Analyze and understand Checkov output
- ✅ Address security issues
    - ✅ Fix identified security misconfigurations in your CDK code
    - ✅ Re-run Checkov to verify fixes

#### Day 5-6: Implement Security Best Practices in AWS CDK
- ✅ Study AWS CDK security best practices
    - ✅ Read AWS CDK Best Practices documentation
    - ✅ Understand principle of least privilege in IaC
- [ ] Implement secure patterns
    - [ ] Use CDK's high-level constructs for built-in security features
    - ✅ Implement IAM roles with least privilege
    - [ ] Enable encryption for data at rest and in transit
- [ ] Explore CDK Aspects
    - [ ] Understand how CDK Aspects work
    - [ ] Implement a custom Aspect for security checks

#### Day 7: Mini-project and CI/CD Integration
- ✅ Choose an existing AWS CDK TypeScript example
    - ✅ Fork the repository
    - ✅ Analyze the existing security posture
- ✅ Improve the example's security
    - ✅ Run Checkov and address findings
    - ✅ Implement additional security measures
- ✅ Set up a CI/CD pipeline
    - ✅ Configure GitHub Actions or GitLab CI
    - ✅ Integrate Checkov into the CI/CD process
    - ✅ Implement automated deployment with security checks

#### Key Learnings Week 1
- `cdk init` cannot be run in a non-empty directory. Since I had already created the README.md and .gitignore, I had to
create a new sub-folder, do a `cdk init` and then copy the files manually. Not ideal, but a one time thing.
- Do not use the root account for day to day activities. Amazon recommends you create an AWS account with an email address,
and put the email and password in safe somewhere and forget it. Create a new user, and everything should be done by this user.
- Don't take checkov as the source of truth. Read each error and decide yourself if it's a major concern for your use case.
- Fixed Checkov error for an external repo: https://github.com/tchangkiat/aws-cdk-stacks/pull/7
- Coordinated for Checkov errors - https://github.com/david-blg/api-crud-serverless-cdk/pull/19
- Github has separate Env Secrets and Vars. These are also completely environment specific.

#### Resources Week 1
- [AWS CDK TypeScript Workshop](https://cdkworkshop.com/20-typescript.html)
- [AWS CDK API Reference](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-construct-library.html)
- [Checkov Documentation](https://www.checkov.io/1.Welcome/Quick%20Start.html)
- [AWS CDK Best Practices](https://docs.aws.amazon.com/cdk/latest/guide/best-practices.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Week 2: Container Security and CI/CD Pipeline Integration

#### Day 1-2: Docker Fundamentals and Security
- ✅ Set up Docker environment
    - ✅ Install Docker Desktop
    - ✅ Understand Docker architecture
- ✅ Study Docker security concepts
    - ✅ Read Docker security documentation
    - ✅ Understand container isolation and resource constraints
- ✅ Create a secure Dockerfile
    - ✅ Use official base images
    - ✅ Implement multi-stage builds
    - ✅ Run containers as non-root user
- ✅ Implement Docker best practices
    - ✅ Use .dockerignore files
    - ✅ Minimize the number of layers
    - ✅ Implement health checks

#### Day 3-4: Container Vulnerability Scanning
- ✅ Set up Trivy
    - ✅ Install Trivy
    - ✅ Understand Trivy's scanning capabilities
- ✅ Scan Docker images
    - ✅ Run Trivy against your custom images
    - ✅ Scan base images and understand common vulnerabilities
- ✅ Analyze and mitigate vulnerabilities
    - ✅ Interpret Trivy scan results
    - ✅ Update base images and dependencies
    - ✅ Implement vulnerability patching strategies
- ✅ Automate container scanning
    - ✅ Create a script for automated Trivy scans
    - ✅ Implement pre-commit hooks for local scans

#### Day 5-6: CI/CD Pipeline for Container Deployments
- ❌ Set up GitLab CI/CD for container projects
    - ❌ Create .gitlab-ci.yml file
    - ❌ Define stages: build, test, scan, and deploy
- ✅ Implement Docker build in CI/CD
    - ✅ Use Docker-in-Docker or host binding
    - ✅ Optimize Docker build for CI/CD
- ✅ Integrate security scans in CI/CD
    - ✅ Add Trivy scan job in Github CI
    - ✅ Implement policy to fail builds on critical vulnerabilities
- ✅ Set up container registry
    - ✅ Configure Github Container Registry
    - ✅ Implement secure image pushing and pulling

#### Day 7: Advanced Container Security and Monitoring
- ❌ Set up container monitoring
    - ❌ Implement logging strategies for containers
    - ❌ Set up Prometheus for container metrics
    - ❌ Create a basic Grafana dashboard for container health

#### Key Learnings Week 2
- Understanding of Docker fundamentals and container security concepts
- Practical experience in creating secure Dockerfiles and implementing best practices
- Knowledge of container vulnerability scanning using Trivy
- Implementation of a CI/CD pipeline for secure container deployments
- Exposure to advanced container security features and monitoring strategies
- In addition to Trivy, we can also try docker scout. It comes by default and *might* be useful: `docker scout quickview`
- We can also try docker scout for recommendations - ` docker scout recommendations local://my-cdk-app:latest`
- To build the dockerfile, run `docker build -t my-cdk-app:latest .`
- To run the dockerfile -
  ``` 
  docker run -it --rm \
  -v ~/.aws:/home/cdkuser/.aws \
  -v $(pwd):/app \
  my-cdk-app:latest
  ```
- To run any specific cdk command - 
  ```
  docker run -it --rm \
  -v ~/.aws:/home/cdkuser/.aws \
  -v $(pwd):/app \
  my-cdk-app:latest cdk synth --all
  ```
- You can verify the number of layers and image size with:
  ```
  docker history my-cdk-app:latest
  docker images my-cdk-app:latest
  ```

- Use `./scan_docker_image.sh my-cdk-app:latest` to perform a quick scan for HIGH and CRITICAL vulnerabilities.

- Use this image for running checkov - [bridgecrewio/checkov-action](https://github.com/bridgecrewio/checkov-action)

- Use this image for running trivy - [aquasecurity/trivy-action](https://github.com/aquasecurity/trivy-action)

#### Resources Week 2
- [Docker Security Documentation](https://docs.docker.com/engine/security/)
- [Trivy Documentation](https://aquasecurity.github.io/trivy/)
- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [Docker Content Trust](https://docs.docker.com/engine/security/trust/)
- [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/)
- [Grafana Documentation](https://grafana.com/docs/)

### Week 3: Cloud Security and Compliance

#### Day 1-2: AWS Security Services Deep Dive
- ✅ Study AWS GuardDuty
    - ✅ Read AWS GuardDuty documentation
    - ✅ Set up GuardDuty in your AWS account
    - ✅ Analyze sample findings and understand their implications
- ✅ Explore AWS Security Hub
    - ✅ Enable Security Hub in your AWS account
    - ✅ Review the AWS Foundational Security Best Practices standard
    - ✅ Set up custom actions for specific finding types
- ✅ Learn about AWS IAM Access Analyzer
    - ✅ Enable IAM Access Analyzer
    - ✅ Analyze its findings and understand resource exposure

#### Day 3-4: Implementing Least Privilege Access
- [ ] Review current IAM policies in your AWS account
- [ ] Use IAM Access Analyzer to identify overly permissive policies
- [ ] Create custom IAM policies following least privilege principle
    - [ ] For EC2 instances
    - [ ] For Lambda functions
    - [ ] For ECS tasks
- [ ] Implement AWS Organizations Service Control Policies (SCPs)
- [ ] Set up AWS Config to monitor for policy changes

#### Day 5-7: Compliance as Code
- [ ] Study relevant compliance frameworks (e.g., HIPAA, PCI-DSS, GDPR)
- [ ] Explore AWS Config Rules
    - [ ] Set up custom Config Rules for your compliance needs
    - [ ] Implement auto-remediation for non-compliant resources
- [ ] Implement compliance checks in CI/CD pipeline
    - [ ] Use cfn-nag for CloudFormation/CDK compliance scanning
    - [ ] Integrate compliance checks into your GitLab CI pipeline
- [ ] Create a custom CDK construct for compliant resource creation
- [ ] Set up continuous compliance monitoring and reporting

#### Key Learnings Week 3
- Understanding of AWS security services and their practical applications
- Implementation of least privilege access principles in AWS
- Knowledge of compliance frameworks and how to implement them as code
- Experience with continuous compliance monitoring and automated remediation

#### Resources Week 3
- [AWS GuardDuty Documentation](https://docs.aws.amazon.com/guardduty/)
- [AWS Security Hub Documentation](https://docs.aws.amazon.com/securityhub/)
- [AWS IAM Access Analyzer Documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html)
- [AWS Config Documentation](https://docs.aws.amazon.com/config/)
- [AWS Organizations SCPs](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html)

### Week 4: Application Security and Secure Development Practices

#### Day 1-2: Static Application Security Testing (SAST)
- [ ] Set up SonarQube
    - [ ] Install SonarQube locally or set up SonarCloud
    - [ ] Configure SonarQube for TypeScript projects
- [ ] Integrate SonarQube into your development workflow
    - [ ] Run SonarQube analysis locally
    - [ ] Set up SonarQube in your CI/CD pipeline
- [ ] Address common code security issues
    - [ ] Fix SQL injection vulnerabilities
    - [ ] Resolve Cross-Site Scripting (XSS) issues
    - [ ] Correct insecure deserialization

#### Day 3-4: Dependency Scanning and Software Composition Analysis (SCA)
- [ ] Implement OWASP Dependency-Check
    - [ ] Run Dependency-Check on your project
    - [ ] Analyze and address vulnerable dependencies
- [ ] Set up Snyk for continuous dependency scanning
    - [ ] Integrate Snyk with your GitHub repository
    - [ ] Configure Snyk in your CI/CD pipeline
- [ ] Create automated processes for dependency updates
    - [ ] Set up Dependabot for automated PRs
    - [ ] Implement a review process for dependency updates

#### Day 5-6: Secure Coding Practices
- [ ] Study OWASP Secure Coding Practices
- [ ] Implement input validation and output encoding
- [ ] Use parameterized queries to prevent SQL injection
- [ ] Implement proper error handling and logging
- [ ] Set up and use Content Security Policy (CSP)
- [ ] Implement secure session management

#### Day 7: Threat Modeling
- [ ] Learn about STRIDE threat modeling methodology
- [ ] Use OWASP Threat Dragon for a sample application
    - [ ] Create data flow diagrams
    - [ ] Identify potential threats
    - [ ] Propose mitigation strategies
- [ ] Document findings and update security measures based on the threat model

#### Key Learnings Week 4
- Understanding and implementation of SAST in the development workflow
- Knowledge of dependency scanning and SCA tools and practices
- Application of secure coding practices in real-world scenarios
- Experience with threat modeling and its integration into the development process

#### Resources Week 4
- [SonarQube Documentation](https://docs.sonarqube.org/)
- [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/)
- [Snyk Documentation](https://docs.snyk.io/)
- [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- [OWASP Threat Dragon](https://owasp.org/www-project-threat-dragon/)
- [STRIDE Threat Model](https://docs.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats)

### Week 5: Secure CI/CD and DevSecOps Automation

#### Day 1-2: Secure CI/CD Practices
- [ ] Implement secure GitLab CI/CD pipelines
    - [ ] Set up protected branches and merge request approvals
    - [ ] Configure environment-specific deployment jobs
    - [ ] Implement secrets management with GitLab CI/CD variables
- [ ] Integrate security scanning tools into CI/CD pipeline
    - [ ] Add SAST (SonarQube) stage
    - [ ] Implement container scanning with Trivy
    - [ ] Add dependency scanning with Snyk
    - [ ] Set up DAST (OWASP ZAP) for deployed applications
- [ ] Implement Infrastructure as Code (IaC) security checks
    - [ ] Add Checkov scanning for AWS CDK code
    - [ ] Implement custom security policies

#### Day 3-4: Secrets Management
- [ ] Study different secrets management tools
    - [ ] AWS Secrets Manager
    - [ ] HashiCorp Vault
- [ ] Implement HashiCorp Vault
    - [ ] Set up Vault server
    - [ ] Configure access policies
    - [ ] Integrate Vault with your application
- [ ] Implement secure secret retrieval in CI/CD pipelines
    - [ ] Use Vault in GitLab CI/CD jobs
    - [ ] Implement dynamic secrets for cloud resources

#### Day 5-6: Continuous Security Monitoring
- [ ] Set up centralized logging
    - [ ] Configure AWS CloudWatch Logs
    - [ ] Implement log shipping to a SIEM system (e.g., ELK stack)
- [ ] Implement automated security alerting
    - [ ] Set up CloudWatch Alarms for security events
    - [ ] Create custom metrics and alerts
- [ ] Develop security dashboards
    - [ ] Create a CloudWatch dashboard for security metrics
    - [ ] Implement a custom security dashboard using Grafana

#### Day 7: Incident Response Automation
- [ ] Develop incident response playbooks
    - [ ] Create a playbook for handling a potential data breach
    - [ ] Develop a playbook for responding to a DDoS attack
- [ ] Implement automated incident response with AWS Lambda
    - [ ] Create a Lambda function to automatically revoke exposed IAM credentials
    - [ ] Implement automated IP blocking for suspicious activities
- [ ] Set up War Room procedures for major security incidents

#### Key Learnings Week 5
- Implementation of comprehensive security measures in CI/CD pipelines
- Understanding and application of secrets management in a DevOps environment
- Setup and management of continuous security monitoring systems
- Development of automated incident response procedures

#### Resources Week 5
- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)
- [AWS CloudWatch Documentation](https://docs.aws.amazon.com/cloudwatch/)
- [ELK Stack Documentation](https://www.elastic.co/guide/index.html)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)

### Week 6: Advanced Topics and Project Week

#### Day 1-2: Serverless Security
- [ ] Study serverless security best practices
- [ ] Implement secure AWS Lambda functions
    - [ ] Use AWS SAM for serverless deployments
    - [ ] Implement function-level IAM roles
    - [ ] Set up Lambda function URL with authentication
- [ ] Secure API Gateway
    - [ ] Implement API keys and usage plans
    - [ ] Set up AWS WAF for API Gateway
    - [ ] Configure request throttling and quota limits

#### Day 3: Container Orchestration Security
- [ ] Study Kubernetes security best practices
- [ ] Set up a secure Amazon EKS cluster
    - [ ] Implement cluster authentication and authorization
    - [ ] Configure network policies
    - [ ] Set up pod security policies

#### Day 4: Cloud Network Security
- [ ] Implement AWS VPC security best practices
    - [ ] Set up VPC flow logs
    - [ ] Implement network ACLs and security groups
    - [ ] Configure AWS PrivateLink for service connections
- [ ] Set up AWS Transit Gateway for secure multi-VPC networking

#### Day 5-7: Capstone Project
- [ ] Design a secure, scalable microservices architecture
    - [ ] Use AWS CDK for infrastructure definition
    - [ ] Implement containerized services with ECS or EKS
    - [ ] Set up API Gateway with Lambda functions
- [ ] Implement end-to-end security measures
    - [ ] Apply all learned security best practices
    - [ ] Set up continuous security monitoring
    - [ ] Implement automated incident response
- [ ] Create comprehensive documentation
    - [ ] Document architecture decisions
    - [ ] Create runbooks for common operations
    - [ ] Develop security guidelines for future development

#### Key Learnings Week 6
- Understanding and implementation of serverless security best practices
- Knowledge of container orchestration security in cloud environments
- Application of advanced cloud network security concepts
- Experience in designing and implementing a secure, scalable cloud architecture

#### Resources Week 6
- [AWS Serverless Documentation](https://docs.aws.amazon.com/serverless/)
- [Kubernetes Security Best Practices](https://kubernetes.io/docs/concepts/security/)
- [Amazon EKS Documentation](https://docs.aws.amazon.com/eks/)
- [AWS VPC Documentation](https://docs.aws.amazon.com/vpc/)
- [AWS Transit Gateway Documentation](https://docs.aws.amazon.com/vpc/latest/tgw/)

## Final Project Deliverables
- Fully functional, secure microservices architecture deployed on AWS
- Comprehensive CI/CD pipeline with integrated security measures
- Detailed architecture documentation and security runbooks
- Presentation summarizing the six-week learning journey and project outcomes

## Next Steps
- Continuous learning and staying updated with the latest DevSecOps practices
- Exploring advanced topics like chaos engineering for security
- Contributing to open-source DevSecOps tools and projects
- Preparing for relevant certifications (e.g., AWS Certified Security - Specialty)

## Repository Structure
```markdown
.
├── src/
│   ├── apps/
│   │   └── InfrastructureStackApp.ts
│   ├── constructs/
│   │   ├── storage/
│   │   │   └── SecureS3Bucket.ts
│   │   ├── compute/
│   │   │   └── SecureEC2Instance.ts
│   │   └── network/
│   │       └── SecureVPC.ts
│   ├── stacks/
│   │   ├── StorageStack.ts
│   │   ├── ComputeStack.ts
│   │   └── NetworkStack.ts
│   └── utils/
│       └── SecurityHelper.ts
├── test/
│   └── StorageStack.test.ts
├── .github/
│   └── workflows/
│       └── ci.yml
├── cdk.json
├── tsconfig.json
├── jest.config.js
├── package.json
└── README.md
```

## Blog Posts

- [Implementing Secure Infrastructure as Code with TypeScript and AWS CDK](http://atulgoel.me) (Coming Soon)

## Contact

Atul Goel

- Website: [https://atulgoel.me/](https://atulgoel.me/)
- LinkedIn: [https://www.linkedin.com/in/atulgoel126/](https://www.linkedin.com/in/atulgoel126/)

Feel free to reach out if you have any questions or suggestions!