const { LOWER_ROMAN_CHARS, VALID_ROMAN_NUMBER, isNumericStr, romanToInt, intToRoman } = require("./roman-numbers");


const { TypeCzech } = require('type-czech');
let type_czech = TypeCzech('THROW-EXCEPTIONS');

function PRE_romanSqrt(roman_str) {
  const not_string_err = type_czech.checkParam_type(roman_str, 'string');
  if (not_string_err)
    return not_string_err;  // ERROR_ROMAN_1
  if (roman_str.length === 0)
    return "ERROR-2 empty string";
  if (!roman_str.match(LOWER_ROMAN_CHARS))
    return "ERROR-3 non-Roman characters";
  const roman_lower = roman_str.toLowerCase();
  if (!roman_lower.match(VALID_ROMAN_NUMBER))
    return "ERROR-4 invalid Roman number";
}

function romanSqrt(roman_str) {
  const int_num = romanToInt(roman_str);
  const int_sqrt = Math.sqrt(int_num);
  const roman_num = intToRoman(int_sqrt);
  return roman_num;
}

function corsResponse(check_r_sqrt) {
  const cors_resp = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET"
    },
    body: JSON.stringify({ message: check_r_sqrt }),
  };
  return cors_resp;
}

function convertNumberToInt(roman_str) {
  let roman_value = roman_str;
  if (isNumericStr(roman_str)) {
    roman_value = parseInt(roman_str);
  }
  return roman_value;
}

module.exports = {
  PRE_romanSqrt, romanSqrt, corsResponse, convertNumberToInt
};
