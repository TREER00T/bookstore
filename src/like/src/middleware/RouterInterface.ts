import * as express from 'express';
import * as bodyParser from 'body-Parser';
import Json from '../util/Json';
import likeRouter from '../route/LikeRouter';

let app = express();
let router = express.Router();

export default class RouterInterface {

    static start() {

        app.use(express.json(), bodyParser.urlencoded({extended: true}), bodyParser.json());

        app.use((req, res, next) => {

            Json.initializationRes(res);

            next();

        });

        app.use(router);
        app.use('/api/product', likeRouter);


        app.listen(80);

    }

}