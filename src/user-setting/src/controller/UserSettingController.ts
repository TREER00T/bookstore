import express, {Request} from 'express';
import Db from '../model/Db';
import Json from '../util/Json';
import Util from '../util/Util';
import multer from 'multer';
import File from '../util/File';
import Response from '../util/Response';

let multerImage = multer().single('image');


export default class UserSettingController {
    static async getInfo(req: Request) {

        let id = req.params?.id;

        let result = await Db.getInfo(id),
            isUndefined = result === false;

        if (isUndefined)
            return Json.builder(Response.HTTP_USER_NOT_FOUND);

        Json.builder(Response.HTTP_OK, result);
    }

    static async setInfo(req: Request, res: express.Response) {


        multerImage(req, res, async () => {

            let file = req.file,
                fileUrl = '',
                bodyObject = req.body,
                id = bodyObject?.id,
                fname = bodyObject?.fname,
                lname = bodyObject?.lname,
                age = bodyObject?.age,
                img = bodyObject?.img,
                bio = bodyObject?.bio;

            if (!await Db.isExistUser(id))
                return Json.builder(Response.HTTP_USER_NOT_FOUND);


            if (Util.isUndefined(file))
                return Json.builder(Response.HTTP_BAD_REQUEST);

            fileUrl = File.validationAndWriteFile(file.buffer, File.getFileFormat(file.originalname)).fileUrl;


            if (!fileUrl) {
                await Db.setInfo(id, {
                    fname: fname, lname: lname,
                    age: age, img: fileUrl, bio: bio
                });
                return Json.builder(Response.HTTP_OK);
            }

            Json.builder(Response.HTTP_BAD_REQUEST);

        });


    }

}