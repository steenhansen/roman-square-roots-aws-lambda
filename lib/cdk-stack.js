
//  https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#logsV2:log-groups

const cdk = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');


class CdkStack extends cdk.Stack {
  constructor(scope_construct, id_str, conf_props) {
    super(scope_construct, id_str, conf_props);

    const roman_lambda = new lambda.Function(this, "RomanHandler", {
      runtime: lambda.Runtime.NODEJS_LATEST,
      code: lambda.Code.fromAsset("lambda-roman"),
      handler: 'sqrt-roman-lambda.handler'
    });

    const romanLambdaUrl = roman_lambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new cdk.CfnOutput(this, "Function-Url", { value: romanLambdaUrl.url });

  }
}

module.exports = { CdkStack };