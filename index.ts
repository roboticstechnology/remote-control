import { httpServer } from './src/http_server/index.js';
import { wssRun } from './src/ws_server/wsf.js';
import { FRONT_PORT } from './src/config/config'

wssRun();

const HTTP_FRONT_PORT = FRONT_PORT || 3000;

console.log(`Start static http server on the ${HTTP_FRONT_PORT} port!`);
httpServer.listen(HTTP_FRONT_PORT);
