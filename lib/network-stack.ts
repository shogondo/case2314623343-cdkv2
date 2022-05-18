import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { HostedZone } from "aws-cdk-lib/aws-route53";

export class NetworkStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
      super(scope, id, props);

      HostedZone.fromLookup(this, 'Zone', {
        domainName: 'shoutak.jp.myinstance.com'
      });

      const vpc = new ec2.Vpc(this, "vpc", {
        cidr: '172.1.1.0/24',
        natGateways: 1,
        natGatewaySubnets: {subnetGroupName: 'public'},
        subnetConfiguration: [
          {
            name: 'public',
            subnetType: ec2.SubnetType.PUBLIC,
          },
          {
            name: 'private',
            subnetType: ec2.SubnetType.PRIVATE_WITH_NAT
          },
          {
            name: 'protected',
            subnetType: ec2.SubnetType.PRIVATE_ISOLATED
          }
        ]
      });  
    }
}
