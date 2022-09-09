import express, {Request} from 'express';
import Db from '../model/Db';
import Json from '../util/Json';
import Util from '../util/Util';
import multer from 'multer';
import File from '../util/File';
import Response from '../util/Response';

let multerImage = multer().single('image');


export default class BookController {

    static async getBooks(req: Request) {

        let result = await Db.getBooks(req.query),
            isUndefined = result === false;

        if (isUndefined)
            return Json.builder(Response.HTTP_NOT_FOUND);

        Json.builder(Response.HTTP_OK, result);
    }

    static async getDetailBook(req: Request) {

        let id = req.params?.id;

        let result = await Db.getDetailBook(id),
            isUndefined = result === false;

        if (isUndefined)
            return Json.builder(Response.HTTP_NOT_FOUND);

        Json.builder(Response.HTTP_OK, result);
    }

    static async addBook(req: Request, res: express.Response) {


    }

    static async editBook(req: Request) {


    }


    static async deleteBook(req: Request) {


    }


}