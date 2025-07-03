import { ObjectId } from "mongoose";

//interfaces/IDocument.ts
export interface IDocument {
  _id?: string;
  title?: string;
  filePath: string;
  owner: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
