// src/components/documents/UploadDocument.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDocuments } from '../../hooks/useDocuments';
import { Upload, FileText } from 'lucide-react';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import Card from '../ui/Card';
import Notification from '../ui/Notification';

const UploadDocument: React.FC = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);

  const { uploadDocument } = useDocuments();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.split('.').slice(0, -1).join('.'));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      setNotification({ type: 'warning', message: 'יש לבחור קובץ ולהזין כותרת' });
      return;
    }

    setLoading(true);
    try {
      await uploadDocument(file, title);
      setNotification({ type: 'success', message: 'המסמך הועלה בהצלחה' });
      setTimeout(() => navigate('/documents'), 1500);
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">העלאת מסמך</h1>
        <p className="text-gray-600">הוסף מסמך חדש לאוסף שלך</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="כותרת המסמך"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="הכנס כותרת למסמך"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                בחר קובץ
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>בחר קובץ</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                        required
                      />
                    </label>
                    <p className="pr-1">או גרור ושחרר כאן</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX, TXT, JPG, PNG עד 10MB
                  </p>
                </div>
              </div>
            </div>

            {file && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-600 ml-2" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">{file.name}</p>
                    <p className="text-xs text-blue-700">{formatFileSize(file.size)}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4 space-x-reverse">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/documents')}
              >
                ביטול
              </Button>
              <Button
                type="submit"
                loading={loading}
                disabled={!file || !title}
              >
                העלה מסמך
              </Button>
            </div>
          </form>
        </Card>
      </div>

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

export default UploadDocument;