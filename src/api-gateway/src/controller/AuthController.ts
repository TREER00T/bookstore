import {Request, Response} from 'express';
import * as amqp from 'amqplib';
import {config} from 'dotenv';
import PipeLine from '../middleware/ApiPipeline';

config();

async function connect() {
    let connection = await amqp.connect(process.env.AMQP_URL);
    return await connection.createChannel();
}

export default class AuthController {

    static async generateUser(req: Request, res: Response) {

        const CHANNEL_NAME = 'GenerateUser';

        PipeLine.getTokenPayLoad((data: any) => {

            let id = data.id;

            connect().then(channel => {
                let result = channel.assertQueue(CHANNEL_NAME);
                channel.sendToQueue(CHANNEL_NAME, Buffer.from(JSON.stringify({data: "", userId: id})));
            });


        });

    }

}