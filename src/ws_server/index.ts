import WebSocket, { WebSocketServer, createWebSocketStream } from 'ws';
import { Duplex } from 'stream';
import robot from 'robotjs';
//import { robotAPI } from '../remote_service/robot';

import { WS_PORT } from '../config/config';

const PORT = Number(WS_PORT) || 8080;

const { log } = console;

interface IWebSocket extends WebSocket {
    isAlive: boolean
};


function readable(duplex: Duplex) {
    let data = ''

    return async () => {
        try {
            let chunk

            while (null !== (chunk = duplex.read())) {
                data += chunk
            }

            const [command, ...params] = data.split(' ')
            log('command = ', command);
            log('...params = ', ...params)
            // const [x, y] = params.map(Number)

            // const runCommand = app()

            // const isValidCommand = Object.prototype.hasOwnProperty.call(
            //     runCommand,
            //     command
            // )

            // if (!isValidCommand) {
            //     throw new Error(`${command} command not found`)
            // }

            console.log(`got a message: ${data}`)
            // const result = await runCommand[command](x, y)
            // duplex.write(`${command} ${result}\0`)
            // console.log(`sent a message: ${command} ${result ? result : ''}\0`)
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)
            }
        } finally {
            data = ''
        }
    }
}

export const wssRun = () => {
    // const server = createServer();
    const wss = new WebSocketServer({ port: PORT });

    //    const robotI = robotAPI();

    wss.on('connection', (ws: IWebSocket) => {
        ws.on('message', (data: string): void => {
            console.log('received: %s', data);
            const { x, y } = robot.getMousePos();

            //robotI[String(data)]

            if (String(data) === 'mouse_position') {
                console.log(123)
                robot.moveMouse(x + 100, y + 50)
                ws.send(`${x},${y}`);
            }


        });


        ws.isAlive = true;


        ws.on('pong', () => {
            ws.isAlive = true
        });

        const duplex = createWebSocketStream(ws, {
            encoding: 'utf8',
            decodeStrings: false,
        })

        duplex.on('readable', readable(duplex))

        ws.send('something1');
    });

    const interval = setInterval(() => {
        console.log(wss.clients.size);
        wss.clients.forEach((ws: any) => {

            if (ws.isAlive === false) return ws.terminate();


            ws.isAlive = false;
            console.log('ping');
            ws.ping();

        });
    }, 30 * 1000);

    wss.on('close', () => {
        log('connect is close')
        clearInterval(interval);
    });

    log('WebSocketServer isRun');


    // server.listen(8080);

}