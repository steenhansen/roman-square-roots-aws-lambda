
//  https://us-west-2.console.aws.amazon.com/cloudwatch/home?region=us-west-2#logsV2:log-groups

// https://medium.com/@aayappareddy/aws-cdk-and-how-to-deploy-a-node-js-lambda-function-using-it-b9bba46d6834

const the_cdk = require('aws-cdk-lib');
const the_lambda = require('aws-cdk-lib/aws-lambda');

const roman_node_dir = "lambda-roman";
const lambda_func_file = 'sqrt-roman-lambda.handler';

class RomanStack extends the_cdk.Stack {
  constructor(scope_construct, id_str, conf_props) {
    super(scope_construct, id_str, conf_props);

    const roman_lambda = new the_lambda.Function(this, "RomanHandler", {
      runtime: the_lambda.Runtime.NODEJS_LATEST,
      code: the_lambda.Code.fromAsset(roman_node_dir),
      handler: lambda_func_file
    });

    const romanLambdaUrl = roman_lambda.addFunctionUrl({
      authType: the_lambda.FunctionUrlAuthType.NONE,
    });

    new the_cdk.CfnOutput(this, "Function-Url", { value: romanLambdaUrl.url });

  }
}

module.exports = { RomanStack };