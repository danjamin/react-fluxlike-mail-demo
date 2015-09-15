/* global process */

import serve from 'fluxlike/serve.js';

import config from './config.js';
import routes from './routes.js';

serve(routes, config, {
  port: 5000
});
