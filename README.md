<a name="s"></a>

# Node.js AWS Lambda Example



 Finds square roots of Roman Numbers, with server type checking turned on or off in browser.
 - [Live Site](https://single-html.s3.us-west-2.amazonaws.com/roman-lamba.html)
  - [AWS Lambda](https://xyber3kpjd7iq5d2hutfhf3z2y0fgbxn.lambda-url.us-west-2.on.aws/?roman_param=xvi&type_check=yes) returning IV from XVI


## Install
	cd lambda-roman
	npm install

	cd /
	npm install

	cdk bootstrap  --profile oregon-user    
	cdk synth      --profile oregon-user  >  c:\.aws\roman_synth.yaml
	cdk deploy     --profile oregon-user                            
 
![screen shot](tall-lambda.gif)






