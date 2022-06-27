// import { WebSocketServer } from 'ws';

// const wss = new WebSocketServer({ port: 8080 });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function message(data) {
//     console.log('received: %s', data);
//   });

//   ws.send('something');
// });

// import { createServer } from 'http';
// import { readFileSync } from 'fs';
import { WebSocketServer } from 'ws';
// eslint-disable-next-line node/no-missing-import
import { WS_PORT } from '../config/config';

const PORT = Number(WS_PORT) || 8080;

const { log } = console;

class heartbeat {
    constructor() {
        this.isAlive = true;
        log('pong');
    }
}

export const wssRun = () => {
    // const server = createServer();
    const wss = new WebSocketServer({ port: PORT });

    wss.on('connection', (ws) => {
        ws.on('message', (data) => {
            console.log('received: %s', data);
        });

        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        ws.isAlive = true;

        // @ts-ignore
        ws.on('pong', heartbeat);

        ws.send('something1');
    });

    // const interval = setInterval(function ping() {
    //     console.log(wss.clients.size);
    //     wss.clients.forEach(function each(ws) {
    //         if (ws.isAlive === false) return ws.terminate();

    //         ws.isAlive = false;
    //         console.log('ping');
    //         ws.ping();

    //     });
    // }, 5000);

    wss.on('close', () => {
        log('connect is close')
        // clearInterval(interval);
    });

    log('WebSocketServer isRun');


    // server.listen(8080);

}