import React from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Calendar, GraduationCap, Mail, LogOut, ArrowLeft, ShieldCheck } from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { path: '/admin/events', label: 'Gestion Événements', icon: Calendar },
    { path: '/admin/formations', label: 'Gestion Formations', icon: GraduationCap },
    { path: '/admin/notifications', label: 'Diffusions E-mail', icon: Mail },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Dedicated Admin Sidebar */}
      <aside className="w-64 bg-ihn-dark text-white flex flex-col justify-between shrink-0 shadow-xl border-r border-ihn-green/20">
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-white/10 space-y-3">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-ihn-yellow text-xs font-bold transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Retour au site public
            </Link>
            <div className="flex items-center gap-3 pt-2">
              <img src="/logo.png" alt="IHN Logo" className="h-10 w-auto" />
              <div>
                <span className="font-extrabold text-white text-base block leading-tight">Espace Admin</span>
                <span className="text-[10px] text-ihn-light-green uppercase font-bold tracking-wider">Back-Office IHN</span>
              </div>
            </div>
          </div>

          {/* Admin Menu Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-extrabold transition-all ${
                    isActive
                      ? 'bg-ihn-green text-white shadow-md shadow-ihn-green/30'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-ihn-yellow' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Session & Logout */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl">
            <div className="w-9 h-9 rounded-xl bg-ihn-green text-white flex items-center justify-center font-bold text-xs shrink-0">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-xs text-white truncate">{user?.name || 'Administrateur'}</p>
              <span className="text-[10px] text-ihn-yellow font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Admin connecté
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 font-bold text-xs transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Admin Content View */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
