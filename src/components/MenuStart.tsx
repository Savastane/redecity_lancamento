import React, { useState } from 'react';
import { Home, PackageSearch, HelpCircle, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import UserAvatar from './UserAvatar';
import { useAuth } from '../contexts/AuthContext';
import { CATEGORIES } from '../data/categories';

export default function MenuStart() {
  const [showLogin, setShowLogin] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    // Here you can implement the filter logic
    console.log(`Filtering by ${categoryId} > ${subcategoryId}`);
    setShowFilter(false);
    setSelectedCategory(null);
  };

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 bg-secondary/20 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/5">
          <button 
            onClick={() => navigate('/')}
            className="bg-transparent hover:bg-white/10 rounded-full p-2 transition-all hover:scale-110"
          >
            <Home className="h-6 w-6 text-white" />
          </button>
          <button 
            onClick={() => setShowFilter(!showFilter)} 
            className="bg-transparent hover:bg-white/10 rounded-full p-2 transition-all hover:scale-110"
          >
            <PackageSearch className="h-6 w-6 text-white" />
          </button>
          {isAuthenticated ? (
            <UserAvatar />
          ) : (
            <button 
              onClick={() => navigate('/faq')}
              className="bg-transparent hover:bg-white/10 rounded-full p-2 transition-all hover:scale-110"
            >
              <HelpCircle className="h-6 w-6 text-white" />
            </button>
          )}
        </div>
      </div>

      {showFilter && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => {
              setShowFilter(false);
              setSelectedCategory(null);
            }}
          />
          <div className="relative w-full max-w-lg bg-secondary rounded-t-2xl sm:rounded-2xl shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <h2 className="text-lg font-semibold text-white">Filtrar por Categoria</h2>
              <button 
                onClick={() => {
                  setShowFilter(false);
                  setSelectedCategory(null);
                }}
                className="rounded-full p-2 hover:bg-white/10"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
            <div className="divide-y divide-white/10 max-h-[60vh] overflow-y-auto">
              {CATEGORIES.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className="flex items-center justify-between w-full p-4 text-white hover:bg-white/5"
                  >
                    <span>{category.name}</span>
                    <ChevronRight className={`h-5 w-5 transition-transform ${
                      selectedCategory === category.id ? 'rotate-90' : ''
                    }`} />
                  </button>
                  {selectedCategory === category.id && (
                    <div className="bg-white/5 py-2">
                      {category.subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubcategoryClick(category.id, sub.id)}
                          className="w-full px-8 py-2 text-sm text-white/80 hover:bg-white/5 text-left"
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showLogin && (
        <div className="fixed inset-0 z-[100]">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setShowLogin(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative z-10 w-full max-w-md">
              <Login onClose={() => setShowLogin(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}