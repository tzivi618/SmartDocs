// src/components/profile/Profile.tsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Calendar } from 'lucide-react';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import Card from '../ui/Card';
import Notification from '../ui/Notification';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile({ name, email });
      setNotification({ type: 'success', message: 'הפרופיל עודכן בהצלחה' });
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">הפרופיל שלי</h1>
        <p className="text-gray-600">נהל את פרטי החשבון שלך</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full ml-4">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{user?.name}</h3>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="שם מלא"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="הכנס שם מלא"
            />

            <InputField
              label="כתובת אימייל"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@gmail.com"
            />

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 ml-2" />
                <span>תאריך הצטרפות: {user?.createdAt && formatDate(user.createdAt)}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                loading={loading}
                disabled={loading}
              >
                שמור שינויים
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

export default Profile;