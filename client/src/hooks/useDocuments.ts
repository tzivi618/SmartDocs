// src/hooks/useDocuments.ts
import { useState, useEffect } from 'react';
import { Document } from '../types';
import api from '../services/api';
import toast from 'react-hot-toast';

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    console.log('=== fetchDocuments called ===')
    try {
      setLoading(true);
      const response = await api.get('/documents');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (file: File, title: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    await fetchDocuments();
  };

  const downloadDocument = async (id: string) => {
    try {
      const response = await api.get(`/documents/download/${id}`, {
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
        : 'download';
      
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('Failed to download document');
    }
  };

  const deleteDocument = async (id: string) => {
    await api.delete(`/documents/${id}`);
    await fetchDocuments();
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    documents,
    loading,
    fetchDocuments,
    uploadDocument,
    downloadDocument,
    deleteDocument,
  };
};