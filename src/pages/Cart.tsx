import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import cartService from '../utils/cart';
import type { Product } from '../types/product';
import { Container, Tittle, Text, Button } from '../components/styledcomponents';

const WHATSAPP_NUMBER = '573236796356';

const PageWrapper = {
  minHeight: '100vh',
  backgroundColor: '#0f0f0f',
};

const MainContent = {
  maxWidth: '64rem',
  margin: '0 auto',
  padding: '3rem 1rem',
};

const CartItemsContainer = {
  backgroundColor: '#2D2D2D',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
};

const CartItem = {
  padding: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
};

const ItemImage = {
  width: '5rem',
  height: '5rem',
  objectFit: 'cover' as const,
  borderRadius: '15px',
};

const ItemInfo = {
  flex: 1,
};

const QuantityControls = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
};

const QuantityButton = {
  padding: '0.25rem',
  borderRadius: '50%',
  backgroundColor: 'transparent',
  border: 'none',
  color: '#ffffff',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const TotalSection = {
  backgroundColor: '#1a1a1a',
  padding: '1.5rem',
  borderRadius: '0 0 15px 15px',
};

const TotalRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
};

const EmptyCartContainer = {
  textAlign: 'center' as const,
  padding: '3rem 0',
};

export default function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const items = cartService.getCart();
    setCartItems(items);
    setTotal(cartService.getCartTotal());
  };

  const updateQuantity = (uuid: string, quantity: number) => {
    cartService.updateQuantity(uuid, quantity);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (uuid: string) => {
    cartService.removeFromCart(uuid);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleCheckout = () => {
    const message = cartService.generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <div style={PageWrapper}>
        <Header />
        <main style={MainContent}>
          <div style={EmptyCartContainer}>
            <ShoppingBag style={{ height: '6rem', width: '6rem', color: '#2D2D2D', margin: '0 auto 1rem' }} />
            <Tittle variant="white" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Your cart is empty
            </Tittle>
            <Text variant="gray" style={{ marginBottom: '2rem' }}>
              Add some products to get started!
            </Text>
            <a href="/" style={{ textDecoration: 'none' }}>
              <Button variant="purple">
                Continue Shopping
              </Button>
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={PageWrapper}>
      <Header />
      <main style={MainContent}>
        <Tittle variant="white" style={{ fontSize: '1.875rem', marginBottom: '2rem' }}>
          Shopping Cart
        </Tittle>

        <div style={CartItemsContainer}>
          <div>
            {cartItems.map((item) => (
              <div key={item.uuid} style={CartItem}>
                <img src={item.image_url} alt={item.name} style={ItemImage} />
                
                <div style={ItemInfo}>
                  <Tittle variant="white" style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>
                    {item.name}
                  </Tittle>
                  <Text variant="gray" style={{ fontSize: '0.875rem' }}>
                    {item.category}
                  </Text>
                  <Text variant="purple" style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>
                    ${item.price.toFixed(2)}
                  </Text>
                </div>

                <div style={QuantityControls}>
                  <button
                    onClick={() => updateQuantity(item.uuid, item.stock_quantity - 1)}
                    style={QuantityButton}
                    aria-label="Decrease quantity"
                  >
                    <Minus style={{ height: '1rem', width: '1rem' }} />
                  </button>
                  <Text variant="white" style={{ width: '2rem', textAlign: 'center', fontWeight: '500' }}>
                    {item.stock_quantity}
                  </Text>
                  <button
                    onClick={() => updateQuantity(item.uuid, item.stock_quantity + 1)}
                    style={QuantityButton}
                    aria-label="Increase quantity"
                  >
                    <Plus style={{ height: '1rem', width: '1rem' }} />
                  </button>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <Text variant="white" style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>
                    ${(item.price * item.stock_quantity).toFixed(2)}
                  </Text>
                  <button
                    onClick={() => removeItem(item.uuid)}
                    style={{ 
                      ...QuantityButton, 
                      color: '#FF4444', 
                      marginTop: '0.5rem',
                      display: 'block',
                      marginLeft: 'auto'
                    }}
                    aria-label="Remove item"
                  >
                    <Trash2 style={{ height: '1rem', width: '1rem' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={TotalSection}>
            <div style={TotalRow}>
              <Text variant="white" style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                Total
              </Text>
              <Text variant="purple" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                ${total.toFixed(2)}
              </Text>
            </div>
            <Button
              variant="green"
              onClick={handleCheckout}
              style={{ width: '100%', padding: '0.75rem 1.5rem', fontWeight: '600' }}
            >
              Checkout via WhatsApp
            </Button>
            <Text variant="gray" style={{ fontSize: '0.875rem', marginTop: '0.5rem', textAlign: 'center' }}>
              You'll be redirected to WhatsApp to complete your order
            </Text>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}