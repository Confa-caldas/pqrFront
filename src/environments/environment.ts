const packageJson = require('../../package.json');
//DEV cta desarrollo https://s6ordoa0ii.execute-api.us-east-1.amazonaws.com/DEV'
const HOST = 'https://s6ordoa0ii.execute-api.us-east-1.amazonaws.com/DEV';
//const HOST = 'https://m7co9zv7kk.execute-api.us-east-1.amazonaws.com/DEV';
//const HOST = 'https://3voixiptij.execute-api.us-east-1.amazonaws.com/PD';
export const environment = {
  API_PUBLIC: HOST + '/',
  production: false,
  context: 'develop',
  version: packageJson.version,
  minutesInactive: 15,
};
