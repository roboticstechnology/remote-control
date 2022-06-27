import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(__dirname, './.env')
});

const config = {
    FRONT_PORT: process.env['FRONT_PORT'],
    WS_PORT: process.env['WS_PORT']
};

export const { FRONT_PORT, WS_PORT } = config;
