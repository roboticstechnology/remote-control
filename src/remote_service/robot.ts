import robot from 'robotjs';

import { IRobotAPI } from '../ws_server/helpers/interfaces/interfaces';
import { printScreen } from '../ws_server/handlers/screen';



export const robotAPI = (): IRobotAPI => {

    const drawLine = (
        _x: number,
        _y: number,
        width: number,
        height?: number
    ) => {
        robot.mouseToggle('down');
        robot.dragMouse(_x + width, _y);
        robot.dragMouse(_x + width, _y + (height || width));
        robot.dragMouse(_x, _y + (height || width));
        robot.dragMouse(_x, _y);
        robot.mouseToggle('up');
    }

    return {

        mouse_up: (_osY: number) => {

            const { x, y } = robot.getMousePos();

            robot.moveMouse(x, y - _osY);

        },

        mouse_down: (_osY: number) => {

            const { x, y } = robot.getMousePos();

            robot.moveMouse(x, y + _osY);

        },

        mouse_left: (_osX: number) => {

            const { x, y } = robot.getMousePos();

            robot.moveMouse(x - _osX, y);

        },

        mouse_right: (_osX: number) => {

            const { x, y } = robot.getMousePos();

            robot.moveMouse(x + _osX, y);

        },

        mouse_position: () => {

            const { x, y } = robot.getMousePos();

            return `${x},${y}`;

        },

        draw_circle: (_R: number) => {

            const { x, y } = robot.getMousePos();

            robot.moveMouse(x - _R, y);
            robot.mouseToggle('down');

            for (let i = 0; i <= Math.PI * 2; i += .01 * Math.PI) {

                const _x = x - _R * Math.cos(i);
                const _y = y - _R * Math.sin(i);

                robot.dragMouse(_x, _y);
            }

            robot.mouseToggle('up');
        },

        draw_rectangle: (_width: number, _height?: number) => {

            const { x, y } = robot.getMousePos();

            drawLine(x, y, _width, _height);

        },

        draw_square: (_size: number) => {

            const { x, y } = robot.getMousePos();

            drawLine(x, y, _size);

        },

        prnt_scrn: async () => {
            const { x, y } = robot.getMousePos();
            const image = await printScreen(x, y, 200, 200)
            const base64 = await image.getBase64Async(image.getMIME())
            return base64.substring(22)
        },

    }
}