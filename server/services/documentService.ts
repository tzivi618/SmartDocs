//services/documentService.ts
import DocumentModel from '../models/Document';
import { IDocument } from '../interfaces/IDocument';
import fs from 'fs/promises';

const createDocument = async (data: IDocument) => {
  const doc = new DocumentModel(data);
  return await doc.save();
};

const getUserDocuments = async (userId: string) => {
  return await DocumentModel.find({ owner: userId });
};

const getDocumentById = async (id: string, userId: string) => {
  return await DocumentModel.findOne({ _id: id, owner: userId });
};

const updateDocument = async (id: string, ownerId: string, updateFields: Partial<{ title: string }>) => {
  return await DocumentModel.findOneAndUpdate(
    { _id: id, owner: ownerId },
    { $set: updateFields },
    { new: true }
  );
};

const deleteDocument = async (id: string, userId: string): Promise<boolean> => {
  const doc = await DocumentModel.findOne({ _id: id, owner: userId });
  if (!doc) {
    return false;
  }
  try {
    if(!deleteOnlyFile(doc.filePath)) {
      return false;
    }
    await DocumentModel.deleteOne({ _id: id });
    return true;
  } catch (error) {
    console.error('Failed to delete Document:', error);
    return false;
  }
};
const deleteOnlyFile = async (filePath: string): Promise<boolean> => {
  try {
    await fs.unlink(filePath);
    return true;
  } catch (error) {
    console.error('Failed to delete file:', error);
    return false;
  }
};

export default {
  createDocument,
  getUserDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  deleteOnlyFile
};
