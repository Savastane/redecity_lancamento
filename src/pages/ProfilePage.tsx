import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-secondary p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Voltar
      </button>

      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Editar Perfil</h1>
        
        <div className="relative w-24 h-24 mx-auto mb-6">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-full h-full rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-secondary hover:bg-primary/90 transition-colors">
            <Camera className="h-4 w-4" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
              Nome
            </label>
            <input
              type="text"
              id="name"
              defaultValue={user?.name}
              className="w-full bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue="user@example.com"
              className="w-full bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              defaultValue="(00) 00000-0000"
              className="w-full bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-secondary font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors mt-6"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}
