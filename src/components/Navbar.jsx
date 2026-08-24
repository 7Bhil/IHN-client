import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu, X, Calendar, GraduationCap, ShieldCheck, Home, Bell } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Accueil', icon: Home, public: true },
    { id: 'events', label: 'Événements', icon: Calendar, public: true },
    { id: 'formations', label: 'Formations', icon: GraduationCap, public: true },
    { id: 'certificates', label: 'Vérifier Attestation', icon: ShieldCheck, public: true },
  ];

  if (user && user.role === 'admin') {
    navLinks.push(
      { id: 'dashboard', label: 'Tableau de bord', icon: ShieldCheck, public: false },
      { id: 'bulk-email', label: 'Envoyer E-mail', icon: Bell, public: false }
    );
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo & Brand Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <img 
              src="/logo.png" 
              alt="IHN Logo" 
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            <div>
              <span className="text-xl font-bold text-gray-900 tracking-tight block leading-tight">
                Centre Culturel <span className="text-ihn-green">IHN</span>
              </span>
              <span className="text-xs font-semibold text-ihn-light-green tracking-wider uppercase">
                Institut & Culture
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-ihn-green text-white shadow-md shadow-ihn-green/20'
                      : 'text-gray-600 hover:text-ihn-green hover:bg-ihn-green/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-ihn-yellow' : 'text-gray-400'}`} />
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Desktop Right Auth Action */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200/80 rounded-full pl-4 pr-1 py-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-ihn-green text-white flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-gray-800 leading-tight">{user.name}</p>
                    <span className="inline-block bg-ihn-yellow/20 text-ihn-green text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                      {user.role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  title="Se déconnecter"
                  className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('login')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ihn-green text-white font-semibold text-sm hover:bg-ihn-green/90 transition-all shadow-md shadow-ihn-green/20 hover:shadow-lg hover:shadow-ihn-green/30"
              >
                <User className="w-4 h-4 text-ihn-yellow" />
                Espace Admin
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-ihn-green hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-semibold text-sm transition-colors ${
                  isActive
                    ? 'bg-ihn-green text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-ihn-yellow' : 'text-gray-400'}`} />
                {link.label}
              </button>
            );
          })}
          <div className="pt-4 border-t border-gray-100">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-semibold text-sm"
              >
                <LogOut className="w-4 h-4" />
                Se déconnecter ({user.name})
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveTab('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-ihn-green text-white font-semibold text-sm shadow-md"
              >
                <User className="w-4 h-4 text-ihn-yellow" />
                Espace Administration
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
