import {bootstrap} from 'fluxlike';

import config from './config.js';
import routes from './routes.js';

bootstrap.init(routes, config, false);
