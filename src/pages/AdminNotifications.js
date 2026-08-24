import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Send, Mail, CheckCircle2, AlertCircle, History } from 'lucide-react';

const AdminNotifications = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [targetAudience, setTargetAudience] = useState('all');
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  // Logs
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await API.get('/notifications/logs');
      setLogs(res.data);
    } catch (err) {
      console.error('Error fetching logs:', err);
    } finally {
      setLogsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setMsg({ type: '', text: '' });

    try {
      const res = await API.post('/notifications/send-bulk', {
        subject,
        message,
        targetAudience,
      });

      setMsg({ type: 'success', text: res.data.message });
      setSubject('');
      setMessage('');
      fetchLogs();
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Erreur lors de l\'envoi du message' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ihn-green/10 text-ihn-green font-bold text-xs">
          <Mail className="w-3.5 h-3.5 text-ihn-yellow" />
          Diffusions E-mail Nodemailer
        </div>
        <h1 className="text-3xl font-black text-gray-900">Envoi de Messages Groupés</h1>
        <p className="text-xs text-gray-500">
          Envoyez des annonces, rappels ou communiqués officiels à tous les participants inscrits aux événements ou formations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Composer */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Rédiger un E-mail</h2>

          {msg.text && (
            <div className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
              msg.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              <span>{msg.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Cible des destinataires *</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold focus:ring-2 focus:ring-ihn-green"
              >
                <option value="all">Tous les inscrits (Événements + Formations)</option>
                <option value="events">Participants aux Événements uniquement</option>
                <option value="formations">Étudiants des Formations uniquement</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Sujet de l'e-mail *</label>
              <input
                type="text"
                required
                placeholder="Ex: Rappel de démarrage de votre formation IHN"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Contenu du message *</label>
              <textarea
                required
                rows={6}
                placeholder="Rédigez ici le texte de votre e-mail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-4 rounded-xl bg-ihn-green text-white font-bold text-sm hover:bg-ihn-green/90 shadow-lg shadow-ihn-green/20 flex items-center justify-center gap-2"
            >
              {sending ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send className="w-4 h-4 text-ihn-yellow" />
                  <span>Diffuser l'e-mail immédiatement</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Broadcast History Logs */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <History className="w-5 h-5 text-ihn-green" />
            Historique des Envois
          </h2>

          {logsLoading ? (
            <p className="text-xs text-gray-400 py-4 text-center">Chargement de l'historique...</p>
          ) : logs.length === 0 ? (
            <p className="text-xs text-gray-400 py-4 text-center">Aucun e-mail envoyé pour l'instant.</p>
          ) : (
            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
              {logs.map((log) => (
                <div key={log._id} className="py-3 space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-gray-900">{log.subject}</span>
                    <span className="text-[10px] bg-ihn-green/10 text-ihn-green px-2 py-0.5 rounded font-extrabold shrink-0">
                      {log.recipientsCount} destinataires
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">{log.message}</p>
                  <span className="text-[10px] text-gray-400 block">
                    {new Date(log.createdAt).toLocaleString('fr-FR')}
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

export default AdminNotifications;
