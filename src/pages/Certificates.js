import React, { useState } from 'react';
import API from '../services/api';
import { Award, Search, Download, CheckCircle2, AlertCircle, ShieldCheck, FileText } from 'lucide-react';

const Certificates = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setResult(null);

    try {
      const res = await API.get(`/certificates/verify/${encodeURIComponent(query.trim())}`);
      setResult(res.data);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Attestation non trouvée ou formation non validée.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = (certNum) => {
    window.open(`http://localhost:5000/api/certificates/download/${certNum}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Title */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ihn-green/10 text-ihn-green font-bold text-xs uppercase tracking-wider">
          <Award className="w-4 h-4 text-ihn-yellow" />
          Vérification Officielle
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Attestations & Diplômes IHN</h1>
        <p className="text-gray-600 text-sm max-w-xl mx-auto">
          Saisissez votre code d'inscription (ex: <code className="text-ihn-green font-bold">IHN-FRM-88231</code>) ou votre numéro d'attestation pour télécharger votre diplôme au format PDF.
        </p>
      </div>

      {/* Search Box */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl space-y-6">
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-2">Code d'Attestation ou Référence d'Inscription *</label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                placeholder="Ex: IHN-CERT-489201 ou IHN-FRM-10294"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 text-sm font-bold focus:ring-2 focus:ring-ihn-green"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-ihn-green text-white font-extrabold text-sm hover:bg-ihn-green/90 shadow-lg shadow-ihn-green/20 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 text-ihn-yellow" />
                <span>Vérifier & Afficher l'Attestation</span>
              </>
            )}
          </button>
        </form>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-50 text-red-700 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Certificate Display Card */}
      {result && result.valid && result.certificate && (
        <div className="bg-gradient-to-br from-white to-ihn-lightBg p-8 rounded-3xl border-2 border-ihn-green shadow-2xl relative overflow-hidden space-y-6 animate-in fade-in zoom-in-95">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-ihn-green/20 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-ihn-green text-ihn-yellow rounded-2xl flex items-center justify-center shadow-md">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold text-ihn-green uppercase tracking-wider block">Attestation Authentifiée</span>
                <h3 className="text-2xl font-black text-gray-900">{result.certificate.studentName}</h3>
              </div>
            </div>

            <span className="px-3 py-1.5 rounded-full bg-green-100 text-ihn-green font-extrabold text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Document Authentique
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">Programme académique</span>
              <p className="font-extrabold text-gray-900">{result.certificate.formationTitle}</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase block">N° Référence Diplôme</span>
              <p className="font-extrabold text-ihn-green font-mono">{result.certificate.certificateNumber}</p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => handleDownloadPDF(result.certificate.certificateNumber)}
              className="w-full sm:w-auto flex-1 py-4 px-6 rounded-2xl bg-ihn-green text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-3 hover:bg-ihn-green/90 transition-transform active:scale-95"
            >
              <Download className="w-5 h-5 text-ihn-yellow" />
              Télécharger l'Attestation Officielle (PDF)
            </button>

            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-gray-100 text-gray-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-200"
            >
              <FileText className="w-4 h-4" />
              Imprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
