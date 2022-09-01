import RouterInterface from './src/middleware/RouterInterface';
import Db from "./src/model/Db";


RouterInterface.start();

Db.createDatabase();