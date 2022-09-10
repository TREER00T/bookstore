import * as express from 'express';
import LikeController from '../controller/LikeController';

let router = express.Router();

router.get('/mostLikes', LikeController.getListOfBookIdForMostLikes)
router.get('/likes/:bookId', LikeController.getMaxLikes);
router.delete('/likes', LikeController.deleteLike);
router.post('/likes', LikeController.addLike);

export default router