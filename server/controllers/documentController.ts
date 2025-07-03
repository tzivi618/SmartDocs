//controllers/documentController.ts
import { Request, Response } from 'express';
import documentService from '../services/documentService';
import { IDocument } from '../interfaces/IDocument';
import path from 'path';
import { logger } from '../config/logger';

export const upload = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = (req as any).user.id;
    const filePath = req.file?.path;
    if (!filePath) {
      logger.info('Upload failed: No file uploaded');
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }
    const title = req.body.title || req.file?.originalname || 'Untitled document';
    const document = await documentService.createDocument({ title, filePath, owner });
    logger.info(`Document uploaded: ${document._id} by user: ${owner}`);
    res.status(201).json(document);
  } catch (err: any) {
    logger.error(`Document upload failed: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = (req as any).user.id;
    const docs = await documentService.getUserDocuments(owner);
    res.json(docs);
  } catch (err: any) {
    logger.error(`Fetching documents failed: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = (req as any).user.id;
    const doc = await documentService.getDocumentById(req.params.id, owner);
    if (!doc) {
      logger.info(`Document not found: ${req.params.id} for user: ${owner}`);
      res.status(404).json({ message: 'Document not found' });
      return;
    }
    res.json(doc);
  } catch (err: any) {
    logger.error(`Fetching document failed: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = (req as any).user.id;
    const docId = req.params.id;
    const existingDoc = await documentService.getDocumentById(docId, owner);
    if (!existingDoc) {
      logger.info(`Update failed - Document not found or unauthorized: ${docId} for user: ${owner}`);
      res.status(404).json({ message: 'Document not found or unauthorized' });
      return;
    }

    const updateFields: Partial<IDocument> = {};
    if (req.file) {
      await documentService.deleteOnlyFile(existingDoc.filePath);
      updateFields.filePath = req.file.path;
    }
    if (req.body?.title) {
      updateFields.title = req.body.title;
    }

    const updatedDoc = await documentService.updateDocument(docId, owner, updateFields);
    logger.info(`Document updated: ${docId} by user: ${owner}`);
    res.json(updatedDoc);
  } catch (err: any) {
    logger.error(`Update document failed: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = (req as any).user.id;
    const docId = req.params.id;
    const deleted = await documentService.deleteDocument(docId, owner);
    if (!deleted) {
      logger.info(`Delete failed - Document not found or unauthorized: ${docId} for user: ${owner}`);
      res.status(404).json({ message: 'Document not found or unauthorized' });
      return;
    }
    logger.info(`Document deleted: ${docId} by user: ${owner}`);
    res.json({ message: 'Document deleted' });
  } catch (err: any) {
    logger.error(`Delete document failed: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export const removeAllUserDocuments = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const deletedCount = await documentService.deleteAllUserDocuments(userId);
    logger.info(`Deleted ${deletedCount} documents for user: ${userId}`);
    res.json({ message: `${deletedCount} documents deleted.` });
  } catch (err: any) {
    logger.error(`Delete all documents failed: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export const download = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = (req as any).user.id;
    const docId = req.params.id;
    const doc = await documentService.downloadDocument(docId, owner);
    if (!doc) {
      logger.info(`Download failed - Document not found or unauthorized: ${docId} for user: ${owner}`);
      res.status(404).json({ message: 'Document not found or unauthorized' });
      return;
    }
    res.download(path.resolve(doc.filePath), doc.title || 'document');
  } catch (err: any) {
    logger.error(`Download document failed: ${err.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};
