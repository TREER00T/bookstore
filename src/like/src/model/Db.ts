import {MongoClient} from 'mongodb';
import {config} from 'dotenv';
import Util from '../util/Util';

config();

let dbName = process.env.MONGO_DB;
let countCollectionForLike = process.env.COUNT_OF_LIKE_COLLECTION;

let client = new MongoClient(process.env.MONGO_URL + dbName),
    db = client.db(dbName),
    likeCollection = db.collection(dbName),
    countOfLikeCollection = db.collection(countCollectionForLike);

client.connect();

db.listCollections({name: dbName}).next((err, isExist) => {

    if (!isExist) {
        db.createCollection(dbName);
        db.createCollection(countCollectionForLike);
    }

});

export default class Db {

    static close() {
        client.close();
    }

    static async getMaxLikes(bookId: any): Promise<any> {

        let result = await countOfLikeCollection.findOne({bookId: bookId}, {
            projection: {
                _id: 0,
                count: 1
            }
        });

        this.close();

        return Util.isDefined(result) ? result.count : false;
    }

    static async getListOfBookIdForMostLikes(): Promise<any> {
        let result = await countOfLikeCollection.find({}, {
            projection: {
                _id: 0,
                bookId: 1
            }
        }).sort({count: -1}).limit(25);

        this.close();

        return result;
    }

    static async getListOfBookForMostLikes(listOfBookId: string[]): Promise<any> {
        let result = await countOfLikeCollection.find({
            bookId: {
                $in: [listOfBookId]
            }
        }, {
            projection: {
                _id: 0
            }
        });

        this.close();

        return result;
    }

    static async updateLike(bookId: string, userId: string): Promise<void> {

        await likeCollection.findOneAndUpdate({
            bookId: bookId,
            userId: userId
        }, {$set: {bookId: bookId, userId: userId}}, {upsert: true});

        this.close();
    }

    static async insertCountForLike(bookId: string): Promise<void> {

        await countOfLikeCollection.insertOne({
            bookId: bookId,
            count: 1
        });

        this.close();
    }

    static async updateCountForLike(bookId: string, count: number): Promise<void> {

        await countOfLikeCollection.updateOne({
            bookId: bookId
        }, {
            count: count
        });

        this.close();
    }

    static async deleteLike(bookId: string, userId: string): Promise<void> {

        await likeCollection.findOneAndDelete({
            bookId: bookId,
            userId: userId
        });

        this.close();
    }


}