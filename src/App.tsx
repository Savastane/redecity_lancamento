import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Header from './components/Header';
import { useCart } from './hooks/useCart';
import { PRODUCTS } from './data/products';
import MenuStart from './components/MenuStart';
import { AuthProvider } from './contexts/AuthContext';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import TokensPage from './pages/TokensPage';
import NavigationArrows from './components/NavigationArrows';
import FAQPage from './pages/FAQPage';

let userIP = '';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cart = useCart();

  const ITEMS_PER_PAGE = 5;
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(0, currentPage * ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const lastProductRef = useCallback((node: HTMLDivElement) => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && paginatedProducts.length < filteredProducts.length) {
        setCurrentPage(prev => prev + 1);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [filteredProducts.length, paginatedProducts.length]);

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
        // onSearch={setSearchQuery}
      />
      
      <div className="mx-auto h-screen w-full max-w-[430px] bg-[#1a2028] pt-16">
        <div 
          ref={scrollContainerRef}
          className="h-[calc(100vh-4rem)] overflow-y-auto snap-y snap-mandatory"
        >       
          {paginatedProducts.map((product, index) => (
            <div
              key={product.id}
              ref={index === paginatedProducts.length - 1 ? lastProductRef : undefined}
              className="relative h-screen w-full snap-start"
            >
              <div className="absolute inset-0">
                <ProductCard
                  product={product}
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
        console.log('IP Address:', userIP);
      })
      .catch(error => console.error('Error fetching IP:', error));
  }, []);

  return (
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
  );
}

export { userIP };
export default App;