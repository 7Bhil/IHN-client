import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Plus, Edit3, Trash2, Users, Calendar, X, CheckCircle2, AlertCircle } from 'lucide-react';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  
  // Participants Modal
  const [participantsModalOpen, setParticipantsModalOpen] = useState(false);
  const [currentEventTitle, setCurrentEventTitle] = useState('');
  const [participants, setParticipants] = useState([]);
  const [participantsLoading, setParticipantsLoading] = useState(false);

  // Form fields
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: 'Centre Culturel IHN, Cotonou',
    capacity: 100,
    category: 'Culture & Arts',
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get('/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingEvent(null);
    setForm({
      title: '',
      description: '',
      date: new Date().toISOString().slice(0, 16),
      location: 'Centre Culturel IHN, Cotonou',
      capacity: 100,
      category: 'Culture & Arts',
    });
    setImageFile(null);
    setMsg({ type: '', text: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (evt) => {
    setEditingEvent(evt);
    setForm({
      title: evt.title,
      description: evt.description,
      date: evt.date ? new Date(evt.date).toISOString().slice(0, 16) : '',
      location: evt.location,
      capacity: evt.capacity,
      category: evt.category || 'Culture & Arts',
    });
    setImageFile(null);
    setMsg({ type: '', text: '' });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet événement et ses inscriptions ?')) return;

    try {
      await API.delete(`/events/${id}`);
      setEvents(events.filter(e => e._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur de suppression');
    }
  };

  const handleViewParticipants = async (evt) => {
    setCurrentEventTitle(evt.title);
    setParticipantsModalOpen(true);
    setParticipantsLoading(true);

    try {
      const res = await API.get(`/events/${evt._id}/participants`);
      setParticipants(res.data);
    } catch (err) {
      setParticipants([]);
    } finally {
      setParticipantsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg({ type: '', text: '' });

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('date', form.date);
      formData.append('location', form.location);
      formData.append('capacity', form.capacity);
      formData.append('category', form.category);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (editingEvent) {
        const res = await API.put(`/events/${editingEvent._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setEvents(events.map(e => e._id === editingEvent._id ? res.data : e));
        setMsg({ type: 'success', text: 'Événement mis à jour avec succès' });
      } else {
        const res = await API.post('/events', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setEvents([...events, res.data]);
        setMsg({ type: 'success', text: 'Nouvel événement créé avec succès' });
      }

      setTimeout(() => {
        setModalOpen(false);
      }, 1000);
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Erreur de traitement' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Gestion des Événements</h2>
          <p className="text-xs text-gray-500">Créez, modifiez ou supprimez les événements du Centre IHN.</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-ihn-green text-white font-bold text-sm hover:bg-ihn-green/90 shadow-md shadow-ihn-green/20"
        >
          <Plus className="w-5 h-5 text-ihn-yellow" />
          Créer un Événement
        </button>
      </div>

      {/* Events table */}
      {loading ? (
        <div className="p-8 text-center text-gray-400">Chargement des événements...</div>
      ) : events.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-gray-100">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-bold">Aucun événement enregistré.</p>
          <p className="text-xs text-gray-400 mt-1">Cliquez sur le bouton ci-dessus pour ajouter un premier événement.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <th className="p-4 pl-6">Événement</th>
                  <th className="p-4">Catégorie</th>
                  <th className="p-4">Date & Heure</th>
                  <th className="p-4">Lieu</th>
                  <th className="p-4">Inscrits / Capacité</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {events.map((evt) => (
                  <tr key={evt._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 pl-6 font-bold text-gray-900 flex items-center gap-3">
                      <img
                        src={evt.image?.startsWith('http') ? evt.image : `http://localhost:5000${evt.image}`}
                        alt={evt.title}
                        className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div>
                        <span className="block font-bold">{evt.title}</span>
                        <span className="text-xs text-gray-400 font-normal line-clamp-1">{evt.description}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold">
                        {evt.category || 'Culture'}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-medium text-gray-600">
                      {new Date(evt.date).toLocaleString('fr-FR')}
                    </td>
                    <td className="p-4 text-xs text-gray-600">{evt.location}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleViewParticipants(evt)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ihn-green/10 hover:bg-ihn-green/20 text-ihn-green font-bold text-xs"
                      >
                        <Users className="w-3.5 h-3.5" />
                        {evt.registeredCount || 0} / {evt.capacity}
                      </button>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(evt)}
                          className="p-2 rounded-xl text-gray-500 hover:text-ihn-green hover:bg-ihn-green/10"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(evt._id)}
                          className="p-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ihn-dark/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-gray-900 mb-6">
              {editingEvent ? 'Modifier l\'événement' : 'Créer un événement'}
            </h3>

            {msg.text && (
              <div className={`mb-6 p-4 rounded-xl text-xs flex items-center gap-2 ${
                msg.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{msg.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Titre de l'événement *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Ex: Concert de Musique Traditionnelle"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Détails du programme et intervenants..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Date & Heure *</label>
                  <input
                    type="datetime-local"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Catégorie</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Musique, Danse, Théâtre..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Lieu *</label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Capacité Max *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={form.capacity}
                    onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Image de couverture</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-ihn-green/10 file:text-ihn-green hover:file:bg-ihn-green/20"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 rounded-xl bg-ihn-green text-white font-bold text-sm shadow-md"
                >
                  {submitting ? 'Enregistrement...' : editingEvent ? 'Enregistrer modifications' : 'Créer l\'événement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Participants View Modal */}
      {participantsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ihn-dark/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setParticipantsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase text-ihn-green">Liste des participants</span>
              <h3 className="text-2xl font-black text-gray-900">{currentEventTitle}</h3>
            </div>

            {participantsLoading ? (
              <p className="text-center text-gray-400 text-sm py-8">Chargement des participants...</p>
            ) : participants.length === 0 ? (
              <p className="text-center text-gray-500 text-sm py-8">Aucune inscription enregistrée pour le moment.</p>
            ) : (
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                {participants.map((p) => (
                  <div key={p._id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div>
                      <p className="font-bold text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.email} • {p.phone}</p>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-green-100 text-ihn-green text-xs font-mono font-bold">
                      {p.confirmationCode}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
