/**
 * Mongoose Chat model.
 */
import mongoose, { Schema, Document as Doc } from 'mongoose';

export interface IChat extends Doc {
  documentId: mongoose.Types.ObjectId;
  question: string;
  answer: string;
  createdAt: Date;
}

const chatSchema: Schema = new Schema({
  documentId: { type: mongoose.Types.ObjectId, ref: 'Document', required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IChat>('Chat', chatSchema);
