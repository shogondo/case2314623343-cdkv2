import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { MyStage } from './mystage';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ProjStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const connection = pipelines.CodePipelineSource.connection(
      'shogondo/case2314623343-cdkv2',
      'main',
      {
        connectionArn: 'arn:aws:codestar-connections:ap-northeast-1:393007915094:connection/a480f9e0-2bdb-4bad-8428-86ff691d0af9'
      }
    )

    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      pipelineName: 'CdkPipelineV2',
      crossAccountKeys: true,
      synth: new pipelines.CodeBuildStep('SynthStep', {
        input: connection,
        installCommands: [
          'npm install -g aws-cdk'
        ],
        commands: [
          'echo v2',
          'npm ci',
          'npm run build',
          'npx cdk synth --debug --verbose --trace'
        ]
      })
    });

    const stage = new MyStage(this, 'MyStageV2', {});
    pipeline.addStage(stage)
  }
}
