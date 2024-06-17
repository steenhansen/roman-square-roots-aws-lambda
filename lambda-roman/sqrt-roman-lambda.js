// https://fdzz5y2xtnjspequaqfajio5zi0ifvyh.lambda-url.us-west-2.on.aws/?roman_param=cxliv&type_check=yes

const { TypeCzech } = require('type-czech');

let { PRE_romanSqrt, romanSqrt, corsResponse, convertNumberToInt } = require("./misc-func");

type_czech = TypeCzech('THROW-EXCEPTIONS');
romanSqrt = type_czech.linkUp(romanSqrt, PRE_romanSqrt);

exports.handler = async (get_event) => {
  const the_path = get_event['rawPath'];
  if (the_path === "/favicon.ico") {
    return { statusCode: 410 };
  }
  const roman_str = get_event['queryStringParameters']['roman_param'];
  if (typeof roman_str === 'undefined') {
    return { statusCode: 400 };
  }
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


