import React, { useState, useEffect } from 'react';
import API, { SERVER_URL } from '../services/api';
import { Calendar, MapPin, Users, CheckCircle2, AlertCircle, X, Search, Clock, ArrowRight, User, Mail, Phone } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Registration Modal State
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [regForm, setRegForm] = useState({ name: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [regResult, setRegResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get('/events');
      setEvents(res.data || []);
    } catch (err) {
      console.error('Error fetching events from API:', err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenRegister = (event) => {
    setSelectedEvent(event);
    setRegForm({ name: '', email: '', phone: '' });
    setRegResult(null);
    setErrorMsg('');
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await API.post(`/events/${selectedEvent._id}/register`, regForm);
      setRegResult(res.data);
      setEvents(events.map(evt => evt._id === selectedEvent._id ? { ...evt, registeredCount: (evt.registeredCount || 0) + 1 } : evt));
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Erreur lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  const categories = ['All', ...new Set(events.map(e => e.category || 'Culture'))];

  const filteredEvents = events.filter(evt => {
    const matchesSearch = evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (evt.description && evt.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (evt.location && evt.location.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || evt.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Title & Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Événements & Rencontres IHN</h1>
        <p className="text-gray-600 text-base">
          Rejoignez-nous lors de nos festivals, expositions et conférences. Inscription gratuite et confirmation immédiate.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        {/* Search input */}
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un événement ou lieu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ihn-green text-sm"
          />
        </div>

        {/* Category Pills */}
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
              {cat === 'All' ? 'Tous les événements' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-3xl h-96 animate-pulse border border-gray-100"></div>
          ))}
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-4">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-xl font-bold text-gray-700">Aucun événement disponible</h3>
          <p className="text-sm text-gray-500">Les nouveaux événements ajoutés depuis l'administration s'afficheront ici.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((evt) => {
            const isFull = evt.registeredCount >= evt.capacity;
            const formattedDate = evt.date ? new Date(evt.date).toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }) : 'Date non communiquée';

            return (
              <div
                key={evt._id}
                className="bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/50 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div>
                  {/* Event Cover Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={evt.image?.startsWith('http') ? evt.image : `${SERVER_URL}${evt.image}`}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-ihn-dark/80 backdrop-blur-md text-white text-xs font-bold">
                        {evt.category || 'Culture'}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-extrabold text-gray-900 leading-snug group-hover:text-ihn-green transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="space-y-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-ihn-green shrink-0" />
                        <span className="capitalize">{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-ihn-green shrink-0" />
                        <span>{evt.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-ihn-green shrink-0" />
                        <span>{evt.registeredCount || 0} / {evt.capacity} participants inscrits</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleOpenRegister(evt)}
                    disabled={isFull}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      isFull
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-ihn-green text-white hover:bg-ihn-green/90 shadow-md shadow-ihn-green/20'
                    }`}
                  >
                    {isFull ? (
                      'Complet'
                    ) : (
                      <>
                        <span>S'inscrire gratuitement</span>
                        <ArrowRight className="w-4 h-4 text-ihn-yellow" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Registration Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ihn-dark/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            {!regResult ? (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase text-ihn-green">Formulaire d'inscription</span>
                  <h3 className="text-2xl font-black text-gray-900 mt-1">{selectedEvent.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-ihn-green" /> {selectedEvent.location}
                  </p>
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
                        placeholder="Ex: Jean Koffi"
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
                        placeholder="jean.koffi@gmail.com"
                        value={regForm.email}
                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Numéro Téléphone *</label>
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
                        <span>Confirmer mon inscription</span>
                        <CheckCircle2 className="w-4 h-4 text-ihn-yellow" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Success Confirmation Box */
              <div className="text-center space-y-6 py-4">
                <div className="w-16 h-16 bg-green-100 text-ihn-green rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-gray-900">Inscription Confirmée !</h3>
                  <p className="text-sm text-gray-600">
                    Merci <span className="font-bold text-gray-900">{regForm.name}</span>, votre inscription à l'événement a bien été prise en compte.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-ihn-lightBg border border-ihn-green/20 text-left space-y-2">
                  <span className="text-[10px] font-bold text-ihn-green uppercase tracking-wider block">Pass Confirmation</span>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Code de réservation :</span>
                    <span className="text-base font-extrabold text-ihn-green font-mono">
                      {regResult.participant?.confirmationCode || 'IHN-EVT-98241'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-full py-3.5 rounded-xl bg-ihn-green text-white font-bold text-sm shadow-md"
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

export default Events;
