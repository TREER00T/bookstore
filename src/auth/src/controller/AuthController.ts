import {Request} from 'express';
import Db from '../model/Db';
import Util from '../util/Util';
import Json from '../util/Json';
import Response from '../util/Response';


export default class AuthController {

    static async signUp(req: Request) {

        let bodyObject = req.body,
            email = bodyObject?.email;

        if (Util.isUndefined(email))
            return Json.builder(Response.HTTP_BAD_REQUEST);

        let isExistUser = await Db.isExistUser(email);

        if (isExistUser)
            return Json.builder(Response.HTTP_CONFLICT);

        let userApiKey = Util.getApiKey();

        bodyObject.apiKey = userApiKey;
        bodyObject.verifiedBadge = false;
        bodyObject.password = Util.getHashData(bodyObject.password, userApiKey);

        await Db.insertUser(bodyObject);
    }


    static async signIn(req: Request) {

        let bodyObject = req.body,
            password = bodyObject?.password,
            email = bodyObject?.email;

        if (Util.isUndefined(email) || Util.isUndefined(password))
            return Json.builder(Response.HTTP_BAD_REQUEST);

        let result = await Db.isExistUser(email),
            isExistUser = result === false;

        if (!isExistUser)
            return Json.builder(Response.HTTP_NOT_FOUND);

        let isSignIn = await Db.isSignIn(email, Util.getHashData(bodyObject.password, result));

        if (isSignIn)
            return Json.builder(Response.HTTP_OK);

        Json.builder(Response.HTTP_UNAUTHORIZED);
    }

    static async refreshToken(req: Request) {

        let id = req.body?.id;

        let isValidaId = await Db.isValidaId(id);

        if (!isValidaId)
            return Json.builder(Response.HTTP_NOT_FOUND);


        Json.builder(
            Response.HTTP_ACCEPTED,
            {
                accessToken: await Util.getJwtEncrypt(Util.getJwtSign({
                    id: `${id}`,
                    expiresIn: '12h',
                    type: 'at'
                }, id)),
                refreshToken: await Util.getJwtEncrypt(Util.getJwtSign({
                    id: `${id}`,
                    expiresIn: '1d',
                    type: 'rt'
                }, id))
            }
        );

    }

}