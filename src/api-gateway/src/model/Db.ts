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

    static async isValidUserApikey(id: string, apiKey: string): Promise<any> {

        let result = await collection.findOne({
            _id: id,
            apiKey: apiKey
        }, {
            projection:
                {
                    _id: 0,
                    apikey: 1
                }
        });

        return Util.isDefined(result) ? result : false;
    }

}