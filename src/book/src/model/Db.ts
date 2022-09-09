import {MongoClient} from 'mongodb';
import {config} from 'dotenv';
import Util from '../util/Util';

config();

let dbName = process.env.MONGO_DB;

let client = new MongoClient(process.env.MONGO_URL + dbName),
    db = client.db(dbName),
    collection = db.collection(dbName);

client.connect();

db.listCollections({name: dbName}).next((err, isExist) => {

    if (!isExist)
        db.createCollection(dbName);
});


export default class Db {

    static close() {
        client.close();
    }

    static async getBooks(filter: any | {}): Promise<any> {

        let result = await collection.find(filter, {
            projection: {
                title: 1,
                price: 1,
                img: 1,
                genre: 1,
                availableQuantity: 1,
                publisher: 1,
                author: 1
            }
        });

        this.close();

        return Util.isDefined(result) ? result : false;
    }

    static async getDetailBook(id: string): Promise<any> {

        let result = await collection.findOne({
            _id: id
        });

        this.close();

        return Util.isDefined(result) ? result : false;
    }


    static async update(id: string, data: any): Promise<void> {

        await collection.findOneAndUpdate({
            _id: id
        }, {$set: data}, {upsert: true});

        this.close();
    }

    static async delete(id: string): Promise<void> {

        await collection.findOneAndDelete({
            _id: id
        });

        this.close();
    }


}