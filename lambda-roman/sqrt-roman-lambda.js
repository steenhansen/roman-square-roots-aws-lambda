// https://xyber3kpjd7iq5d2hutfhf3z2y0fgbxn.lambda-url.us-west-2.on.aws/?roman_param=iv

const { TypeCzech } = require('type-czech');

let { PRE_romanSqrt, romanSqrt, corsResponse, convertNumberToInt } = require("./misc-func");

let type_czech = TypeCzech('THROW-EXCEPTIONS');
romanSqrt = type_czech.linkUp(romanSqrt, PRE_romanSqrt);

exports.handler = async (get_event) => {
  const the_path = get_event['rawPath'];
  if (the_path === "/favicon.ico") {
    return { statusCode: 410 };
  }

  if (get_event['queryStringParameters'] === undefined) {
    return corsResponse("Missing parameters, try https://abcd.lambda-url.us-west-2.on.aws/?roman_param=cxliv&type_check=yes");
  }

  if (get_event['queryStringParameters']['roman_param'] === undefined) {
    return corsResponse("Missing roman_param, try https://abcd.lambda-url.us-west-2.on.aws/?roman_param=cxliv");
  }

  const roman_str = get_event['queryStringParameters']['roman_param'];
  const type_check = get_event['queryStringParameters']['type_check'];
  if (type_check === 'yes') {
    type_czech.enableTests();
    const roman_value = convertNumberToInt(roman_str);
    try {
      const check_r_sqrt = romanSqrt(roman_value);
      return corsResponse(check_r_sqrt);
    } catch (e) {
      const type_error = e.message;
      return corsResponse(type_error);
    }
  } else {
    type_czech.disableTests();
    const no_check_r_sqrt = romanSqrt(roman_str);
    return corsResponse(no_check_r_sqrt);
  }
};


