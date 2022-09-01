import * as express from 'express';
import * as bodyParser from 'body-Parser';
import * as cors from 'cors';
import Json from '../util/Json';
import Validation from '../util/Validation';
import Response from '../util/Response';
import authRouter from '../route/AuthRouter';
// import Pipeline from '../middleware/ApiPipeline';

let app = express();
let router = express.Router();

export default class RouterInterface {

    static start() {

        app.use(express.json(), bodyParser.urlencoded({extended: true}), bodyParser.json(), cors());

        app.use((req, res, next) => {

            Json.initializationRes(res);

            if (!Validation.isValidHttpMethod(req.method))
                return Json.builder(Response.HTTP_METHOD_NOT_ALLOWED);

            let routeMsg = Validation.requestRouteHandler(req.url, app);

            if (routeMsg === 'NotFound')
                return Json.builder(Response.HTTP_NOT_FOUND);

            if (routeMsg === 'AuthRoute') {
                let token: string,
                    apiKey: string;
                try {
                    token = req?.headers?.authorization;
                    apiKey = (req?.headers?.apiKey !== undefined) ? req?.headers?.apiKey?.toString() : req?.query?.apiKey?.toString();
                } catch (e) {
                }
                // let isAccessTokenVerify = Pipeline.tokenVerify(token);
                //
                //
                // let isSetUserToken = (!isAccessTokenVerify) ? isAccessTokenVerify : Pipeline.tokenVerify(token);
                // let isSetUserApiKey = Pipeline.isSetUserApiKey(apiKey);
                //
                // if ((!isSetUserApiKey && !isSetUserToken) || !isSetUserToken)
                //     return Json.builder(Response.HTTP_UNAUTHORIZED_INVALID_TOKEN);
                //
                // if (isSetUserApiKey && isSetUserToken) {
                //     return Pipeline.getTokenPayLoad(data => {
                //         Pipeline.isValidApiKey(apiKey, data.phoneNumber, result => {
                //             if (!result) {
                //                 return Json.builder(Response.HTTP_UNAUTHORIZED_INVALID_API_KEY);
                //             }
                //             app.use(router);
                //             next();
                //         });
                //     });
                // }
            }

            app.use(router);
            next();

        });

        app.use('/api/auth', authRouter);

        app.listen(8080);

    }

}