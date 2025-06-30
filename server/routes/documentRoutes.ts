
//documentRoutes.ts
import express from 'express';
import authMiddleware  from '../middlewares/authMiddleware';
const router = express.Router();

import {
  create as createDocument,
  getAll as getAllDocuments,
  getOne as getDocument,
  update as updateDocument,
  remove as deleteDocument,
} from '../controllers/documentController';


router.use(authMiddleware); // Require auth for all routes below

router.post('/', createDocument);
router.get('/', getAllDocuments);
router.get('/:id', getDocument);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

export default router;
