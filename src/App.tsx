import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import Header from './components/Header';
import { useCart } from './hooks/useCart';
import { PROMOTIONS } from './data/promotions';
import MenuStart from './components/MenuStart';
import { AuthProvider } from './contexts/AuthContext';
import { AudioProvider } from './contexts/AudioContext';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import TokensPage from './pages/TokensPage';
import NavigationArrows from './components/NavigationArrows';
import FAQPage from './pages/FAQPage';
import PromotionCard from './components/PromotionCard';

let userIP = '';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cart = useCart();

  const ITEMS_PER_PAGE = 5;
  const filteredPromotions = useMemo(() => {
    if (!searchTerm) return PROMOTIONS;
    return PROMOTIONS.filter(promotion => 
      promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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
      const currentScroll = scrollContainerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      scrollContainerRef.current.scrollTo({
        top: Math.max(currentScroll - windowHeight, 0),
        behavior: 'smooth'
      });
    }
  };

  const handleScrollDown = () => {
    if (scrollContainerRef.current) {
      const currentScroll = scrollContainerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      scrollContainerRef.current.scrollTo({
        top: currentScroll + windowHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1a2028]">
      <Header
        onOpenCart={cart.toggleCart}
        cartItemsCount={cart.totalItems}
        // onSearch={setSearchTerm}
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

        <Cart
          items={cart.items}
          isOpen={cart.isOpen}
          onClose={cart.closeCart}
          onUpdateQuantity={cart.updateQuantity}
          onRemove={cart.removeFromCart}
        />
      </div>

      <NavigationArrows
        onUpClick={handleScrollUp}
        onDownClick={handleScrollDown}
      />
    </div>
  );
}

function App() {
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        userIP = data.ip;
        // console.log('IP Address:', userIP);
      })
      .catch(error => console.error('Error fetching IP:', error));
  }, []);

  return (
    <AudioProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/tokens" element={<TokensPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
          <MenuStart />
        </AuthProvider>
      </BrowserRouter>
    </AudioProvider>
  );
}

export { userIP };
export default App;