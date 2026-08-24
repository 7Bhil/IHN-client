import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { GraduationCap, Clock, Award, CheckCircle2, AlertCircle, X, Search, ArrowRight, User, Mail, Phone, BookOpen, CreditCard } from 'lucide-react';

const Formations = () => {
  const navigate = useNavigate();
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Registration modal
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [regForm, setRegForm] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [regResult, setRegResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      const res = await API.get('/formations');
      setFormations(res.data || []);
    } catch (err) {
      console.error('Error fetching formations from API:', err);
      setFormations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenRegister = (formation) => {
    setSelectedFormation(formation);
    setRegForm({ name: '', email: '', phone: '' });
    setRegResult(null);
    setErrorMsg('');
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await API.post(`/formations/${selectedFormation._id}/register`, regForm);
      setRegResult(res.data);
      setFormations(formations.map(f => f._id === selectedFormation._id ? { ...f, enrolledCount: (f.enrolledCount || 0) + 1 } : f));
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Erreur lors de l\'inscription.');
    } finally {
      setSubmitting(false);
    }
  };

  const categories = ['All', ...new Set(formations.map(f => f.category || 'Formation'))];

  const filteredFormations = formations.filter(f => {
    const matchesSearch = f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (f.program && f.program.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (f.instructor && f.instructor.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Formations Certifiantes IHN</h1>
        <p className="text-gray-600 text-base">
          Des programmes intensifs dispensés par des experts. Obtenez votre attestation officielle en fin de formation.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un programme ou formateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ihn-green text-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-ihn-green text-white shadow-md shadow-ihn-green/20'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'All' ? 'Toutes les formations' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-3xl h-96 animate-pulse border border-gray-100"></div>
          ))}
        </div>
      ) : filteredFormations.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-4">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-xl font-bold text-gray-700">Aucune formation disponible</h3>
          <p className="text-sm text-gray-500">Les nouvelles sessions de formation créées depuis l'administration s'afficheront ici.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFormations.map((formation) => (
            <div
              key={formation._id}
              className="bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/50 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={formation.image?.startsWith('http') ? formation.image : `http://localhost:5000${formation.image}`}
                    alt={formation.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-ihn-dark/80 backdrop-blur-md text-white text-xs font-bold">
                      {formation.category || 'Art'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-ihn-yellow text-ihn-dark font-black px-3 py-1 rounded-xl text-sm shadow-md">
                    {formation.price === 0 ? 'GRATUIT' : `${formation.price?.toLocaleString('fr-FR')} FCFA`}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-extrabold text-gray-900 leading-snug group-hover:text-ihn-green transition-colors">
                    {formation.title}
                  </h3>

                  {/* Syllabus / Program */}
                  <div className="bg-ihn-lightBg p-4 rounded-2xl border border-ihn-green/10 space-y-1">
                    <span className="text-[10px] font-bold text-ihn-green uppercase tracking-wider block">Programme synthétique</span>
                    <p className="text-xs text-gray-600 line-clamp-4 whitespace-pre-line leading-relaxed font-medium">
                      {formation.program}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-gray-500 pt-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-ihn-green shrink-0" />
                      <span>Durée : <strong className="text-gray-800">{formation.duration}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-ihn-green shrink-0" />
                      <span>Formateur : <strong className="text-gray-800">{formation.instructor}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-ihn-green shrink-0" />
                      <span>Attestation PDF certifiée incluse</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => handleOpenRegister(formation)}
                  className="w-full py-3.5 rounded-xl bg-ihn-green text-white font-bold text-sm hover:bg-ihn-green/90 shadow-md shadow-ihn-green/20 flex items-center justify-center gap-2"
                >
                  <span>S'inscrire à la formation</span>
                  <ArrowRight className="w-4 h-4 text-ihn-yellow" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Registration Modal */}
      {selectedFormation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ihn-dark/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedFormation(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            {!regResult ? (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase text-ihn-green">Inscription Formation</span>
                  <h3 className="text-2xl font-black text-gray-900 mt-1">{selectedFormation.title}</h3>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Montant de la formation :</span>
                    <span className="text-lg font-black text-ihn-green">
                      {selectedFormation.price === 0 ? 'Gratuit' : `${selectedFormation.price?.toLocaleString('fr-FR')} FCFA`}
                    </span>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Nom complet *</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        required
                        placeholder="Ex: Akossiwa Lawson"
                        value={regForm.name}
                        onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Adresse E-mail *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        required
                        placeholder="akossiwa.lawson@gmail.com"
                        value={regForm.email}
                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Numéro Téléphone (MoMo) *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+229 97 00 00 00"
                        value={regForm.phone}
                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-ihn-green text-white font-bold text-sm hover:bg-ihn-green/90 shadow-lg shadow-ihn-green/20 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Valider mon inscription</span>
                        <CheckCircle2 className="w-4 h-4 text-ihn-yellow" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center space-y-6 py-4">
                <div className="w-16 h-16 bg-green-100 text-ihn-green rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-gray-900">Pré-inscription Validée !</h3>
                  <p className="text-sm text-gray-600">
                    Félicitations <span className="font-bold text-gray-900">{regForm.name}</span>, votre dossier pour la formation <strong className="text-ihn-green">{selectedFormation.title}</strong> est enregistré.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-ihn-lightBg border border-ihn-green/20 text-left space-y-2">
                  <span className="text-[10px] font-bold text-ihn-green uppercase tracking-wider block">Numéro d'inscription</span>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Code de suivi :</span>
                    <span className="text-base font-extrabold text-ihn-green font-mono">
                      {regResult.registration?.registrationCode || 'IHN-FRM-88231'}
                    </span>
                  </div>
                </div>

                {/* Option to pay Mobile Money directly */}
                {selectedFormation.price > 0 && (
                  <button
                    onClick={() => {
                      navigate('/payments', {
                        state: {
                          selectedRegistration: {
                            ...regResult.registration,
                            amount: selectedFormation.price,
                            title: selectedFormation.title,
                            phone: regForm.phone,
                          }
                        }
                      });
                    }}
                    className="w-full py-4 rounded-xl bg-ihn-yellow text-ihn-dark font-extrabold text-sm shadow-md flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors"
                  >
                    <CreditCard className="w-5 h-5 text-ihn-dark" />
                    Régler {selectedFormation.price?.toLocaleString('fr-FR')} FCFA via Mobile Money
                  </button>
                )}

                <button
                  onClick={() => setSelectedFormation(null)}
                  className="w-full py-3.5 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Formations;
