import * as express from 'express';
import AuthController from '../controller/AuthController';

let router = express.Router();

router.post('/generateUser', AuthController.generateUser);

export default router