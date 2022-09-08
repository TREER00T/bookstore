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


    static async isExistUser(email: string): Promise<any> {

        let result = await collection.findOne({
            email: email
        }, {
            projection:
                {
                    _id: 0,
                    apiKey: 1
                }
        });

        this.close();
        return Util.isDefined(result) ? result.apikey : false;
    }

    static async isValidaId(id: string): Promise<any> {

        let result = await collection.findOne({
            _id: id
        });

        this.close();
        return Util.isDefined(result);
    }

    static async insertUser(data: any) {

        await collection.insertOne(data);

        this.close();

    }

    static async isSignIn(email: string, password: string): Promise<boolean> {

        let result = await collection.findOne({
            password: password,
            email: email
        });

        this.close();
        return Util.isDefined(result);
    }

}