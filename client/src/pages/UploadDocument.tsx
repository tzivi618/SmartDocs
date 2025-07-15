// src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
} from '@mui/material';
import { CloudUpload, ArrowBack } from '@mui/icons-material';
import { useDocuments } from '../hooks/useDocuments';
import { Layout } from '../components/layout/Layout';

export const UploadDocument: React.FC = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const { uploadDocument } = useDocuments();
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      if (!title) {
        setTitle(droppedFile.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setError('');
    try {
      setLoading(true);
      await uploadDocument(file, title);
      navigate('/documents');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to upload document. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/documents')}
            sx={{ mb: 2 }}
          >
            Back to Documents
          </Button>
          
          <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <CloudUpload sx={{ mr: 2, color: 'primary.main' }} />
            Upload Document
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Add a new document to your collection.
          </Typography>
        </Box>

        <Card>
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ space: 3 }}>
              <TextField
                fullWidth
                label="Document Title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
              />

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Select File
                </Typography>
                <Paper
                  sx={{
                    border: 2,
                    borderStyle: 'dashed',
                    borderColor: dragActive ? 'primary.main' : file ? 'success.main' : 'grey.300',
                    bgcolor: dragActive ? 'primary.50' : file ? 'success.50' : 'background.paper',
                    p: 4,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'primary.50',
                    },
                  }}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0,
                      cursor: 'pointer',
                    }}
                    required
                  />
                  
                  {file ? (
                    <Box>
                      <CloudUpload sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                      <Typography variant="h6" color="success.main" gutterBottom>
                        {file.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Click to change file
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <CloudUpload sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="body1" gutterBottom>
                        Drop your file here, or{' '}
                        <Typography component="span" color="primary" sx={{ fontWeight: 500 }}>
                          browse
                        </Typography>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Supports all file types
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/documents')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading || !file || !title}
                >
                  {loading ? 'Uploading...' : 'Upload Document'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};