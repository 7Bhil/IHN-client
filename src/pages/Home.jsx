import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, GraduationCap, ArrowRight, Sparkles, Award, BookOpen, 
  CheckCircle2, Users, ShieldCheck, ChevronDown, MessageSquare, 
  CreditCard, MapPin, Star, Heart
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Comment m'inscrire à un événement ou une formation ?",
      a: "Accédez à la section Événements ou Formations, choisissez le programme qui vous intéresse et remplissez le formulaire avec votre nom, e-mail et téléphone. Un code de suivi vous sera attribué immédiatement."
    },
    {
      q: "Quels sont les modes de paiement acceptés pour les formations ?",
      a: "Nous acceptons les paiements directs par Mobile Money (MTN MoMo et Moov Money). La validation du paiement est instantanée et déclenche votre reçu d'inscription."
    },
    {
      q: "Comment obtenir et vérifier mon attestation de fin de formation ?",
      a: "Une fois votre parcours validé par l'administration, rendez-vous sur la page 'Vérifier Attestation' et saisissez le code reçu par e-mail pour télécharger votre certificat officiel au format PDF."
    },
    {
      q: "Où se situent les locaux du Centre Culturel IHN ?",
      a: "Notre centre est situé à Cotonou (Bénin). Les ateliers en présentiel se déroulent dans nos salles équipées, et des sessions en ligne sont également disponibles."
    }
  ];

  const testimonials = [
    {
      name: "Pascaline Dossou",
      role: "Apprenante en Arts Plastiques",
      quote: "Grâce à la formation en peinture au Centre IHN, j'ai pu exposer mes œuvres lors du festival culturel. L'attestation PDF téléchargeable est un vrai plus !",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Sègbégnon Agbossou",
      role: "Participant aux Séminaires",
      quote: "L'inscription est simple et le règlement par MTN MoMo est instantané. Une plateforme très moderne pour la culture béninoise.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Mireille Houndété",
      role: "Formatrice en Management Culturel",
      quote: "Un cadre académique rigoureux et passionnant. Les étudiants bénéficient d'un suivi personnalisé et de diplômes officiels.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ihn-dark via-[#102717] to-ihn-green text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8 rounded-b-[3rem] shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-ihn-light-green/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-ihn-yellow/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-ihn-yellow text-xs font-bold uppercase tracking-widest shadow-inner">
              <Sparkles className="w-4 h-4" />
              Espace Culturel & Académique IHN
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              L'Art, la Culture et la Formation au Cœur de <span className="text-ihn-yellow">l'Excellence</span>
            </h1>

            <p className="text-lg text-gray-200 font-medium max-w-2xl leading-relaxed">
              Le Centre Culturel IHN vous accompagne dans l'épanouissement artistique et la montée en compétences grâce à des événements immersifs et des parcours de formation certifiants au Bénin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button
                onClick={() => navigate('/events')}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-ihn-yellow text-ihn-dark font-extrabold text-base hover:bg-yellow-400 transition-all shadow-xl shadow-ihn-yellow/20 hover:scale-[1.02]"
              >
                <Calendar className="w-5 h-5 text-ihn-dark" />
                Découvrir nos Événements
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/formations')}
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
                  <h3 className="text-2xl font-black text-white">Culture, Art & Certification</h3>
                  <p className="text-xs text-gray-300">
                    Bénéficiez d'une attestation certifiée à chaque fin de parcours de formation.
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-around text-center">
                  <div>
                    <span className="block text-2xl font-black text-ihn-yellow">100%</span>
                    <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold">Certifié PDF</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-black text-ihn-light-green">MoMo</span>
                    <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold">MTN / Moov</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Impact Stats Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <span className="text-4xl font-black text-ihn-green block">50+</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Événements Réalisés</span>
          </div>
          <div className="space-y-1">
            <span className="text-4xl font-black text-ihn-yellow block">1 200+</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Apprenants Inscrits</span>
          </div>
          <div className="space-y-1">
            <span className="text-4xl font-black text-ihn-green block">100%</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mobile Money Bénin</span>
          </div>
          <div className="space-y-1">
            <span className="text-4xl font-black text-emerald-600 block">24/7</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Vérification Attestations</span>
          </div>
        </div>
      </section>

      {/* 3. About & Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
                alt="Centre Culturel IHN"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-ihn-dark text-white p-6 rounded-3xl shadow-xl hidden sm:flex items-center gap-4 border border-white/10 max-w-xs">
              <div className="w-12 h-12 rounded-2xl bg-ihn-yellow text-ihn-dark flex items-center justify-center font-black text-xl shrink-0">
                <Heart className="w-6 h-6 fill-ihn-dark" />
              </div>
              <div>
                <span className="font-extrabold text-sm block">Patrimoine & Créativité</span>
                <span className="text-[11px] text-gray-300">Promouvoir la culture et valoriser les talents locaux.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ihn-green/10 text-ihn-green font-bold text-xs uppercase tracking-wider">
              À propos de notre Institution
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">
              Une Référence pour la Promotion de la Culture et du Savoir
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Le Centre Culturel IHN est un espace de convergence artistique, académique et technologique. Notre mission est de favoriser l'apprentissage pratique, de valoriser les expressions culturelles traditionnelles et contemporaines, et de fournir à nos participants des certifications reconnues.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-ihn-green shrink-0" />
                <span className="text-sm font-semibold text-gray-800">Formateurs et experts renommés du monde culturel</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-ihn-green shrink-0" />
                <span className="text-sm font-semibold text-gray-800">Système de paiement Mobile Money 100% sécurisé</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-ihn-green shrink-0" />
                <span className="text-sm font-semibold text-gray-800">Génération et vérification instantanée d'attestations PDF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works - 3 Step Process */}
      <section className="bg-ihn-lightBg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ihn-green bg-ihn-green/10 px-4 py-1.5 rounded-full">
              Parcours Simple & Intuitif
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900">Comment participer en 3 étapes ?</h2>
            <p className="text-gray-600 text-sm">
              Découvrez la simplicité d'inscription et d'obtention de vos diplômes certifiés sur la plateforme IHN.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg text-center space-y-4 relative">
              <div className="w-16 h-16 rounded-2xl bg-ihn-green text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md shadow-ihn-green/30">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900">Choisissez votre Programme</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Parcourez nos événements culturels ou nos formations certifiantes et pré-inscrivez-vous en quelques clics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg text-center space-y-4 relative">
              <div className="w-16 h-16 rounded-2xl bg-ihn-yellow text-ihn-dark font-black text-2xl flex items-center justify-center mx-auto shadow-md shadow-ihn-yellow/30">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900">Réglez par Mobile Money</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Validez vos frais de formation directement via MTN MoMo ou Moov Money avec confirmation instantanée par SMS.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg text-center space-y-4 relative">
              <div className="w-16 h-16 rounded-2xl bg-ihn-dark text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md shadow-ihn-dark/30">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900">Téléchargez votre Attestation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Une fois la formation complétée, générez votre diplôme officiel PDF vérifiable publiquement avec un code unique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-ihn-green bg-ihn-green/10 px-4 py-1.5 rounded-full">
            Témoignages & Avis
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900">Ce que disent nos apprenants</h2>
          <p className="text-gray-600 text-sm">
            Découvrez les retours d'expérience des participants qui ont suivi nos programmes au Centre IHN.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex text-yellow-400 gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover shadow-md" />
                <div>
                  <h4 className="font-extrabold text-sm text-gray-900">{t.name}</h4>
                  <span className="text-xs text-ihn-green font-medium">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-ihn-green bg-ihn-green/10 px-4 py-1.5 rounded-full">
            Foire aux Questions
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900">Des questions ? Nous y répondons</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left font-bold text-gray-900 flex justify-between items-center hover:text-ihn-green transition-colors"
              >
                <span className="text-base">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-ihn-green' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-sm text-gray-600 border-t border-gray-100 pt-4 leading-relaxed bg-gray-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Call To Action (CTA Banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-ihn-dark via-ihn-card to-ihn-green text-white p-12 rounded-3xl shadow-2xl relative overflow-hidden text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/10">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black">Prêt à développer vos talents au Centre IHN ?</h2>
            <p className="text-gray-300 text-base max-w-xl">
              Rejoignez nos prochains ateliers culturels ou inscrivez-vous à nos programmes certifiants dès aujourd'hui.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
            <button
              onClick={() => navigate('/formations')}
              className="py-4 px-8 rounded-2xl bg-ihn-yellow text-ihn-dark font-extrabold text-sm hover:bg-yellow-400 shadow-xl transition-all hover:scale-105"
            >
              Consulter le Catalogue
            </button>
            <button
              onClick={() => navigate('/certificates')}
              className="py-4 px-8 rounded-2xl bg-white/10 text-white font-bold text-sm border border-white/20 hover:bg-white/20 transition-all"
            >
              Vérifier un Certificat
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
