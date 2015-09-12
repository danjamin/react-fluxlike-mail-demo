import {bootstrap} from './lib/fl-base/fl-base.js';

import config from './config.js';
import routes from './routes.js';

bootstrap.init(routes, config, false);
