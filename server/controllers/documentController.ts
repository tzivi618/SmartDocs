
import { Request, Response } from 'express';
import documentService from '../services/documentService';

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = (req as any).user.userId;
    const document = await documentService.createDocument({ ...req.body, owner });
    res.status(201).json(document);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = (req as any).user.userId;
    const docs = await documentService.getUserDocuments(owner);
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = (req as any).user.userId;
    const doc = await documentService.getDocumentById(req.params.id, owner);
    if (!doc) {
      res.status(404).json({ message: 'Document not found' });
      return;
    }
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = (req as any).user.userId;
    const updated = await documentService.updateDocument(req.params.id, req.body, owner);
    if (!updated) {
      res.status(404).json({ message: 'Document not found or unauthorized' });
      return;
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = (req as any).user.userId;
    const deleted = await documentService.deleteDocument(req.params.id, owner);
    if (!deleted) {
      res.status(404).json({ message: 'Document not found or unauthorized' });
      return;
    }
    res.json({ message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

