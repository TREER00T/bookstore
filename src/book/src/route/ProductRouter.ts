import * as express from 'express';
import BookController from '../controller/BookController';

let router = express.Router();

router.get('/books', BookController.getBooks);
router.get('/books/:id', BookController.getDetailBook);
router.post('/book', BookController.addBook);
router.put('/books/:id', BookController.editBook);
router.delete('/books/:id', BookController.deleteBook);

export default router