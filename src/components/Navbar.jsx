import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu, X, Calendar, GraduationCap, ShieldCheck, Home, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/events', label: 'Événements', icon: Calendar },
    { path: '/formations', label: 'Formations', icon: GraduationCap },
    { path: '/certificates', label: 'Vérifier Attestation', icon: ShieldCheck },
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

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-colors ${
                  isActive ? 'bg-ihn-green text-white' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-ihn-yellow' : 'text-gray-400'}`} />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-gray-100">
            {user && user.role === 'admin' ? (
              <Link
                to="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-ihn-dark text-white font-bold text-sm"
              >
                <LayoutDashboard className="w-4 h-4 text-ihn-yellow" />
                Accéder à l'Espace Admin
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-ihn-green text-white font-semibold text-sm shadow-md"
              >
                <User className="w-4 h-4 text-ihn-yellow" />
                Accès Administration
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
