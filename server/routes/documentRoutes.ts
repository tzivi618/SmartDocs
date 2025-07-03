//route/documentRoutes.ts
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import uploadMiddleware from '../middlewares/uploadMiddleware';
import {
  upload as uploadDocument,
  getAll,
  getOne,
  update,
  remove,
  removeAllUserDocuments,
  download,
} from '../controllers/documentController';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest';
import { validateObjectId } from '../middlewares/validateObjectId';

const router = express.Router();

router.use(authMiddleware);

router.post(
  '/upload',
  uploadMiddleware.single('file'),
  [
    body('title')
      .isLength({ max: 100 })
      .withMessage('Title must be up to 100 characters'),
  ],
  validateRequest,
  uploadDocument
);

router.get('/', getAll);
router.get('/:id', validateObjectId('id'), getOne);
router.patch(
  '/:id',
  validateObjectId('id'),
  [
    body('title')
      .optional()
      .isLength({ max: 100 })
      .withMessage('Title must be up to 100 characters'),
  ],
  uploadMiddleware.single('file'),
  update
);

router.delete('/delete-all', removeAllUserDocuments);
router.delete('/:id',validateObjectId('id'), remove);
router.get('/download/:id', validateObjectId('id'), download);

export default router;