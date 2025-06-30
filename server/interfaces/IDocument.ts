//interfaces/IDocument.ts
export interface IDocument {
    _id?: string;
    title: string;
    content: string;
    owner: string;
    createdAt?: Date;
    updatedAt?: Date;
}
