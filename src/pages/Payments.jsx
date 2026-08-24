import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { CreditCard, Phone, CheckCircle2, AlertCircle, ShieldCheck, ArrowRight, DollarSign, History } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Payments = ({ selectedRegistration, onPaymentSuccess }) => {
  const { user } = useAuth();
  const [provider, setProvider] = useState('MTN');
  const [phone, setPhone] = useState(selectedRegistration?.phone || '97000000');
  const [amount, setAmount] = useState(selectedRegistration?.amount || 35000);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('form'); // 'form' | 'ussd' | 'success'
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Admin Payment History
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, mtnCount: 0, moovCount: 0, totalCount: 0 });
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchPaymentHistory();
    }
  }, [user]);

  const fetchPaymentHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await API.get('/payments/history');
      setHistory(res.data.payments || []);
      setStats(res.data.stats || { totalRevenue: 0, mtnCount: 0, moovCount: 0, totalCount: 0 });
    } catch (err) {
      console.warn('API error fetching payment history:', err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleInitiatePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setStep('ussd');

    // Simulate 2 second USSD push delay
    setTimeout(async () => {
      try {
        const res = await API.post('/payments/initiate', {
          provider,
          phone,
          amount,
          registrationId: selectedRegistration?._id,
        });

        setResult(res.data);
        setStep('success');
        if (onPaymentSuccess) onPaymentSuccess();
        if (user && user.role === 'admin') fetchPaymentHistory();
      } catch (err) {
        setErrorMsg(err.response?.data?.message || 'Erreur de traitement du paiement Mobile Money');
        setStep('form');
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ihn-yellow/20 text-ihn-dark font-extrabold text-xs uppercase tracking-wider">
          <CreditCard className="w-4 h-4 text-ihn-dark" />
          Paiement Sécurisé Mobile Money
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Règlement en Ligne (MTN & Moov Bénin)</h1>
        <p className="text-gray-600 text-base">
          Réglez vos frais de formation directement avec votre compte Mobile Money. Confirmation instantanée sans aucun frais supplémentaire.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Payment Checkout Form Box */}
        <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-500 via-ihn-green to-blue-600"></div>

          <div>
            <span className="text-xs font-bold uppercase text-ihn-green">Guichet de Paiement</span>
            <h2 className="text-2xl font-black text-gray-900 mt-1">
              {selectedRegistration?.title || 'Règlement de Formation'}
            </h2>
          </div>

          {step === 'form' && (
            <form onSubmit={handleInitiatePayment} className="space-y-6">
              {/* Operator Selector */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-3">Sélectionnez votre opérateur *</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setProvider('MTN')}
                    className={`p-4 rounded-2xl border-2 font-black text-sm flex flex-col items-center gap-2 transition-all ${
                      provider === 'MTN'
                        ? 'border-yellow-400 bg-yellow-50/80 text-yellow-900 shadow-md scale-[1.02]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-extrabold text-xs">
                      MTN
                    </div>
                    <span>MTN MoMo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProvider('MOOV')}
                    className={`p-4 rounded-2xl border-2 font-black text-sm flex flex-col items-center gap-2 transition-all ${
                      provider === 'MOOV'
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-md scale-[1.02]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold text-xs">
                      MOOV
                    </div>
                    <span>Moov Money</span>
                  </button>
                </div>
              </div>

              {/* Amount Display */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Montant à régler (FCFA)</label>
                <div className="relative">
                  <DollarSign className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-ihn-green" />
                  <input
                    type="number"
                    required
                    min={500}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 text-lg font-black text-ihn-green bg-gray-50 focus:ring-2 focus:ring-ihn-green"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Numéro Téléphone Mobile Money *</label>
                <div className="relative">
                  <Phone className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    required
                    placeholder="97000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 font-bold text-gray-900 focus:ring-2 focus:ring-ihn-green"
                  />
                </div>
                <span className="text-[11px] text-gray-400 mt-1 block">Exemple Bénin : 97 XX XX XX ou 95 XX XX XX</span>
              </div>

              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-4 rounded-2xl font-extrabold text-base text-white shadow-xl flex items-center justify-center gap-2 transition-all ${
                  provider === 'MTN'
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-black shadow-yellow-500/20'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                }`}
              >
                <span>Payer {Number(amount).toLocaleString('fr-FR')} FCFA par {provider === 'MTN' ? 'MTN MoMo' : 'Moov Money'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {/* USSD Simulation Loader */}
          {step === 'ussd' && (
            <div className="py-12 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-ihn-green/10 text-ihn-green flex items-center justify-center mx-auto animate-pulse">
                <Phone className="w-10 h-10 text-ihn-green animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900">Demande d'autorisation envoyée</h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto">
                  Un écran de confirmation USSD a été envoyé au <strong className="text-gray-900">{phone}</strong>. Entrez votre code PIN Mobile Money pour valider.
                </p>
              </div>
              <div className="w-8 h-8 border-4 border-ihn-green border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          )}

          {/* Success Box */}
          {step === 'success' && (
            <div className="py-8 text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 text-ihn-green rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900">Paiement Réussi !</h3>
                <p className="text-sm text-gray-600">
                  Votre transaction de <strong className="text-ihn-green">{Number(amount).toLocaleString('fr-FR')} FCFA</strong> via {provider === 'MTN' ? 'MTN MoMo' : 'Moov Money'} a été validée.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-ihn-lightBg border border-ihn-green/20 text-left space-y-2">
                <span className="text-[10px] font-bold text-ihn-green uppercase tracking-wider block">Reçu de paiement</span>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">Référence de transaction :</span>
                  <span className="font-extrabold text-ihn-green font-mono">{result?.payment?.transactionRef}</span>
                </div>
              </div>

              <button
                onClick={() => setStep('form')}
                className="w-full py-3.5 rounded-xl bg-ihn-green text-white font-bold text-sm shadow-md"
              >
                Effectuer un autre paiement
              </button>
            </div>
          )}
        </div>

        {/* Info & Admin Stats Box */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-gradient-to-br from-ihn-dark to-ihn-card text-white p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-ihn-yellow" />
              <div>
                <h3 className="text-xl font-bold">Sécurité & Instantanéité</h3>
                <p className="text-xs text-gray-300">Intégration directe avec les APIs Mobile Money</p>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              Vos transactions sont immédiatement enregistrées et synchronisées avec votre dossier d'inscription IHN. Un reçu électronique est émis automatiquement.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="bg-white/10 p-4 rounded-2xl">
                <span className="block text-xs text-gray-300 font-semibold">Support MTN</span>
                <span className="text-lg font-black text-yellow-400">*138# / App MoMo</span>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl">
                <span className="block text-xs text-gray-300 font-semibold">Support MOOV</span>
                <span className="text-lg font-black text-blue-400">*155# / Moov Money</span>
              </div>
            </div>
          </div>

          {/* Admin Transaction History Overview */}
          {user && user.role === 'admin' && (
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <History className="w-5 h-5 text-ihn-green" />
                  Historique Administrateur
                </h3>
                <span className="text-xs font-black text-ihn-green bg-ihn-green/10 px-3 py-1 rounded-full">
                  Total : {stats.totalRevenue.toLocaleString('fr-FR')} FCFA
                </span>
              </div>

              {historyLoading ? (
                <p className="text-xs text-gray-400 py-4 text-center">Chargement des transactions...</p>
              ) : history.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">Aucune transaction enregistrée.</p>
              ) : (
                <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
                  {history.map((p) => (
                    <div key={p._id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-gray-900">{p.phone}</span>
                        <span className="text-gray-400 block font-mono text-[10px]">{p.transactionRef}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-ihn-green">{p.amount.toLocaleString('fr-FR')} FCFA</span>
                        <span className={`block font-bold text-[10px] uppercase ${
                          p.provider === 'MTN' ? 'text-yellow-600' : 'text-blue-600'
                        }`}>
                          {p.provider}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
