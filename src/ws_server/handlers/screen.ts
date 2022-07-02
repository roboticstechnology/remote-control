import robot from 'robotjs';
import Jimp from 'jimp';


export async function printScreen(
    x: number,
    y: number,
    width: number,
    height: number
): Promise<Jimp> {
    return new Promise((resolve) => {
        const bitmap = robot.screen.capture(x - 99, y - 99, width, height)
        const image = new Jimp(bitmap.width, bitmap.height)

        let pos = 0

        image.scanQuiet(
            0,
            0,
            image.bitmap.width,
            image.bitmap.height,
            (idx) => {
                image.bitmap.data[idx + 2] = bitmap.image.readUInt8(pos++)
                image.bitmap.data[idx + 1] = bitmap.image.readUInt8(pos++)
                image.bitmap.data[idx + 0] = bitmap.image.readUInt8(pos++)
                image.bitmap.data[idx + 3] = bitmap.image.readUInt8(pos++)
            }
        )

        resolve(image)
    })
}