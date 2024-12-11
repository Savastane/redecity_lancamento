import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Volume2, VolumeX, Calendar } from 'lucide-react';
import type { Product } from '../types';
import { submitLead } from '../api/leadsApi';
import { userIP } from '../App';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

interface LeadForm {
  name: string;
  email: string;
  whatsapp: string;
  cep?: string;
  comment?: string;
}

const LAUNCH_DATE = new Date('2025-02-01T00:00:00');

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadForm>({
    name: '',
    email: '',
    whatsapp: '',
    cep: '',
    comment: '',
  });
  const [showPopup, setShowPopup] = useState(false);

  // Função para formatar o número de WhatsApp
  const formatWhatsApp = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .slice(0, 15);
  };

  // Função para formatar o CEP
  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);
  };

  useEffect(() => {
    const element = document.querySelector('.launch-date');
    if (element) {
      element.classList.add('animate-blink');
      setTimeout(() => {
        element.classList.remove('animate-blink');
      }, 5000);
    }
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const lead = {
      idproduto: product.id,
      nome: leadForm.name,
      email: leadForm.email,
      whatsapp: leadForm.whatsapp,
      cep: leadForm.cep,
      comentario: leadForm.comment,
      ip_address: userIP,
    };
    try {
      await submitLead(lead);
      console.log('Lead submitted successfully');
    } catch (error) {
      console.error('Failed to submit lead', error);
    }
    setShowLeadForm(false);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="absolute inset-0 h-full w-full">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="bg-white text-black text-center py-8 px-16 rounded-xl shadow-2xl relative max-w-md mx-auto">
            <button onClick={() => setShowPopup(false)} className="absolute top-2 right-2 text-gray-500 hover:text-black">&times;</button>
            <div className="flex justify-center mb-4">
              <div className="bg-green-500 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="font-bold text-xl">Sucesso</h2>
            <p className="mt-2">Obrigado pelo interesse! Entraremos em contato em breve.</p>
          </div>
        </div>
      )}
      <video
        src={product.videoUrl}
        className="absolute inset-0 h-full w-full object-cover"
        loop
        autoPlay
        muted={isMuted}
        playsInline
        poster={product.thumbnailUrl}
      />
      
      <div className="absolute  inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent">
        <div className="absolute top-1/2 bottom-10 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div className="text-white max-w-[75%]">
              <h2 className="text-2xl font-bold leading-tight">{product.name}</h2>
              <div className="mt-2">
                <div className="flex items-center gap-2 text-yellow-500 mb-2 launch-date">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium text-shadow" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Lançamento: 1 de Fevereiro de 2025</span>
                </div>
                <button 
                  onClick={() => setShowLeadForm(true)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-secondary px-6 py-3 rounded-lg transition-colors text-sm font-medium"
                >
                  Cadastrar Interesse
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="rounded-full bg-white/20 p-2 backdrop-blur-md transition-colors hover:bg-white/30"
              >
                <Heart
                  className={isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}
                />
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="rounded-full bg-white/20 p-2 backdrop-blur-md transition-colors hover:bg-white/30"
              >
                {isMuted ? (
                  <VolumeX className="text-white" />
                ) : (
                  <Volume2 className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Form Modal */}
      {showLeadForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="modal-background p-6 rounded-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#00dc82] mb-4">Cadastre seu interesse</h3>
            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Nome</label>
                <input
                  type="text"
                  required
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="input-field w-full px-4 py-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  className="input-field w-full px-4 py-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={leadForm.whatsapp}
                  onChange={(e) => setLeadForm({ ...leadForm, whatsapp: formatWhatsApp(e.target.value) })}
                  className="input-field w-full px-4 py-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">CEP</label>
                <input
                  type="text"
                  value={leadForm.cep}
                  onChange={(e) => setLeadForm({ ...leadForm, cep: formatCEP(e.target.value) })}
                  className="input-field w-full px-4 py-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="CEP"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Comentário</label>
                <textarea
                  value={leadForm.comment}
                  onChange={(e) => setLeadForm({ ...leadForm, comment: e.target.value })}
                  className="input-field w-full px-4 py-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Deixe seu comentário aqui"
                  rows={2}
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowLeadForm(false)}
                  className="cancel-button flex-1 hover:bg-white/20 px-6 py-3 rounded-lg transition-colors text-sm font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="cadastrar-button flex-1 hover:bg-yellow-500 px-6 py-3 rounded-lg transition-colors text-sm font-medium"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}