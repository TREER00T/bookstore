import * as express from 'express';
import UserSettingController from '../controller/UserSettingController';

let router = express.Router();

router.get('/info', UserSettingController.getInfo);

export default router