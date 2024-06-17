// npm run test

const { TYPE_CHECK_ON, TYPE_CHECK_OFF } = require("../lambda-roman/roman-numbers");

const roman_lambda = require('../lambda-roman/sqrt-roman-lambda');
const lambda_handler = roman_lambda.handler;

function outputOk(body_message) {
  const expected_output = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET'
    },
    body: `{"message":"${body_message}"}`
  };
  return expected_output;
}

describe('LOCAL: xvi -> iv', () => {
  const input_params = { roman_param: "xvi", type_check: TYPE_CHECK_ON };
  const expected_output = outputOk("iv");
  it('xvi square root should be iv', () => {
    lambda_handler({ queryStringParameters: input_params })
      .then(the_actual => {
        expect(the_actual).toMatchObject(expected_output);
      }
      );
  });
});

describe('LOCAL: "" -> ERROR', () => {
  const input_params = { roman_param: "", type_check: TYPE_CHECK_ON };
  const expected_output1 = "PRE_romanSqrt() PRE-FUNC: ERROR-2 empty string";
  it('"" should be an error', () => {
    lambda_handler({ queryStringParameters: input_params })
      .then(the_actual => {
        error_mess = the_actual["body"];
        response_json = JSON.parse(error_mess);
        response_message = response_json["message"];
        expect(response_message).toMatch(expected_output1);
      }
      );
  });
});


describe('LOCAL: 123 -> ERROR', () => {
  const input_params = { roman_param: "123", type_check: TYPE_CHECK_ON };
  const expected_output1 = "PRE_romanSqrt() PRE-FUNC: The value '123', which is a 'number', is not a 'string'";
  it('123 should be an error', () => {
    lambda_handler({ queryStringParameters: input_params })
      .then(the_actual => {
        error_mess = the_actual["body"];
        response_json = JSON.parse(error_mess);
        response_message = response_json["message"];
        expect(response_message).toMatch(expected_output1);
      }
      );
  });
});



describe('LOCAL: ABC -> ERROR', () => {
  const input_params = { roman_param: "ABC", type_check: TYPE_CHECK_ON };
  const expected_output1 = "PRE_romanSqrt() PRE-FUNC: ERROR-4 invalid Roman number";
  const expected_output2 = 'VALUES "ABC"';
  it('ABC should be an error', () => {
    lambda_handler({ queryStringParameters: input_params })
      .then(the_actual => {
        error_mess = the_actual["body"];
        response_json = JSON.parse(error_mess);
        response_message = response_json["message"];
        expect(response_message).toMatch(expected_output1);
        expect(response_message).toMatch(expected_output2);
      }
      );
  });
});



describe('LOCAL: cmcmcm -> ERROR', () => {
  const input_params = { roman_param: "cmcmcm", type_check: TYPE_CHECK_ON };
  const expected_output1 = "PRE_romanSqrt() PRE-FUNC: ERROR-4 invalid Roman number";
  const expected_output2 = 'VALUES "cmcmcm"';
  it('Should be an error', () => {
    lambda_handler({ queryStringParameters: input_params })
      .then(the_actual => {
        error_mess = the_actual["body"];
        response_json = JSON.parse(error_mess);
        response_message = response_json["message"];
        expect(response_message).toMatch(expected_output1);
        expect(response_message).toMatch(expected_output2);
      }
      );
  });
});

describe('LOCAL: 400 no roman_param -> ERROR', () => {
  const input_params = { type_check: TYPE_CHECK_ON };
  const expected_output1 = { statusCode: 400 };
  it('Should be an error', () => {
    lambda_handler({ queryStringParameters: input_params })
      .then(the_actual => {
        expect(the_actual).toMatchObject(expected_output1);
      }
      );
  });
});
