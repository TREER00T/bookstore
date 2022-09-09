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

        multerImage(req, res, async () => {

            let file = req.file,
                fileUrl = '',
                bodyObject = req.body,
                title = bodyObject?.title,
                id = bodyObject?.id,
                edition = bodyObject?.edition,
                price = bodyObject?.price,
                availableQuantity = bodyObject?.availableQuantity,
                genre = bodyObject?.genre,
                isbn = bodyObject?.isbn,
                lang = bodyObject?.lang,
                translator = bodyObject?.translator,
                printNumber = bodyObject?.printNumber,
                numberOfPage = bodyObject?.numberOfPage,
                description = bodyObject?.description,
                author = bodyObject?.author;


            if (Util.isUndefined(file))
                return Json.builder(Response.HTTP_BAD_REQUEST);

            fileUrl = File.validationAndWriteFile(file.buffer, File.getFileFormat(file.originalname)).fileUrl;


            if (!fileUrl) {
                await Db.update(id, {
                    title: title,
                    genre: genre,
                    author: author,
                    publisher: id,
                    description: description,
                    numberOfPage: numberOfPage,
                    isbn: isbn,
                    printNumber: printNumber,
                    translator: translator,
                    lang: lang,
                    img: file,
                    date: Util.getDate(),
                    availableQuantity: availableQuantity,
                    price: price,
                    edition: edition
                });
                return Json.builder(Response.HTTP_OK);
            }

            Json.builder(Response.HTTP_BAD_REQUEST);

        });


    }

    static async editBook(req: Request) {
        let bodyObject = req.body,
            title = bodyObject?.title,
            id = req.params?.id,
            edition = bodyObject?.edition,
            price = bodyObject?.price,
            availableQuantity = bodyObject?.availableQuantity,
            genre = bodyObject?.genre,
            isbn = bodyObject?.isbn,
            lang = bodyObject?.lang,
            translator = bodyObject?.translator,
            printNumber = bodyObject?.printNumber,
            numberOfPage = bodyObject?.numberOfPage,
            description = bodyObject?.description,
            author = bodyObject?.author;


        await Db.update(id, {
            title: title,
            genre: genre,
            author: author,
            publisher: id,
            description: description,
            numberOfPage: numberOfPage,
            isbn: isbn,
            printNumber: printNumber,
            translator: translator,
            lang: lang,
            availableQuantity: availableQuantity,
            price: price,
            edition: edition
        });

        Json.builder(Response.HTTP_OK);

    }


    static async deleteBook(req: Request) {

        let id = req.params?.id;

        await Db.delete(id);

        Json.builder(Response.HTTP_OK);

    }


}