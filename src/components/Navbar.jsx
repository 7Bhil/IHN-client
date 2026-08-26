import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu, X, Calendar, GraduationCap, ShieldCheck, Home, LayoutDashboard, CreditCard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/events', label: 'Événements', icon: Calendar },
    { path: '/formations', label: 'Formations', icon: GraduationCap },
    { path: '/certificates', label: 'Vérifier Attestation', icon: ShieldCheck },
    { path: '/payments', label: 'Paiement MoMo', icon: CreditCard },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo & Brand Title */}
          <Link to="/" className="flex items-center gap-3 group">
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
          </Link>

          {/* Desktop Public Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-ihn-green text-white shadow-md shadow-ihn-green/20'
                      : 'text-gray-600 hover:text-ihn-green hover:bg-ihn-green/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-ihn-yellow' : 'text-gray-400'}`} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action: Admin Workspace link or Login */}
          <div className="hidden md:flex items-center gap-3">
            {user && user.role === 'admin' ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ihn-dark text-white font-bold text-xs hover:bg-ihn-dark/90 transition-all shadow-md"
                >
                  <LayoutDashboard className="w-4 h-4 text-ihn-yellow" />
                  Espace Administration
                </Link>
                <button
                  onClick={logout}
                  title="Se déconnecter"
                  className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-ihn-green text-white font-semibold text-sm hover:bg-ihn-green/90 transition-all shadow-md shadow-ihn-green/20 hover:shadow-lg"
              >
                <User className="w-4 h-4 text-ihn-yellow" />
                Accès Admin
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Ouvrir le menu"
              className="p-2 rounded-xl text-gray-700 hover:text-ihn-green hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Right-to-Left Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop Blur */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-ihn-dark/60 backdrop-blur-sm transition-opacity duration-300"
          ></div>

          {/* Slide-over Drawer Panel (Right to Left) */}
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col justify-between p-6 z-10 animate-in slide-in-from-right duration-300">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="IHN" className="h-8 w-auto object-contain" />
                  <span className="font-extrabold text-sm text-gray-900">Centre IHN</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                        isActive
                          ? 'bg-ihn-green text-white shadow-md shadow-ihn-green/20'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-ihn-yellow' : 'text-gray-400'}`} />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-gray-100 space-y-3">
              {user && user.role === 'admin' ? (
                <>
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-ihn-dark text-white font-bold text-sm shadow-md"
                  >
                    <LayoutDashboard className="w-4 h-4 text-ihn-yellow" />
                    Espace Administration
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-red-50 text-red-700 font-bold text-xs hover:bg-red-100"
                  >
                    <LogOut className="w-4 h-4" />
                    Se déconnecter
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-ihn-green text-white font-bold text-sm shadow-md shadow-ihn-green/20"
                >
                  <User className="w-4 h-4 text-ihn-yellow" />
                  Accès Administration
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
