/**
 * Mongoose Document model.
 */
import mongoose, { Schema, Document as Doc } from 'mongoose';

export interface IDocument extends Doc {
  userId: mongoose.Types.ObjectId;
  title: string;
  filename: string;
  uploadDate: Date;
}

const documentSchema: Schema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  filename: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now }
});

export default mongoose.model<IDocument>('Document', documentSchema);
