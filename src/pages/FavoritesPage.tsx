import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';

export default function FavoritesPage() {
  const navigate = useNavigate();
  
  // Exemplo de dados de favoritos - Em produção, isso viria de uma API
  const favorites = [
    {
      id: '1',
      name: 'Corte de Cabelo',
      provider: 'João Silva',
      price: 50.00,
      image: 'https://example.com/service1.jpg'
    },
    {
      id: '2',
      name: 'Manicure',
      provider: 'Maria Santos',
      price: 35.00,
      image: 'https://example.com/service2.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-secondary p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Voltar
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-white">Meus Favoritos</h1>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">Você ainda não tem favoritos</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="bg-white/5 rounded-lg overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="aspect-video relative">
                  <img
                    src={favorite.image}
                    alt={favorite.name}
                    className="w-full h-full object-cover"
                  />
                  <button 
                    className="absolute top-2 right-2 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
                    onClick={() => {
                      // Remover dos favoritos
                    }}
                  >
                    <Heart className="h-5 w-5 text-white fill-current" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-white mb-1">{favorite.name}</h3>
                  <p className="text-sm text-white/60 mb-2">{favorite.provider}</p>
                  <p className="text-primary font-medium">R$ {favorite.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
