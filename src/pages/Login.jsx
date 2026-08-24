import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

const Login = () => {
  const { login, seedAdmin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@ihn.bj');
  const [password, setPassword] = useState('Admin@2026');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Identifiants de connexion invalides');
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    setError('');
    setSuccessMsg('');
    const res = await seedAdmin();
    if (res.success) {
      setSuccessMsg(`Compte administrateur créé avec succès ! E-mail: ${res.email} / Mot de passe: Admin@2026`);
      setEmail(res.email);
      setPassword('Admin@2026');
    } else {
      setError(res.message);
    }
    setSeeding(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-ihn-lightBg via-white to-green-50/50">
      <div className="max-w-md w-full">
        {/* Top Header Card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-ihn-green/10 border-2 border-ihn-green/20 mb-4 shadow-inner">
            <img src="/logo.png" alt="IHN Logo" className="h-12 w-auto object-contain" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Espace Administration</h1>
          <p className="text-sm text-gray-600 mt-2">
            Connectez-vous pour gérer les événements, les formations et consulter les statistiques du Centre Culturel IHN.
          </p>
        </div>

        {/* Login Form Box */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
          {/* Top Decorative bar with brand colors */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-ihn-green via-ihn-light-green to-ihn-yellow"></div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Erreur de connexion</p>
                <p className="text-xs">{error}</p>
              </div>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 flex items-start gap-3 text-green-800 text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Initialisation réussie</p>
                <p className="text-xs">{successMsg}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Adresse E-mail
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ihn.bj"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ihn-green focus:border-transparent transition-all text-gray-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ihn-green focus:border-transparent transition-all text-gray-900 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-ihn-green text-white font-bold text-base hover:bg-ihn-green/90 transition-all shadow-lg shadow-ihn-green/25 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight className="w-5 h-5 text-ihn-yellow" />
                </>
              )}
            </button>
          </form>

          {/* Seed admin helper */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Pas encore d'administrateur ?</span>
              <button
                type="button"
                onClick={handleSeed}
                disabled={seeding}
                className="text-xs font-bold text-ihn-green hover:text-ihn-light-green flex items-center gap-1.5 bg-ihn-green/10 hover:bg-ihn-green/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-ihn-yellow" />
                {seeding ? 'Initialisation...' : 'Créer compte admin'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
