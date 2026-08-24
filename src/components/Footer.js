import React from 'react';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';

const Footer = ({ setActiveTab }) => {
  return (
    <footer className="bg-ihn-dark text-white border-t-4 border-ihn-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="IHN Logo" className="h-12 w-auto object-contain bg-white/10 p-1 rounded-lg" />
              <div>
                <h3 className="text-xl font-extrabold text-white">Centre Culturel IHN</h3>
                <p className="text-xs text-ihn-light-green font-semibold">Promotion de la Culture & des Arts</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Le Centre Culturel IHN est un espace dynamique dédié à la formation, aux événements culturels et au rayonnement artistique et intellectuel.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-ihn-yellow transition-colors">
                  Accueil
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('events')} className="hover:text-ihn-yellow transition-colors">
                  Événements à venir
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('formations')} className="hover:text-ihn-yellow transition-colors">
                  Catalogue de Formations
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('certificates')} className="hover:text-ihn-yellow transition-colors">
                  Vérification d'Attestations
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Contact & Accès</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-ihn-light-green shrink-0 mt-0.5" />
                <span>Siège IHN, Cotonou / Porto-Novo, Bénin</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-ihn-light-green shrink-0" />
                <span>+229 97 00 00 00 / +229 95 00 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-ihn-light-green shrink-0" />
                <span>contact@ihn-culture.bj</span>
              </li>
            </ul>
          </div>

          {/* Payments & Badges */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Paiement Sécurisé</h4>
            <p className="text-xs text-gray-400 mb-3">
              Inscriptions et règlements en ligne sécurisés via vos moyens de paiement locaux :
            </p>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-500 text-black font-extrabold text-xs px-3 py-1.5 rounded shadow">
                MTN MoMo
              </span>
              <span className="bg-blue-600 text-white font-extrabold text-xs px-3 py-1.5 rounded shadow">
                Moov Money
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Centre Culturel IHN. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Conçu avec <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> pour le Centre IHN
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
