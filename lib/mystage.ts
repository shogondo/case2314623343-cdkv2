
import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { NetworkStack } from "./network-stack";

export class MyStage extends Stage {
    constructor(scope: Construct, id: string, props: StageProps) {
        super(scope, id, props);

        new NetworkStack(this, 'Network', {});
    }
}
