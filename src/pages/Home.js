import React from 'react';
import { Calendar, GraduationCap, ArrowRight, Sparkles, Award, BookOpen } from 'lucide-react';

const Home = ({ setActiveTab }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ihn-dark via-[#102717] to-ihn-green text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8 rounded-b-[2.5rem] shadow-2xl">
        {/* Glow overlay elements */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-ihn-light-green/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-ihn-yellow/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-ihn-yellow text-xs font-bold uppercase tracking-widest shadow-inner">
              <Sparkles className="w-4 h-4" />
              Espace Culturel & Académique IHN
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Bienvenue au Centre Culturel <span className="text-ihn-yellow">IHN</span>
            </h1>

            <p className="text-lg text-gray-200 font-medium max-w-2xl leading-relaxed">
              Découvrez nos événements artistiques, conférences passionnantes et nos programmes de formation certifiants. Rejoignez la communauté IHN pour développer vos compétences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={() => setActiveTab('events')}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-ihn-yellow text-ihn-dark font-extrabold text-base hover:bg-yellow-400 transition-all shadow-xl shadow-ihn-yellow/20 hover:scale-[1.02]"
              >
                <Calendar className="w-5 h-5 text-ihn-dark" />
                Découvrir nos Événements
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setActiveTab('formations')}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 backdrop-blur-md transition-all hover:scale-[1.02]"
              >
                <GraduationCap className="w-5 h-5 text-ihn-light-green" />
                Catalogue des Formations
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-ihn-light-green via-ihn-yellow to-ihn-green rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative bg-ihn-dark/90 border border-white/10 p-8 rounded-3xl backdrop-blur-xl text-center space-y-6 shadow-2xl">
                <img src="/logo.png" alt="Logo IHN" className="h-28 mx-auto object-contain filter drop-shadow-md" />
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">Culture, Art & Innovation</h3>
                  <p className="text-xs text-gray-300">
                    Bénéficiez d'une attestation certifiée à chaque fin de parcours de formation.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-around text-center">
                  <div>
                    <span className="block text-2xl font-black text-ihn-yellow">100%</span>
                    <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold">Certifié</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-ihn-light-green">MoMo</span>
                    <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold">Paiement Mobile</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl font-extrabold text-gray-900">Pourquoi choisir le Centre IHN ?</h2>
          <p className="text-gray-600 text-sm">
            Une plateforme moderne conçue pour vous permettre de vous inscrire aux événements et d'obtenir vos certificats en ligne.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:border-ihn-green/30 transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-ihn-green/10 flex items-center justify-center text-ihn-green">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Événements Culturels</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Consultez le programme des festivals, ateliers et séminaires culturels. Inscription instantanée avec confirmation par e-mail.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:border-ihn-green/30 transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-ihn-light-green/20 flex items-center justify-center text-ihn-green">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Formations Qualifiantes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Suivez nos parcours complets. Réservez votre place en réglant via Mobile Money (MTN MoMo ou Moov Money).
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:border-ihn-green/30 transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-ihn-yellow/20 flex items-center justify-center text-ihn-dark">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Attestations PDF Certifiées</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Générez et téléchargez directement votre certificat de réussite en format PDF sécurisé dès validation de votre formation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
