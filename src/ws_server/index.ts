import { WebSocketServer, createWebSocketStream } from 'ws';
import { Duplex } from 'stream';
// import robot from 'robotjs';
import { robotAPI } from '../remote_service/robot';
import { WS_PORT } from '../config/config';
import {IWebSocket} from '../ws_server/helpers/interfaces/interfaces';

const PORT = Number(WS_PORT) || 8080;

const { log } = console;

function readable(duplex: Duplex) {

    let data = ''

    return async () => {

        try {
            let chunk;

            while (null !== (chunk = duplex.read())) {
                data += chunk
            };

            const [command, ...params] = data.split(' ')
            log('command = ', command);
            log('...params = ', params);

            const [x, y] = params.map(Number);

            const runCommand = robotAPI();

            if (!runCommand[command as string]) {
                throw new Error(`${command} command not found`)
            };

            console.log(`got a message: ${data}`);
            const result = await runCommand[command as string]!(x, y);
            duplex.write(`${command} ${result}\0`);

        } catch (error) {

            if (error instanceof Error) {
                console.error(error.message)
            }

        } finally {

            data = '';

        }
    }
}

export const wssRun = () => {
    // const server = createServer();
    const wss = new WebSocketServer({ port: PORT });

    //    const robotI = robotAPI();

    wss.on('connection', (ws: IWebSocket) => {

        ws.isAlive = true;

        ws.on('pong', () => {
            ws.isAlive = true
        });

        const duplex = createWebSocketStream(ws, {
            encoding: 'utf8',
            decodeStrings: false,
        })

        duplex.on('readable', readable(duplex))

        ws.on('close', () => {
            duplex.destroy();
        })

        //ws.send('something1');
    });

    const interval = setInterval(() => {

        wss.clients.forEach((ws: any) => {

            if (ws.isAlive === false) return ws.terminate();

            ws.isAlive = false;

            ws.ping();

        });
    }, 30 * 1000);

    wss.on('close', () => {

        log('connect is close')

        clearInterval(interval);
    });

    log(`WebSocketServer isRun on the ${PORT} port`);

}