// src/components/documents/DocumentsList.tsx
import React, { useState } from 'react';
import { useDocuments } from '../../hooks/useDocuments';
import { Download, Trash2, FileText, Calendar } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Notification from '../ui/Notification';

const DocumentsList: React.FC = () => {
  const { documents, loading, error, deleteDocument, downloadDocument } = useDocuments();
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`האם אתה בטוח שברצונך למחוק את המסמך "${title}"?`)) {
      try {
        await deleteDocument(id);
        setNotification({ type: 'success', message: 'המסמך נמחק בהצלחה' });
      } catch (err: any) {
        setNotification({ type: 'error', message: err.message });
      }
    }
  };

  const handleDownload = async (id: string, filename: string) => {
    try {
      await downloadDocument(id, filename);
      setNotification({ type: 'success', message: 'המסמך הורד בהצלחה' });
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">טוען מסמכים...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">
          <p>{error}</p>
        </div>
        <Button onClick={() => window.location.reload()}>נסה שוב</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">המסמכים שלי</h1>
        <p className="text-gray-600">נהל את כל המסמכים שלך במקום אחד</p>
      </div>

      {documents.length === 0 ? (
        <Card className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">אין מסמכים עדיין</h3>
          <p className="text-gray-600 mb-4">התחל להעלות מסמכים כדי לראות אותם כאן</p>
          <Button onClick={() => window.location.href = '/upload'}>
            העלה מסמך ראשון
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{doc.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4 ml-1" />
                      <span>{formatDate(doc.uploadedAt)}</span>
                      <span className="mx-2">•</span>
                      <span>{formatFileSize(doc.filesize)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(doc.id, doc.filename)}
                  >
                    <Download className="h-4 w-4 ml-1" />
                    הורד
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(doc.id, doc.title)}
                  >
                    <Trash2 className="h-4 w-4 ml-1" />
                    מחק
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default DocumentsList;