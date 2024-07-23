const packageJson = require('../../package.json');

const HOST = 'confa-lb-ubuntu-178194802.us-east-1.elb.amazonaws.com';

export const environment = {
  API_PUBLIC: HOST + '/',
  production: false,
  context: 'qa',
  version: packageJson.version,
  minutesInactive: 15,
};
