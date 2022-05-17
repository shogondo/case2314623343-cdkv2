import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export class NetworkStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
      super(scope, id, props);

      const vpc = new ec2.Vpc(this, "vpc", {
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
