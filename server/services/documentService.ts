//services/documentService.ts
import DocumentModel from '../models/Document';
import { IDocument } from '../interfaces/IDocument';

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

const updateDocument = async (id: string, data: Partial<IDocument>, userId: string) => {
  return await DocumentModel.findOneAndUpdate(
    { _id: id, owner: userId },
    data,
    { new: true }
  );
};

const deleteDocument = async (id: string, userId: string) => {
  return await DocumentModel.findOneAndDelete({ _id: id, owner: userId });
};

export default {
  createDocument,
  getUserDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument
};
