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

    static async getInfo(id: string): Promise<any> {

        let result = await collection.findOne({
            _id: id
        }, {
            projection: {
                _id: 0,
                fname: 1,
                lname: 1,
                bio: 1,
                img: 1,
                age: 1,
                verifiedBadge: 1
            }
        });

        this.close();

        return Util.isDefined(result) ? result : false;
    }

    static async isExistUser(id: string): Promise<any> {

        let result = await collection.findOne({
            _id: id
        });

        this.close();
        return Util.isDefined(result);
    }

    static async setInfo(id: string, data: any): Promise<any> {

        await collection.findOneAndUpdate({
            _id: id
        }, {$set: data}, {upsert: true});

        this.close();
    }


}