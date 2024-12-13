import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Heart, Volume2, VolumeX, Calendar } from 'lucide-react';
import type { Product } from '../types';
import { submitLead } from '../api/leadsApi';
import { userIP } from '../App';
import LazyLoad from 'react-lazy-load';
import { useAudio } from '../contexts/AudioContext';

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
  const { globalMuted, setGlobalMuted } = useAudio();
  const [isMuted, setIsMuted] = useState(true); // Começa mutado para garantir autoplay
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
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

  // Detectar primeira interação do usuário
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  // Força a reprodução quando o vídeo estiver pronto
  const handleCanPlay = () => {
    setIsVideoReady(true);
    if (videoRef.current) {
      
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          // Vídeo começou a reproduzir, atualizamos o mute          
          setIsMuted(globalMuted || !isInView);
          setIsMuted(globalMuted || !isInView);
          setIsMuted(globalMuted || !isInView);
          
          
          videoRef.current!.muted = globalMuted || !isInView;
          
        })
        .catch((error) => {
          console.log('Playback prevented', error);
        });
    }
  };

  // Configurar o observer para detectar quando o vídeo está visível
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          const video = videoRef.current;
          if (!video) return;

          if (entry.isIntersecting) {
            // Vídeo entrou na view
            video.currentTime = 0; // Recomeça do início
            video.muted = !globalMuted; // Mantém o estado de mute global
            
            video.play()
              .then(() => {
                setIsPlaying(true);
                // Atualiza para o estado global após começar a reproduzir
                video.muted = globalMuted;
              })
              .catch(() => {
                video.muted = true;
              });
          } else {
            video.pause();
            setIsPlaying(false);
            video.muted = true;
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, [globalMuted]);

  // Garantir que o vídeo na viewport comece com áudio obedecendo ao estado do mute global
  useEffect(() => {
    const video = videoRef.current;
    if (video && isInView) {
      video.muted = globalMuted;
      video.play().catch(() => {
        video.muted = true;
      });
    }
  }, [isInView, globalMuted]);

  // Toggle do mute (afeta todos os vídeos)
  const handleToggleMute = () => {
    const newMutedState = !globalMuted;
    setGlobalMuted(newMutedState);
  };

  // Função para pausar o vídeo
  const handlePauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Função para reproduzir o vídeo
  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

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
      <LazyLoad height={800} offset={500}>
        <video
          ref={videoRef}
          src={product.videoUrl}
          className="absolute inset-0 h-full w-full object-cover"
          loop
          playsInline
          muted={isMuted}
          poster={product.thumbnailUrl}
          autoPlay
          preload="auto"
          onCanPlay={handleCanPlay}
        />
      </LazyLoad>
      {/* absolute */}
      <div className=" inset-0 bg-gradient-to-t from-secondary/95 via-secondary/50 to-transparent">
        <div className="absolute top-1/2  bottom-10 left-0 right-0 p-6">
          <div className="flex items-end justify-between">
            <div className="text-white max-w-[75%]">
              <h2 className="text-2xl font-bold leading-tight text-shadow-md">{product.name}</h2>
              <div className="mt-2">
                <div className="flex items-center gap-2 text-yellow-500 mb-2 launch-date">
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium text-shadow-md" style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)' }}>Lançamento: 1 de Fevereiro de 2025</span>

                </div>
                

                <button 
                  onClick={() => setShowLeadForm(true)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-secondary px-6 py-3 rounded-lg transition-transform duration-300 ease-in-out text-sm font-medium hover:shadow-lg hover:scale-105"
                >
                  <span className="inline-block px-2 py-1 bg-white rounded-full text-xs font-bold"> Clique aqui e  Cadastre-se </span>
                  <span className="ml-2">e seja o primeiro a saber das novidades!</span>
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
                onClick={handleToggleMute}
                className="rounded-full bg-white/20 p-2 backdrop-blur-md transition-colors hover:bg-white/30"
              >
                {globalMuted ? (
                  <VolumeX className="text-white" />
                ) : (
                  <Volume2 className="text-white" />
                )}
              </button>
              {isPlaying ? (
                <button
                  onClick={handlePauseVideo}
                  className="rounded-full bg-white/20 p-2 backdrop-blur-md transition-colors hover:bg-white/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={handlePlayVideo}
                  className="rounded-full bg-white/20 p-2 backdrop-blur-md transition-colors hover:bg-white/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 9-14 9V3z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Form Modal */}
      {showLeadForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="modal-background p-6 rounded-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-[#00dc82] mb-4">Participe do Lançamento!</h3>
            <form onSubmit={handleLeadSubmit} className="space-y-4 flex flex-col justify-between h-full">
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nome *</label>
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">E-mail *</label>
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
                  <label className="block text-sm font-medium text-gray-300 mb-1">WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={leadForm.whatsapp}
                    onChange={(e) => setLeadForm({ ...leadForm, whatsapp: formatWhatsApp(e.target.value) })}
                    className="input-field w-full px-4 py-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="(DDD) Número de WhatsApp"
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
                  <p className="text-xs text-gray-500 mt-1">Para oferecer informações específicas da sua região.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Comentário</label>
                  <textarea
                    value={leadForm.comment}
                    onChange={(e) => setLeadForm({ ...leadForm, comment: e.target.value })}
                    className="input-field w-full px-4 py-2 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Como podemos ajudá-lo?"
                    rows={2}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <button 
                  type="button"
                  className="cancelar-button flex-none hover:bg-gray-700 px-4 py-3 rounded-lg transition-colors text-sm font-medium mr-2"
                  onClick={() => setShowLeadForm(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="cadastrar-button flex-grow hover:bg-yellow-500 px-6 py-3 rounded-lg transition-colors text-sm font-medium"
                >
                  Quero Participar
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-500 mt-4">Garantimos que suas informações estão seguras conosco.</p>
          </div>
        </div>
      )}
    </div>
  );
}