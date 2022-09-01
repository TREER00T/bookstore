import {MongoClient} from 'mongodb';
import {config} from 'dotenv';

config();

let dbName = process.env.MONGO_DB;


export default class Db {

    static createDatabase() {

        MongoClient.connect(process.env.MONGO_URL).then(client => {
            let db = client.db(dbName);

            db.listCollections({name: dbName}).next((err, isExist) => {

                if (!isExist)
                    db.createCollection(dbName);
            });
        });

    }

}