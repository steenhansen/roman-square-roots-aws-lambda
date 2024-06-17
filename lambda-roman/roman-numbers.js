
const LOWER_ROMAN_CHARS = new RegExp("(m|M|c|C|d|D|x|X|l|L|v|V|i|I)+");
const VALID_ROMAN_NUMBER = new RegExp("^m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$");

const BEGIN_SERVER_ERROR = "***Error";
const TYPE_CHECK_ON = "yes";
const TYPE_CHECK_OFF = "no";

// https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
function isNumericStr(str) {
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function romanToInt(roman_str) {
  let thousand_digit = 0;
  let hundred_digit = 0;
  let ten_digit = 0;
  let one_digit = 0;
  let cur_column = "m_thousands";
  let started_d = false;
  let started_c = false;
  let started_l = false;
  let started_x = false;
  let started_v = false;
  let started_i = false;
  let next_char;
  let roman_seq;

  function doMs(cur_char) {
    if (cur_char === "m") {
      if (started_d) throw "dm";
      thousand_digit++;
      if (thousand_digit === 4) throw "mmmm";
      next_char = roman_seq.shift();
    } else {
      cur_column = "d_hundreds";
      next_char = cur_char;
    }
    return next_char;
  }

  function doDs(cur_char) {
    cur_column = "c_hundreds";
    if (cur_char === "d" && roman_seq[0] === "m") {
      throw "dm";
    } else if (cur_char === "d" && roman_seq[0] === "d") {
      throw "dd";
    } else if (cur_char === "d") {
      if (started_c) throw "ccd";
      if (started_d) throw "dd";
      started_d = true;
      hundred_digit = 5;
      next_char = roman_seq.shift();
    } else {
      next_char = cur_char;
    }
    return next_char;
  }

  function doCs(cur_char) {
    if (cur_char === "c" && roman_seq[0] === "m") {
      if (started_c) throw "ccm";
      started_c = true;
      const _use_up_m = roman_seq.shift();
      next_char = roman_seq.shift();
      hundred_digit = 9;
      cur_column = "l_tens";
    } else if (cur_char === "c" && roman_seq[0] === "d") {
      if (started_c) throw "ccd";
      if (started_d) throw "dcd";
      started_c = true;
      started_d = true;
      const _use_up_d = roman_seq.shift();
      next_char = roman_seq.shift();
      hundred_digit = 4;
      cur_column = "l_tens";
    } else if (cur_char === "c") {
      started_c = true;
      hundred_digit++;
      if (hundred_digit === 9) throw "dcccc";
      if (hundred_digit === 4) throw "cccc";
      next_char = roman_seq.shift();
    } else {
      cur_column = "l_tens";
      next_char = cur_char;
    }
    return next_char;
  }

  function doLs(cur_char) {
    cur_column = "x_tens";
    if (cur_char === "l" && roman_seq[0] === "c") {
      throw "lc";
    } else if (cur_char === "l" && roman_seq[0] === "l") {
      throw "ll";
    } else if (cur_char === "l") {
      if (started_x) throw "xxl";
      if (started_l) throw "ll";
      started_l = true;
      ten_digit = 5;
      next_char = roman_seq.shift();
    } else {
      next_char = cur_char;
    }
    return next_char;
  }

  function doXs(cur_char) {
    if (cur_char === "x" && roman_seq[0] === "c") {
      if (started_x) throw "xxc";
      started_x = true;
      started_c = true;
      const _use_up_c = roman_seq.shift();
      next_char = roman_seq.shift();
      ten_digit = 9;
      cur_column = "v_ones";
    } else if (cur_char === "x" && roman_seq[0] === "l") {
      if (started_x) throw "xxl";
      if (started_l) throw "lxl";
      started_x = true;
      started_l = true;
      const _use_up_l = roman_seq.shift();
      next_char = roman_seq.shift();
      ten_digit = 4;
      cur_column = "v_ones";
    } else if (cur_char === "x") {
      started_x = true;
      ten_digit++;
      if (ten_digit === 9) throw "lxxxx";
      if (ten_digit === 4) throw "xxxx";
      next_char = roman_seq.shift();
    } else {
      cur_column = "v_ones";
      next_char = cur_char;
    }
    return next_char;
  }

  function doVs(cur_char) {
    cur_column = "i_ones";
    if (cur_char === "v" && roman_seq[0] === "x") {
      throw "vx";
    } else if (cur_char === "v" && roman_seq[0] === "v") {
      throw "vv";
    } else if (cur_char === "v") {
      if (started_i) throw "iiv";
      if (started_v) throw "vv";
      started_v = true;
      one_digit = 5;
      next_char = roman_seq.shift();
    } else {
      next_char = cur_char;
    }
    return next_char;
  }

  function doIs(cur_char) {
    if (cur_char === "i" && roman_seq[0] === "x") {
      if (started_i) throw "iix";
      started_i = true;
      started_x = true;
      const _use_up_x = roman_seq.shift();
      one_digit = 9;
      cur_column = "z_zeros";
    } else if (cur_char === "i" && roman_seq[0] === "v") {
      if (started_i) throw "iiv";
      if (started_v) throw "viv";
      started_v = true;
      started_i = true;
      const _use_up_v = roman_seq.shift();
      one_digit = 4;
      cur_column = "z_zeros";
    } else if (cur_char === "i") {
      started_i = true;
      one_digit++;
      if (one_digit === 9) throw "viiii";
      if (one_digit === 4) throw "iiii";
      next_char = roman_seq.shift();
    } else {
      cur_column = "z_zeros";
      next_char = cur_char;
    }
    return next_char;
  }

  function processRoman(current_char) {
    if (cur_column === "m_thousands") next_char = doMs(current_char);
    else if (cur_column === "d_hundreds") next_char = doDs(current_char);
    else if (cur_column === "c_hundreds") next_char = doCs(current_char);
    else if (cur_column === "l_tens") next_char = doLs(current_char);
    else if (cur_column === "x_tens") next_char = doXs(current_char);
    else if (cur_column === "v_ones") next_char = doVs(current_char);
    else if (cur_column === "i_ones") next_char = doIs(current_char);
    return next_char;
  }

  try {
    if (typeof roman_str !== "string") throw "romanToInt(), not a string";
    if (roman_str === "") throw "romanToInt(), no '' in Roman";

    const roman_lower = roman_str.toLowerCase();
    const trim_roman = roman_lower.trim();
    const not_ivxlcdm = trim_roman.match(/[^ivxlcdm]/g);
    if (not_ivxlcdm) throw "Invalid character(s) " + not_ivxlcdm.toString();
    roman_seq = trim_roman.split("");
    let roman_letter = roman_seq.shift();
    while (roman_letter && cur_column !== "z_zeros") {
      roman_letter = processRoman(roman_letter);
    }
    if (roman_seq.length > 0) {
      throw "invalid ending characters " + roman_seq.toString();
    }
    if (roman_letter === "i") {
      processRoman(roman_letter);
    } else if (roman_letter) {
      throw "last character '" + roman_letter + "' invalid";
    }
    const the_integer = one_digit + ten_digit * 10 + hundred_digit * 100 + thousand_digit * 1000;
    return Number(the_integer);
  } catch (e) {
    const the_error = new Error(BEGIN_SERVER_ERROR + ", romanToInt() " + e);
    return the_error;
  }
}

function intToRoman(int_num) {
  // prettier-ignore
  const roman_sizes = [
    3000, 'mmm', 2000, 'mm', 1000, 'm',
    900, 'cm', 800, 'dccc', 700, 'dcc', 600, 'dc', 500, 'd',
    400, 'cd', 300, 'ccc', 200, 'cc', 100, 'c',
    90, 'xc', 80, 'lxxx', 70, 'lxx', 60, 'lx', 50, 'l',
    40, 'xl', 30, 'xxx', 20, 'xx', 10, 'x',
    9, 'ix', 8, 'viii', 7, 'vii', 6, 'vi', 5, 'v',
    4, 'iv', 3, 'iii', 2, 'ii', 1, 'i'
  ];
  let sub_num = int_num;
  let roman_text = "";
  for (let i = 0; i < roman_sizes.length; i += 2) {
    const column_size = roman_sizes[i];
    if (sub_num >= column_size) {
      const roman_column = roman_sizes[i + 1];
      sub_num -= column_size;
      roman_text += roman_column;
    }
  }
  return roman_text;
}

module.exports = {
  LOWER_ROMAN_CHARS, VALID_ROMAN_NUMBER, TYPE_CHECK_ON, TYPE_CHECK_OFF,
  isNumericStr, romanToInt, intToRoman
};
