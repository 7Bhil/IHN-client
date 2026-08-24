import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/AdminLayout';

import Home from './pages/Home';
import Events from './pages/Events';
import Formations from './pages/Formations';
import Payments from './pages/Payments';
import Certificates from './pages/Certificates';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import AdminEvents from './pages/AdminEvents';
import AdminFormations from './pages/AdminFormations';
import AdminNotifications from './pages/AdminNotifications';

const ProtectedAdminRoute = () => {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return <AdminLayout />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Site Workspace */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="events" element={<Events />} />
            <Route path="formations" element={<Formations />} />
            <Route path="payments" element={<Payments />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* Dedicated Back-Office Admin Portal Workspace */}
          <Route path="/admin" element={<ProtectedAdminRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="formations" element={<AdminFormations />} />
            <Route path="notifications" element={<AdminNotifications />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
