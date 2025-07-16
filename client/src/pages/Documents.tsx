// src/pages/Documents.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Grid,
  CircularProgress,
} from '@mui/material';


import {
  Description as DocumentIcon,
  Download,
  Delete,
  Add,
} from '@mui/icons-material';
import { useDocuments } from '../hooks/useDocuments';
import { Layout } from '../components/layout/Layout';

export const Documents: React.FC = () => {
  const { documents, loading, downloadDocument, deleteDocument } = useDocuments();
  
  console.log('Documents component mounted');

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDownload = async (id: string) => {
    await downloadDocument(id);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      await deleteDocument(id);
    }
  };

  if (loading) {
  console.log("Loading documents...");
  
    return (
      <Layout>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <DocumentIcon sx={{ mr: 2, color: 'primary.main' }} />
            My Documents
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and organize your uploaded documents.
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/upload"
          variant="contained"
          startIcon={<Add />}
          size="large"
        >
          Upload Document
        </Button>
      </Box>

      {documents.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <DocumentIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No documents yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Get started by uploading your first document.
            </Typography>
            <Button
              component={Link}
              to="/upload"
              variant="contained"
              startIcon={<Add />}
            >
              Upload Document
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {documents.map((doc) => (
            // <Grid item xs={12} sm={6} md={4} key={doc.id}>
            <Card key={doc._id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <DocumentIcon sx={{ color: 'primary.main', fontSize: 32 }} />
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleDownload(doc._id)}
                        color="primary"
                      >
                        <Download />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(doc._id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>

                  <Typography variant="h6" gutterBottom noWrap>
                    {doc.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1 }}>
                    {doc.filename}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatFileSize(doc.size)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            // </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
};
