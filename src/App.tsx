import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import Header from './components/Header';
import { useCart } from './hooks/useCart';
import { getAllPromotions } from './services/firestore';
import MenuStart from './components/MenuStart';
import { AuthProvider } from './contexts/AuthContext';
import { AudioProvider } from './contexts/AudioContext';
//import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import TokensPage from './pages/TokensPage';
import NavigationArrows from './components/NavigationArrows';
import FAQPage from './pages/FAQPage';
import PromotionCard from './components/PromotionCard';
import type { Promotion } from './types';

export let userIP = '';

function HomePage() {
  const cart = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = 5;

  // Carregar promoções do Firestore
  useEffect(() => {
    const loadPromotions = async () => {
      try {
        const promotionsData = await getAllPromotions();
        setPromotions(promotionsData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar promoções:', error);
        setLoading(false);
      }
    };

    loadPromotions();
  }, []);

  const filteredPromotions = useMemo(() => {
    if (!searchTerm) return promotions;
    return promotions.filter(promotion => 
      promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, promotions]);

  const paginatedPromotions = useMemo(() => {
    return filteredPromotions.slice(0, currentPage * ITEMS_PER_PAGE);
  }, [filteredPromotions, currentPage]);

  const lastPromotionRef = useCallback((node: HTMLDivElement) => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && paginatedPromotions.length < filteredPromotions.length) {
        setCurrentPage(prev => prev + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [filteredPromotions.length, paginatedPromotions.length]);

  const handleScrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        userIP = data.ip;
      })
      .catch(error => console.error('Error fetching IP:', error));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Header
        onOpenCart={cart.toggleCart}
        cartItemsCount={cart.totalItems}
      />
      
      <div className="mx-auto h-screen w-full max-w-[430px] bg-[#1a2028] pt-16">
        <div
          ref={scrollContainerRef}
          className="h-[calc(100vh-4rem)] overflow-y-auto snap-y snap-mandatory"
        >       
          {paginatedPromotions.map((promotion, index) => (
            <div
              key={promotion.id}
              ref={index === paginatedPromotions.length - 1 ? lastPromotionRef : undefined}
              className="relative h-screen w-full snap-start"
            >
              <div className="absolute inset-0">
                <PromotionCard
                  promotion={promotion}
                  onAddToCart={cart.addToCart}
                />
              </div>
            </div>
          ))}
        </div>
        <NavigationArrows 
          onUpClick={handleScrollUp}
          onDownClick={handleScrollDown}
        />
      </div>
      <Cart 
        items={cart.items}
        isOpen={cart.isOpen}
        onClose={cart.closeCart}
        onUpdateQuantity={cart.updateQuantity}
        onRemove={cart.removeFromCart}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AudioProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/login" element={<LoginPage />} /> */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/tokens" element={<TokensPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
          <MenuStart />
        </AudioProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}