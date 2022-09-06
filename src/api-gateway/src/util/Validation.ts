import Util from './Util';
import Json from './Json';
import Response from './Response';
import {JWK, parse} from 'node-jose';
import {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import ValidationException from '../exceptions/ValidationException';

export default class Validation {

    static isValidHttpMethod(requestMethod: string): boolean {

        const arrayOfHttpMethods = [
            'GET',
            'PUT',
            'POST',
            'PATCH',
            'DELETE'
        ];

        return arrayOfHttpMethods.includes(requestMethod);
    }

    static requestRouteHandler(url: string, method: string, app: any) {

        let arrayOfRouteWithOutAuth = [
            'post /api/auth/generateUser'
        ];

        let arrayOfRoute: string[] = [];


        function print(path: any, layer: any) {
            if (layer.route)
                layer.route.stack.forEach(print.bind(null, path.concat(Util.splitRoute(layer.route.path))));


            if (layer.name === 'router' && layer.handle.stack)
                layer.handle.stack.forEach(print.bind(null, path.concat(Util.splitRoute(layer.regexp))));


            if (layer.method)
                arrayOfRoute.push(method + ' /' + path.concat(Util.splitRoute(layer.regexp)).filter(Boolean).join('/'));
        }

        app._router.stack.forEach(print.bind(null, []));

        arrayOfRoute = arrayOfRoute.filter((el) => !arrayOfRouteWithOutAuth.includes(el));

        let isRouteWithoutAuth = arrayOfRouteWithOutAuth.includes(method + ' ' + url);

        if (isRouteWithoutAuth)
            return '';

        let isRouteInAuthArr = arrayOfRoute.includes(method + ' ' + url);

        if (isRouteInAuthArr)
            return 'AuthRoute';

        return 'NotFound';
    }

    static getSplitBearerJwt(bearerHeader: string): any {
        try {
            let token = bearerHeader.split(' ')[1];
            if ((token !== null || typeof token !== 'undefined')
                && typeof bearerHeader !== 'undefined')
                return token;
            return false;
        } catch (e) {
            ValidationException(e);
        }
    }

    static async getJwtDecrypt(encryptedBody: string) {
        try {
            let keystore = JWK.createKeyStore();
            await keystore.add(await JWK.asKey(process.env.JWE_PRAIVATE_KEY, 'pem'));
            let outPut = parse.compact(encryptedBody);
            let decryptedVal = await outPut.perform(keystore);
            // @ts-ignore
            let token = Buffer.from(decryptedVal.plaintext).toString();

            // @ts-ignore
            if (typeof decryptedVal.plaintext === ('undefined' || null))
                return Json.builder(Response.HTTP_UNAUTHORIZED_INVALID_TOKEN);

            return token.replace(/["]+/g, '');

        } catch (e) {
            ValidationException(e);
        }
    }

    static getJwtVerify(token: string, cb: Function) {
        try {
            jwt.verify(token, process.env.PUBLIC_KEY, {}, (err, decoded) => {

                if (err !== null && err instanceof TokenExpiredError)
                    return Json.builder(Response.HTTP_UNAUTHORIZED_TOKEN_EXP);


                if (err instanceof JsonWebTokenError)
                    return Json.builder(Response.HTTP_UNAUTHORIZED_INVALID_TOKEN);


                cb(decoded);
            });
        } catch (e) {
            ValidationException(e);
        }
    }

}