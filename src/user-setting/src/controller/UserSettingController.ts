import {Request} from 'express';
import Db from '../model/Db';
import Json from '../util/Json';
import Response from '../util/Response';


export default class UserSettingController {

    static async getInfo(req: Request) {

        let id = req.params?.id;

        let result = await Db.getInfo(id),
            isUndefined = result === false;

        if (isUndefined)
            return Json.builder(Response.HTTP_USER_NOT_FOUND);

        Json.builder(Response.HTTP_OK, result);
    }

    static async setInfo(req: Request) {

        let bodyObject = req.body,
            id = bodyObject?.id,
            fname = bodyObject?.fname,
            lname = bodyObject?.lname,
            age = bodyObject?.age,
            img = bodyObject?.img,
            bio = bodyObject?.bio;

        if (!await Db.isExistUser(id))
            return Json.builder(Response.HTTP_USER_NOT_FOUND);

        await Db.setInfo(id, {
            fname: fname, lname: lname,
            age: age, img: img, bio: bio
        });

        Json.builder(Response.HTTP_OK);
    }

}