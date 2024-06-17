// npm run test

const AWS_LAMBDA = "https://fdzz5y2xtnjspequaqfajio5zi0ifvyh.lambda-url.us-west-2.on.aws";

describe('AWS: xvi -> iv', () => {
  const expected_output = "iv";
  it('xvi square root should be iv', () => {
    lambda_with_params = AWS_LAMBDA + "/?roman_param=xvi&type_check=yes";
    return fetch(lambda_with_params, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain'
      }
    })
      .then(response => response.json())
      .then(data_obj => data_obj.message)
      .then(the_actual => expect(the_actual).toMatch(expected_output));


  });
});


describe('AWS: TNH -> error', () => {
  const expected_output_1 = "PRE_romanSqrt() PRE-FUNC: ERROR-3 non-Roman characters";
  const expected_output_2 = 'VALUES "TNH"';
  it('TNH should be an error', () => {
    lambda_with_params = AWS_LAMBDA + "/?roman_param=TNH&type_check=yes";
    return fetch(lambda_with_params, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain'
      }
    }).then(response => response.json())
      .then(data_obj => data_obj.message)
      .then(the_actual => {
        expect(the_actual).toMatch(expected_output_1);
        expect(the_actual).toMatch(expected_output_2);
      });


  });
});