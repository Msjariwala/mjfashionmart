import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import AIChat from './components/AIChat';
import { AboutUs, ContactUs, Feedback } from './components/StaticPages';
import { Product, CartItem, PageView } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Hero onGetStarted={() => setCurrentPage('catalog')} />;
      case 'catalog':
        return <ProductList onAddToCart={handleAddToCart} />;
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <ContactUs />;
      case 'feedback':
        return <Feedback />;
      default:
        return <Hero onGetStarted={() => setCurrentPage('catalog')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        cartItemCount={cartItemCount}
        onToggleCart={() => setIsCartOpen(true)}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MJFashionMart. All rights reserved.
          </p>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <AIChat />
    </div>
  );
};

export default App;