import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Events from './pages/Events';
import AdminEvents from './pages/AdminEvents';
import Formations from './pages/Formations';
import AdminFormations from './pages/AdminFormations';
import Payments from './pages/Payments';
import AdminNotifications from './pages/AdminNotifications';
import Certificates from './pages/Certificates';
import Dashboard from './pages/Dashboard';

function MainApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRegistrationForPayment, setSelectedRegistrationForPayment] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'events':
        return <Events />;
      case 'admin-events':
        return <AdminEvents />;
      case 'formations':
        return <Formations setActiveTab={setActiveTab} setSelectedRegistrationForPayment={setSelectedRegistrationForPayment} />;
      case 'admin-formations':
        return <AdminFormations />;
      case 'payments':
        return <Payments selectedRegistration={selectedRegistrationForPayment} />;
      case 'certificates':
        return <Certificates />;
      case 'bulk-email':
        return <AdminNotifications />;
      case 'login':
        return <Login setActiveTab={setActiveTab} />;
      default:
        return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 bg-ihn-green/10 rounded-full flex items-center justify-center text-ihn-green mb-4">
              <span className="font-extrabold text-xl">IHN</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 capitalize">Module {activeTab}</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md">
              Ce module est prêt pour l'intégration de la fonctionnalité correspondante.
            </p>
            <button
              onClick={() => setActiveTab('home')}
              className="mt-6 px-6 py-2.5 rounded-xl bg-ihn-green text-white font-semibold text-sm shadow-md"
            >
              Retour à l'accueil
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F8FAF8]">
      <div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main>{renderContent()}</main>
      </div>
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
