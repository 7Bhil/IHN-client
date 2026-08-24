import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Plus, Edit3, Trash2, Users, GraduationCap, X, CheckCircle2, AlertCircle, Award } from 'lucide-react';

const AdminFormations = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFormation, setEditingFormation] = useState(null);

  // Student Registrations Modal State
  const [studentsModalOpen, setStudentsModalOpen] = useState(false);
  const [currentFormationTitle, setCurrentFormationTitle] = useState('');
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);

  // Form state
  const [form, setForm] = useState({
    title: '',
    program: '',
    duration: '4 semaines',
    price: 35000,
    instructor: 'Formateur Certifié IHN',
    category: 'Art & Musique',
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      const res = await API.get('/formations');
      setFormations(res.data);
    } catch (err) {
      console.error('Error fetching formations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingFormation(null);
    setForm({
      title: '',
      program: '',
      duration: '4 semaines',
      price: 35000,
      instructor: 'Formateur Certifié IHN',
      category: 'Art & Musique',
    });
    setImageFile(null);
    setMsg({ type: '', text: '' });
    setModalOpen(true);
  };

  const handleOpenEdit = (f) => {
    setEditingFormation(f);
    setForm({
      title: f.title,
      program: f.program,
      duration: f.duration,
      price: f.price,
      instructor: f.instructor,
      category: f.category || 'Art & Musique',
    });
    setImageFile(null);
    setMsg({ type: '', text: '' });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette formation et ses étudiants inscrits ?')) return;

    try {
      await API.delete(`/formations/${id}`);
      setFormations(formations.filter(f => f._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur de suppression');
    }
  };

  const handleViewStudents = async (f) => {
    setCurrentFormationTitle(f.title);
    setStudentsModalOpen(true);
    setStudentsLoading(true);

    try {
      const res = await API.get(`/formations/${f._id}/registrations`);
      setStudents(res.data);
    } catch (err) {
      setStudents([]);
    } finally {
      setStudentsLoading(false);
    }
  };

  const toggleStudentCompletion = async (studentId, currentCompleted) => {
    try {
      const res = await API.put(`/formations/registrations/${studentId}/status`, {
        completed: !currentCompleted,
      });
      setStudents(students.map(s => s._id === studentId ? res.data : s));
    } catch (err) {
      alert('Erreur lors de la mise à jour du statut de formation');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg({ type: '', text: '' });

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('program', form.program);
      formData.append('duration', form.duration);
      formData.append('price', form.price);
      formData.append('instructor', form.instructor);
      formData.append('category', form.category);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (editingFormation) {
        const res = await API.put(`/formations/${editingFormation._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setFormations(formations.map(f => f._id === editingFormation._id ? res.data : f));
        setMsg({ type: 'success', text: 'Formation mise à jour avec succès' });
      } else {
        const res = await API.post('/formations', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setFormations([...formations, res.data]);
        setMsg({ type: 'success', text: 'Nouvelle formation créée avec succès' });
      }

      setTimeout(() => {
        setModalOpen(false);
      }, 1000);
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Erreur lors de l\'enregistrement' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Gestion des Formations</h2>
          <p className="text-xs text-gray-500">Ajoutez, modifiez vos cours et validez les attestations de fin de parcours.</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-ihn-green text-white font-bold text-sm hover:bg-ihn-green/90 shadow-md shadow-ihn-green/20"
        >
          <Plus className="w-5 h-5 text-ihn-yellow" />
          Ajouter une Formation
        </button>
      </div>

      {/* Formations Table */}
      {loading ? (
        <div className="p-8 text-center text-gray-400">Chargement des formations...</div>
      ) : formations.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-gray-100">
          <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-bold">Aucune formation enregistrée.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <th className="p-4 pl-6">Formation</th>
                  <th className="p-4">Durée</th>
                  <th className="p-4">Tarif (FCFA)</th>
                  <th className="p-4">Formateur</th>
                  <th className="p-4">Étudiants Inscrits</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {formations.map((f) => (
                  <tr key={f._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 pl-6 font-bold text-gray-900 flex items-center gap-3">
                      <img
                        src={f.image?.startsWith('http') ? f.image : `http://localhost:5000${f.image}`}
                        alt={f.title}
                        className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div>
                        <span className="block font-bold">{f.title}</span>
                        <span className="text-xs text-ihn-green font-semibold">{f.category || 'Art'}</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs font-medium text-gray-600">{f.duration}</td>
                    <td className="p-4 text-xs font-black text-ihn-green">
                      {f.price === 0 ? 'Gratuit' : `${f.price.toLocaleString('fr-FR')} FCFA`}
                    </td>
                    <td className="p-4 text-xs text-gray-600">{f.instructor}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleViewStudents(f)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ihn-green/10 hover:bg-ihn-green/20 text-ihn-green font-bold text-xs"
                      >
                        <Users className="w-3.5 h-3.5" />
                        {f.enrolledCount || 0} Inscrits
                      </button>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(f)}
                          className="p-2 rounded-xl text-gray-500 hover:text-ihn-green hover:bg-ihn-green/10"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(f._id)}
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
              {editingFormation ? 'Modifier la formation' : 'Ajouter une formation'}
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
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Intitulé de la formation *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Ex: Musique Traditionnelle & Percussions"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Programme / Syllabus *</label>
                <textarea
                  required
                  rows={4}
                  value={form.program}
                  onChange={(e) => setForm({ ...form, program: e.target.value })}
                  placeholder="Module 1: ... &#10;Module 2: ..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Durée *</label>
                  <input
                    type="text"
                    required
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="Ex: 4 Semaines (16h)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Prix (FCFA) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Formateur principal</label>
                  <input
                    type="text"
                    value={form.instructor}
                    onChange={(e) => setForm({ ...form, instructor: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Catégorie</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="Art, Musique, Management..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-ihn-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Image explicative</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-ihn-green/10 file:text-ihn-green hover:file:bg-ihn-green/20"
                />
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
                  {submitting ? 'Enregistrement...' : editingFormation ? 'Enregistrer modifications' : 'Créer la formation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enrolled Students Modal */}
      {studentsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ihn-dark/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setStudentsModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase text-ihn-green">Suivi des Étudiants</span>
              <h3 className="text-2xl font-black text-gray-900">{currentFormationTitle}</h3>
              <p className="text-xs text-gray-500 mt-1">
                Validez la fin de formation pour délivrer l'attestation certifiée PDF au participant.
              </p>
            </div>

            {studentsLoading ? (
              <p className="text-center text-gray-400 text-sm py-8">Chargement des étudiants...</p>
            ) : students.length === 0 ? (
              <p className="text-center text-gray-500 text-sm py-8">Aucun étudiant inscrit pour cette formation.</p>
            ) : (
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                {students.map((s) => (
                  <div key={s._id} className="p-4 flex items-center justify-between hover:bg-gray-50 gap-4">
                    <div>
                      <p className="font-bold text-gray-900">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.email} • {s.phone}</p>
                      <span className="text-[10px] text-gray-400 font-mono">Code: {s.registrationCode}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        s.paymentStatus === 'paid' ? 'bg-green-100 text-ihn-green' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {s.paymentStatus === 'paid' ? 'Paiement Confirmé' : 'Paiement En attente'}
                      </span>

                      <button
                        onClick={() => toggleStudentCompletion(s._id, s.completed)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                          s.completed
                            ? 'bg-ihn-green text-white shadow'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Award className="w-3.5 h-3.5 text-ihn-yellow" />
                        {s.completed ? 'Terminé (Attestation OK)' : 'Marquer comme Terminé'}
                      </button>
                    </div>
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

export default AdminFormations;
