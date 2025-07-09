// src/hooks/useDocuments.ts
import { useState, useEffect } from 'react';
import axiosInstance from '../lib/axios';
import { Document } from '../types';

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get('/api/documents');
      setDocuments(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'שגיאה בטעינת המסמכים');
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (file: File, title: string) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);

      const response = await axiosInstance.post('/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setDocuments(prev => [...prev, response.data.data]);
      return response.data.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'שגיאה בהעלאת המסמך');
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      await axiosInstance.delete(`/api/documents/${id}`);
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'שגיאה במחיקת המסמך');
    }
  };

  const downloadDocument = async (id: string, filename: string) => {
    try {
      const response = await axiosInstance.get(`/api/documents/download/${id}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'שגיאה בהורדת המסמך');
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
    downloadDocument,
  };
};