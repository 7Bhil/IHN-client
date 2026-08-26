import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { SERVER_URL } from '../services/api';
import { Calendar, GraduationCap, Users, DollarSign, Download, Plus, Mail, CreditCard, ArrowUpRight, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    kpis: {
      totalEvents: 0,
      totalEventParticipants: 0,
      totalFormations: 0,
      totalFormationStudents: 0,
      totalRevenue: 0,
    },
    recentParticipants: [],
    recentStudents: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get('/dashboard/stats');
      setStats(res.data);
    } catch (err) {
      console.warn('API error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    window.open(`${SERVER_URL}/api/dashboard/export/participants`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Welcome & CSV Export Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase text-ihn-green">Administration générale</span>
          <h1 className="text-3xl font-black text-gray-900 mt-1">Tableau de Bord & Analytics</h1>
          <p className="text-xs text-gray-500 mt-1">
            Vue d'ensemble des activités culturelles, inscriptions aux formations et revenus Mobile Money.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-ihn-green text-white font-extrabold text-sm hover:bg-ihn-green/90 shadow-lg shadow-ihn-green/20 transition-all hover:scale-105"
        >
          <Download className="w-5 h-5 text-ihn-yellow" />
          Exporter la liste (CSV)
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1: Events */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/40 space-y-4">
          <div className="flex justify-between items-center">
            <div className="w-12 h-12 rounded-2xl bg-ihn-green/10 text-ihn-green flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-ihn-green bg-green-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Activité
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Événements Culturels</span>
            <span className="text-3xl font-black text-gray-900">{loading ? '...' : stats.kpis.totalEvents}</span>
          </div>
        </div>

        {/* KPI 2: Formations */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/40 space-y-4">
          <div className="flex justify-between items-center">
            <div className="w-12 h-12 rounded-2xl bg-ihn-yellow/20 text-ihn-dark flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-yellow-800 bg-yellow-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Formations
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Programmes Ouverts</span>
            <span className="text-3xl font-black text-gray-900">{loading ? '...' : stats.kpis.totalFormations}</span>
          </div>
        </div>

        {/* KPI 3: Registrations Total */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/40 space-y-4">
          <div className="flex justify-between items-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
              Global
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Inscrits</span>
            <span className="text-3xl font-black text-gray-900">
              {loading ? '...' : stats.kpis.totalEventParticipants + stats.kpis.totalFormationStudents}
            </span>
          </div>
        </div>

        {/* KPI 4: Total Revenue FCFA */}
        <div className="bg-gradient-to-br from-ihn-green to-emerald-800 text-white p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex justify-between items-center">
            <div className="w-12 h-12 rounded-2xl bg-white/20 text-ihn-yellow flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-ihn-yellow bg-white/10 px-2.5 py-1 rounded-full">
              Mobile Money
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-green-200 uppercase tracking-wider block">Revenus Générés</span>
            <span className="text-2xl font-black text-white">
              {loading ? '...' : `${stats.kpis.totalRevenue.toLocaleString('fr-FR')} FCFA`}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Raccourcis d'Administration</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/admin/events')}
            className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-ihn-green/10 text-ihn-green flex items-center justify-center font-bold">
                <Plus className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm text-gray-900 group-hover:text-ihn-green transition-colors">Événements</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-ihn-green" />
          </button>

          <button
            onClick={() => navigate('/admin/formations')}
            className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-ihn-yellow/20 text-ihn-dark flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm text-gray-900 group-hover:text-ihn-green transition-colors">Formations</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-ihn-green" />
          </button>

          <button
            onClick={() => navigate('/admin/notifications')}
            className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm text-gray-900 group-hover:text-ihn-green transition-colors">Diffusions</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-ihn-green" />
          </button>

          <button
            onClick={() => navigate('/payments')}
            className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-800 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm text-gray-900 group-hover:text-ihn-green transition-colors">Paiements</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-ihn-green" />
          </button>
        </div>
      </div>

      {/* Recent Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Event Registrations */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-lg text-gray-900">Dernières inscriptions Événements</h3>
            <span className="text-xs text-gray-400 font-bold">{stats.recentParticipants.length} récents</span>
          </div>

          {stats.recentParticipants.length === 0 ? (
            <p className="text-xs text-gray-400 py-6 text-center">Aucune inscription récente.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {stats.recentParticipants.map((p) => (
                <div key={p._id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">{p.name}</span>
                    <span className="text-gray-500">{p.event?.title || 'Événement IHN'}</span>
                  </div>
                  <span className="font-mono text-ihn-green font-bold bg-green-50 px-2 py-1 rounded">
                    {p.confirmationCode}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Formation Enrollments */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-lg text-gray-900">Derniers étudiants Formations</h3>
            <span className="text-xs text-gray-400 font-bold">{stats.recentStudents.length} récents</span>
          </div>

          {stats.recentStudents.length === 0 ? (
            <p className="text-xs text-gray-400 py-6 text-center">Aucun étudiant inscrit récemment.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {stats.recentStudents.map((s) => (
                <div key={s._id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-gray-900 block">{s.name}</span>
                    <span className="text-gray-500">{s.formation?.title || 'Formation IHN'}</span>
                  </div>
                  <span className={`font-bold px-2 py-1 rounded ${
                    s.paymentStatus === 'paid' ? 'bg-green-100 text-ihn-green' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {s.paymentStatus === 'paid' ? 'Payé' : 'En attente'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
