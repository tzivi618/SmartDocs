// src/hooks/useDocuments.ts
import { useState, useEffect } from 'react';
import { Document } from '../types';
import api from '../services/api';
import toast from 'react-hot-toast';
import axios from 'axios';

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

    const blob = new Blob([response.data], { type: response.data.type });
    const url = window.URL.createObjectURL(blob);

    const disposition = response.headers['content-disposition'];
    const match = disposition?.match(/filename="?([^"]+)"?/);
    const filename = match ? decodeURIComponent(match[1]) : 'download';

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error('Download failed:', err);
    toast.error('ההורדה נכשלה');
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