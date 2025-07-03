//services/documentService.ts
import DocumentModel from '../models/Document';
import { IDocument } from '../interfaces/IDocument';
import fs from 'fs/promises';
import { logger } from '../config/logger'; // הוספה: ייבוא logger

const createDocument = async (data: IDocument) => {
  logger.info(`Creating document for user: ${data.owner}`); // הוספה: log פעולה
  const doc = new DocumentModel(data);
  return await doc.save();
};

const getUserDocuments = async (userId: string) => {
  logger.info(`Fetching documents for user: ${userId}`); // הוספה: log פעולה
  return await DocumentModel.find({ owner: userId });
};

const getDocumentById = async (id: string, userId: string) => {
  logger.info(`Fetching document: ${id} for user: ${userId}`); // הוספה: log פעולה
  return await DocumentModel.findOne({ _id: id, owner: userId });
};

const updateDocument = async (id: string, ownerId: string, updateFields: Partial<{ title: string }>) => {
  logger.info(`Updating document: ${id} for user: ${ownerId}`); // הוספה: log פעולה
  return await DocumentModel.findOneAndUpdate({ _id: id, owner: ownerId }, { $set: updateFields }, { new: true });
};

const deleteDocument = async (id: string, userId: string): Promise<boolean> => {
  logger.info(`Deleting document: ${id} for user: ${userId}`); // הוספה: log פעולה
  const doc = await DocumentModel.findOne({ _id: id, owner: userId });
  if (!doc) {
    logger.warn(`Document not found: ${id}`); // הוספה: log אזהרה
    return false;
  }
  try {
    if (!await deleteOnlyFile(doc.filePath)) {
      return false;
    }
    await DocumentModel.deleteOne({ _id: id });
    logger.info(`Document deleted: ${id}`); // הוספה: log הצלחה
    return true;
  } catch (error) {
    logger.error(`Failed to delete document: ${id} - ${error}`); // הוספה: log שגיאה
    return false;
  }
};

const deleteOnlyFile = async (filePath: string): Promise<boolean> => {
  try {
    await fs.unlink(filePath);
    logger.info(`File deleted: ${filePath}`); // הוספה: log הצלחה
    return true;
  } catch (error) {
    logger.error(`Failed to delete file: ${filePath} - ${error}`); // הוספה: log שגיאה
    return false;
  }
};

const deleteAllUserDocuments = async (userId: string): Promise<number> => {
  logger.info(`Deleting all documents for user: ${userId}`); // הוספה: log פעולה
  const documents = await DocumentModel.find({ owner: userId });
  for (const doc of documents) {
    try {
      await fs.unlink(doc.filePath);
      logger.info(`Deleted file: ${doc.filePath}`); // הוספה: log הצלחה
    } catch (err) {
      logger.error(`Failed to delete file: ${doc.filePath} - ${err}`); // הוספה: log שגיאה
    }
  }
  const result = await DocumentModel.deleteMany({ owner: userId });
  logger.info(`Deleted ${result.deletedCount} documents for user: ${userId}`); // הוספה: log הצלחה
  return result.deletedCount ?? 0;
};

const downloadDocument = async (id: string, userId: string) => {
  logger.info(`Download document: ${id} for user: ${userId}`); // הוספה: log פעולה
  return await DocumentModel.findOne({ _id: id, owner: userId });
};

export default {
  createDocument,
  getUserDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  deleteOnlyFile,
  deleteAllUserDocuments,
  downloadDocument,
};
