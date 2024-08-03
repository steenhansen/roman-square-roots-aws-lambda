#!/usr/bin/env node
const the_cdk = require('aws-cdk-lib');
const { RomanStack } = require('../lib/cdk-stack');

const app = new the_cdk.App();
new RomanStack(app, 'Roman-Stack');
