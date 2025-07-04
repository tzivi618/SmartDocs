//modeles/Document.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IDocument } from '../interfaces/IDocument';

const DocumentSchema: Schema = new Schema<IDocument>(
  {
    title: { type: String },
    filePath: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IDocument & Document>('Document', DocumentSchema);
