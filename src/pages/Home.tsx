import React, { useState, useEffect } from 'react';
import { Key } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import LoginModal from '../components/LoginModal';
import type { Product } from '../types/product';
import { mockProducts } from '../utils/supabase';
import { Tittle, Text, Button } from '../components/styledcomponents';

const PageWrapper = {
  minHeight: '100vh',
  backgroundColor: '#0f0f0f',
};

const MainContent = {
  maxWidth: '80rem',
  margin: '0 auto',
  padding: '2rem 1rem',
};

const HeaderSection = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
};

const GridLayout = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '2rem',
};

const FiltersColumn = {
  gridColumn: '1',
};

const ProductsColumn = {
  gridColumn: '1',
};

const ProductsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '1.5rem',
};

const LoadingContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '16rem',
};

const LoadingSpinner = {
  width: '3rem',
  height: '3rem',
  border: '4px solid #2D2D2D',
  borderTop: '4px solid #a71fd0',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '0 auto 1rem',
};

const EmptyState = {
  textAlign: 'center' as const,
  padding: '3rem 0',
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = mockProducts.filter(product => !product.is_hidden);
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  if (isLoading) {
    return (
      <div style={PageWrapper}>
        <Header />
        <main style={MainContent}>
          <div style={LoadingContainer}>
            <div style={{ textAlign: 'center' }}>
              <div style={LoadingSpinner}></div>
              <Text variant="gray">Loading products...</Text>
            </div>
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
        <div style={HeaderSection}>
          <div>
            <Tittle variant="white" style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>
              Our Products
            </Tittle>
            <Text variant="gray">
              Discover amazing hobby items and collectibles
            </Text>
          </div>
          <Button 
            variant="gray"
            onClick={() => setIsLoginModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            aria-label="Owner login"
          >
            <Key style={{ height: '1.25rem', width: '1.25rem' }} />
            <span style={{ fontSize: '0.875rem' }}>Owner</span>
          </Button>
        </div>

        <div style={GridLayout}>
          <div style={FiltersColumn}>
            <ProductFilters 
              selectedCategory={selectedCategory} 
              onCategoryChange={setSelectedCategory} 
            />
          </div>

          <div style={ProductsColumn}>
            {filteredProducts.length === 0 ? (
              <div style={EmptyState}>
                <Text variant="gray" style={{ fontSize: '1.125rem' }}>
                  No products found in this category.
                </Text>
              </div>
            ) : (
              <div style={ProductsGrid}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.uuid} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (min-width: 1024px) {
          .grid-layout {
            grid-template-columns: 300px 1fr;
          }
        }
      `}</style>
    </div>
  );
}