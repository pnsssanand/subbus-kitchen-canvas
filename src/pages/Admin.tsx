
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../firebase/hooks';
import LoginForm from '../components/LoginForm';
import AdminDashboard from '../components/AdminDashboard';

const Admin = () => {
  const { currentUser, loading } = useAuth();

  // Update page metadata
  useEffect(() => {
    document.title = "Admin Dashboard | gemini's foods";
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-restaurant-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin h-10 w-10 border-4 border-restaurant-yellow border-t-transparent rounded-full"></div>
          <p className="mt-4 text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return currentUser ? <AdminDashboard /> : <LoginForm />;
};

export default Admin;
