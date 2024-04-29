const packageJson = require('../../package.json');
const HOST = ' https://e1v4xj7v2c.execute-api.us-east-1.amazonaws.com/dev';
//const HOST = 'https://3voixiptij.execute-api.us-east-1.amazonaws.com/PD';
export const environment = {
  API_PUBLIC: HOST + '/',
  production: false,
  context: 'develop',
  version: packageJson.version,
  minutesInactive: 15,
};
