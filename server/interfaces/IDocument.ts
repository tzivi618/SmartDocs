export interface IDocument {
    _id?: string;
    title?: string;
    filePath: string;
    owner: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  