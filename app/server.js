/* global process */

import {serve} from './lib/fl-base/fl-base.js';

import config from './config.js';
import routes from './routes.js';

serve(routes, config, {
  port: 5000,
  buildDir: process.env.BUILD_DIR,
  buildJSDir: process.env.BUILD_JS_DIR
});
