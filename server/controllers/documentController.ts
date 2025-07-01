//controllers/documentController.ts
import { Request, Response } from 'express';
import documentService from '../services/documentService';
import { IDocument } from '../interfaces/IDocument';

export const upload = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = (req as any).user.id;
    const filePath = req.file?.path;

    if (!filePath) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const title = req.body.title || req.file?.originalname || 'Untitled document';

    const document = await documentService.createDocument({
      title,
      filePath,
      owner,
    });

    res.status(201).json(document);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = (req as any).user.id;
    const docs = await documentService.getUserDocuments(owner);
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = (req as any).user.id;
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
    
    const owner = (req as any).user.id;
    const docId = req.params.id;
    const existingDoc = await documentService.getDocumentById(docId, owner);
    if (!existingDoc) {
      res.status(404).json({ message: 'Document not found or unauthorized' });
      return;
    }    
    const updateFields: Partial<IDocument> = {};

    if (req.file) {
      await documentService.deleteOnlyFile(existingDoc.filePath);
      updateFields.filePath = req.file.path;
    }

    if (req.body.title) {
      updateFields.title = req.body.title;
    }

    const updatedDoc = await documentService.updateDocument(docId, owner, updateFields);
    res.json(updatedDoc);

  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner = (req as any).user.id;
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
