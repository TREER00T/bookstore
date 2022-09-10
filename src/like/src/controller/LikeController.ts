import {Request} from 'express';
import Db from '../model/Db';
import Json from '../util/Json';
import Response from '../util/Response';


export default class LikeController {

    static async addLike(req: Request) {

        let bodyObject = req.body,
            userId = bodyObject?.userId,
            bookId = bodyObject?.bookId;

        await Db.updateLike(bookId, userId);
        let result = await Db.getMaxLikes(bookId),
            isCountOfLikeUnDefined = result === false;

        if (isCountOfLikeUnDefined) {
            await Db.insertCountForLike(bookId);
            return Json.builder(Response.HTTP_OK);
        }
        let count = parseInt(result);

        count++;

        await Db.updateCountForLike(bookId, count);

        Json.builder(Response.HTTP_OK);

    }

    static async getMaxLikes(req: Request) {
        let bookId = req.params?.bookId;

        let likeCount = await Db.getMaxLikes(bookId);


        Json.builder(Response.HTTP_OK, likeCount);
    }


    static async deleteLike(req: Request) {
        let bodyObject = req.body,
            userId = bodyObject?.userId,
            bookId = bodyObject?.bookId;

        await Db.deleteLike(bookId, userId);
        let result = await Db.getMaxLikes(bookId),
            isCountOfLikeUnDefined = result === false;

        if (isCountOfLikeUnDefined) {
            await Db.insertCountForLike(bookId);
            return Json.builder(Response.HTTP_OK);
        }
        let count = parseInt(result);

        count--;

        await Db.updateCountForLike(bookId, count)
        Json.builder(Response.HTTP_OK);

    }


    static async getListOfBookIdForMostLikes() {
        Json.builder(Response.HTTP_OK, await Db.getListOfBookIdForMostLikes());
    }

}