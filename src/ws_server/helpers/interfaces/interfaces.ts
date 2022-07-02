import WebSocket from 'ws';

export interface IRobotAPI {
    [key: string]: Function;
    mouse_up: (_osY: number) => void;
    mouse_down: (_osY: any) => void;
    mouse_left: (_osX: number) => void;
    mouse_right: (_osX: number) => void;
    mouse_position: () => string;
    draw_circle: (_R: number) => void;
    draw_rectangle: (_width: number, _heigth?: number) => void;
    draw_square: (_size: number) => void;
    prnt_scrn: () => void;

}

export interface IWebSocket extends WebSocket {

    isAlive: boolean;

};