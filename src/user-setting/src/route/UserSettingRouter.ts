import * as express from 'express';
import UserSettingController from '../controller/UserSettingController';

let router = express.Router();

router.get('/info/:id', UserSettingController.getInfo);
router.post('/info', UserSettingController.setInfo);
router.get('/privacy/:id', UserSettingController.getPrivacy);
router.post('/privacy', UserSettingController.setPrivacy);
router.put('/changePassword', UserSettingController.changePassword);

export default router