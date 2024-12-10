import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserCog, Heart, ShoppingBag, FileKey2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserAvatar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        buttonRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="bg-transparent hover:bg-white/10 rounded-full p-2 transition-all hover:scale-110"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="h-6 w-6 rounded-full object-cover"
        />
      </button>

      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="absolute bottom-full right-0 mb-3 w-48 rounded-2xl bg-secondary/95 backdrop-blur-md shadow-xl border border-white/10"
        >
          <div className="p-2">
            <div className="px-3 py-2 text-sm text-white/60 border-b border-white/10">
              {user.name}
            </div>
            <button 
              onClick={() => {
                navigate('/profile');
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <UserCog className="h-4 w-4" />
              Editar Perfil
            </button>
            <button 
              onClick={() => {
                navigate('/orders');
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              Pedidos
            </button>
            <button 
              onClick={() => {
                navigate('/favorites');
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <Heart className="h-4 w-4" />
              Favoritos
            </button>
            <button 
              onClick={() => {
                navigate('/tokens');
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors"
            >
              <FileKey2 className="h-4 w-4" />
              Tokens
            </button>
            <button 
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-white/10 rounded-md transition-colors mt-1 border-t border-white/10"
            >
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
