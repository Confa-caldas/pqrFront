const packageJson = require('../../package.json');

const HOST = 'https://3voixiptij.execute-api.us-east-1.amazonaws.com/PD';

export const environment = {
  API_PUBLIC: HOST + '/',
  production: true,
  context: 'production',
  version: packageJson.version,
  minutesInactive: 15,
};
