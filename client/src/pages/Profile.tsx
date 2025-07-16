// // src/pages/Profile.tsx
// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Typography,
//   Alert,
// } from '@mui/material';
// import { AccountCircle } from '@mui/icons-material';
// import { useAuth } from '../contexts/AuthContext';
// import { Layout } from '../components/layout/Layout';

// export const Profile: React.FC = () => {
//   const { user, updateProfile } = useAuth();
//   const [name, setName] = useState(user?.name || '');
//   const [email, setEmail] = useState(user?.email || '');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
    
//     try {
//       setLoading(true);
//       await updateProfile({ name, email });
//       setSuccess('Profile updated successfully!');
//     } catch (error: any) {
//       const message = error.response?.data?.message || 'Failed to update profile. Please try again.';
//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) return null;

//   return (
//     <Layout>
//       <Box sx={{ maxWidth: 600, mx: 'auto' }}>
//         <Box sx={{ mb: 4 }}>
//           <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
//             <AccountCircle sx={{ mr: 2, color: 'primary.main' }} />
//             Profile Settings
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             Update your personal information and account settings.
//           </Typography>
//         </Box>

//         <Card>
//           <CardContent sx={{ p: 4 }}>
//             {success && (
//               <Alert severity="success" sx={{ mb: 3 }}>
//                 {success}
//               </Alert>
//             )}
            
//             {error && (
//               <Alert severity="error" sx={{ mb: 3 }}>
//                 {error}
//               </Alert>
//             )}

//             <Box component="form" onSubmit={handleSubmit} sx={{ space: 3 }}>
//               <TextField
//                 fullWidth
//                 label="Full Name"
//                 type="text"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 margin="normal"
//               />

//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 margin="normal"
//               />

//               <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                   Account created: {new Date(user.createdAt).toDateString()}
//                 </Typography>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   size="large"
//                   disabled={loading}
//                 >
//                   {loading ? 'Updating...' : 'Update Profile'}
//                 </Button>
//               </Box>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//     </Layout>
//   );
// };

// src/pages/Profile.tsx
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Typography,
//   Alert,
// } from '@mui/material';
// import { AccountCircle } from '@mui/icons-material';
// import { useAuth } from '../contexts/AuthContext';
// import { Layout } from '../components/layout/Layout';

// export const Profile: React.FC = () => {
//   const { user, updateProfile } = useAuth();
//   const [name, setName] = useState(user?.name || '');
//   const [email, setEmail] = useState(user?.email || '');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

//   const hasChanges = name !== user?.name || email !== user?.email;
//   const hasEmptyFields = !name.trim() || !email.trim();

//   const validateForm = () => {
//     const errors: Record<string, string> = {};
//     if (!name.trim()) {
//       errors.name = 'Full name is required';
//     }
//     if (!email.trim()) {
//       errors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       errors.email = 'Please enter a valid email address';
//     }
//     setFieldErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (!validateForm()) return;
//     if (!hasChanges) return;

//     try {
//       setLoading(true);
//       await updateProfile({ name, email });
//       setSuccess('Profile updated successfully!');
//     } catch (error: any) {
//       const message = error.response?.data?.message || 'Failed to update profile. Please try again.';
//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => setSuccess(''), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [success]);

//   useEffect(() => {
//     if (error) {
//       const timer = setTimeout(() => setError(''), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   if (!user) return null;

//   return (
//     <Layout>
//       <Box sx={{ maxWidth: 600, mx: 'auto' }}>
//         <Box sx={{ mb: 4 }}>
//           <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
//             <AccountCircle sx={{ mr: 2, color: 'primary.main' }} />
//             Profile Settings
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             Update your personal information and account settings.
//           </Typography>
//         </Box>

//         <Card>
//           <CardContent sx={{ p: 4 }}>
//             {success && (
//               <Alert severity="success" sx={{ mb: 3 }}>
//                 {success}
//               </Alert>
//             )}

//             {error && (
//               <Alert severity="error" sx={{ mb: 3 }}>
//                 {error}
//               </Alert>
//             )}

//             <Box component="form" onSubmit={handleSubmit}>
//               <TextField
//                 fullWidth
//                 label="Full Name"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 margin="normal"
//                 error={!!fieldErrors.name}
//                 helperText={fieldErrors.name}
//               />

//               <TextField
//                 fullWidth
//                 label="Email Address"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 margin="normal"
//                 error={!!fieldErrors.email}
//                 helperText={fieldErrors.email}
//               />

//               <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                   Account created: {new Date(user.createdAt).toDateString()}
//                 </Typography>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   size="large"
//                   disabled={loading || !hasChanges || hasEmptyFields}
//                 >
//                   {loading ? 'Updating...' : 'Update Profile'}
//                 </Button>
//               </Box>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//     </Layout>
//   );
// };

// src/pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { Layout } from '../components/layout/Layout';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const hasChanges = name !== user?.name || email !== user?.email;
  const hasErrors = Object.keys(fieldErrors).length > 0;

  const validateField = (field: string, value: string) => {
    let error = '';
    if (field === 'name') {
      if (!value.trim()) {
        error = 'Full name is required';
      }
    }
    if (field === 'email') {
      if (!value.trim()) {
        error = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = 'Please enter a valid email address';
      }
    }

    setFieldErrors((prev) => {
      if (!error) {
        const { [field]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [field]: error };
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    validateField('name', value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateField('email', value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasErrors || !hasChanges) return;

    setError('');
    setSuccess('');
    try {
      setLoading(true);
      await updateProfile({ name, email });
      setSuccess('Profile updated successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update profile. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!user) return null;

  return (
    <Layout>
      <Box sx={{ maxWidth: 600, mx: 'auto' }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountCircle sx={{ mr: 2, color: 'primary.main' }} />
            Profile Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Update your personal information and account settings.
          </Typography>
        </Box>

        <Card>
          <CardContent sx={{ p: 4 }}>
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                type="text"
                value={name}
                onChange={handleNameChange}
                margin="normal"
                error={!!fieldErrors.name}
                helperText={fieldErrors.name}
              />

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={handleEmailChange}
                margin="normal"
                error={!!fieldErrors.email}
                helperText={fieldErrors.email}
              />

              <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Account created: {new Date(user.createdAt).toDateString()}
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading || !hasChanges || hasErrors}
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

