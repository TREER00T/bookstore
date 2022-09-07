import * as express from 'express';
import AuthController from '../controller/AuthController';

let router = express.Router();

router.post('/signUp', AuthController.signUp);
router.post('/signIn', AuthController.signIn);
router.post('/refreshToken', AuthController.refreshToken);

export default router