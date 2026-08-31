import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';

import Home from './pages/Home';
import Events from './pages/Events';
import Formations from './pages/Formations';
import Payments from './pages/Payments';
import Certificates from './pages/Certificates';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Site Workspace */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="formations" element={<Formations />} />
          <Route path="payments" element={<Payments />} />
          <Route path="certificates" element={<Certificates />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
