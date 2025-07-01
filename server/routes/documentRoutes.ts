//route/documentRoutes.ts
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import uploadMiddleware from '../middlewares/uploadMiddleware';
import { validateFields } from '../middlewares/validateFields';
import {
  upload as uploadDocument,
  getAll,
  getOne,
  update,
  remove,
} from '../controllers/documentController';

const router = express.Router();

router.use(authMiddleware);

router.post(
  '/upload',
  uploadMiddleware.single('file'),
  validateFields(['title']),
  uploadDocument
);

router.get('/', getAll);
router.get('/:id', getOne);
router.patch(
  '/:id',
  uploadMiddleware.single('file'),
  update
);


router.delete('/:id', remove);

export default router;
