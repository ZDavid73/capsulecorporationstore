import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut } from 'lucide-react';
import type { Product } from '../types/product';
import { mockProducts } from '../utils/supabase';
import ManualProductForm from '../components/ManualProductForm';
import TCGProductForm from '../components/TCGProductForm';
import { toast } from 'react-toastify';
import { productService } from '../utils/supabase';
import { Container, Tittle, Text, Button } from '../components/styledcomponents';

const PageWrapper = {
  minHeight: '100vh',
  backgroundColor: '#0f0f0f',
};

const Header = {
  backgroundColor: '#2D2D2D',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  borderBottom: '2px solid #a71fd0',
};

const HeaderContent = {
  maxWidth: '80rem',
  margin: '0 auto',
  padding: '0 1rem',
};

const HeaderInner = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '4rem',
};

const MainContent = {
  maxWidth: '80rem',
  margin: '0 auto',
  padding: '2rem 1rem',
};

const SectionHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
};

const ButtonGroup = {
  display: 'flex',
  gap: '0.75rem',
};

const TableContainer = {
  backgroundColor: '#2D2D2D',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
};

const Table = {
  width: '100%',
  borderCollapse: 'collapse' as const,
};

const TableHeader = {
  backgroundColor: '#1a1a1a',
};

const TableCell = {
  padding: '1.5rem',
  textAlign: 'left' as const,
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
};

const ProductImage = {
  height: '3rem',
  width: '3rem',
  objectFit: 'cover' as const,
  borderRadius: '15px',
};

const StatusBadge = (isHidden: boolean) => ({
  display: 'inline-flex',
  padding: '0.5rem 1rem',
  fontSize: '0.75rem',
  fontWeight: '600',
  borderRadius: '9999px',
  backgroundColor: isHidden ? '#FF4444' : '#40C485',
  color: '#ffffff',
});

const ActionButtonsGroup = {
  display: 'flex',
  gap: '0.5rem',
};

const IconButton = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '0.5rem',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
};

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState<'manual' | 'tcg' | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isOwnerLoggedIn');
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    loadProducts();
  }, [navigate]);

  const loadProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isOwnerLoggedIn');
    navigate('/');
    toast.success('Logged out successfully');
  };

  const handleAddProduct = async (productData: any) => {
    try {
      await productService.createProduct(productData);
      const newProduct: Product = {
        uuid: Date.now().toString(),
        ...productData,
        is_hidden: false,
      };
      setProducts([...products, newProduct]);
      setShowAddForm(null);
      toast.success('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    }
  };

  const handleToggleVisibility = async (product: Product) => {
    try {
      await productService.updateProduct(product.uuid, { is_hidden: !product.is_hidden });
      setProducts(
        products.map((p) => (p.uuid === product.uuid ? { ...p, is_hidden: !p.is_hidden } : p))
      );
      toast.success(`Product ${product.is_hidden ? 'shown' : 'hidden'} successfully`);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete ${product.name}?`)) return;

    try {
      await productService.deleteProduct(product.uuid);
      setProducts(products.filter((p) => p.uuid !== product.uuid));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <div style={PageWrapper}>
      <header style={Header}>
        <div style={HeaderContent}>
          <div style={HeaderInner}>
            <Tittle variant="purple" style={{ fontSize: '1.25rem', marginBottom: 0 }}>
              Admin Dashboard
            </Tittle>
            <Button 
              variant="gray"
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <LogOut style={{ height: '1.25rem', width: '1.25rem' }} />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main style={MainContent}>
        <div style={SectionHeader}>
          <Tittle variant="white" style={{ fontSize: '1.5rem' }}>
            Manage Products
          </Tittle>
          <div style={ButtonGroup}>
            <Button 
              variant="purple"
              onClick={() => setShowAddForm('manual')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Plus style={{ height: '1rem', width: '1rem' }} />
              <span>Add Manually</span>
            </Button>
            <Button 
              variant="purple"
              onClick={() => setShowAddForm('tcg')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#3b82f6' }}
            >
              <Plus style={{ height: '1rem', width: '1rem' }} />
              <span>Add from TCG API</span>
            </Button>
          </div>
        </div>

        {showAddForm === 'manual' && (
          <div style={{ marginBottom: '2rem' }}>
            <ManualProductForm
              onSubmit={handleAddProduct}
              onCancel={() => setShowAddForm(null)}
            />
          </div>
        )}

        {showAddForm === 'tcg' && (
          <div style={{ marginBottom: '2rem' }}>
            <TCGProductForm
              onSubmit={handleAddProduct}
              onCancel={() => setShowAddForm(null)}
            />
          </div>
        )}

        <div style={TableContainer}>
          <div style={{ overflowX: 'auto' }}>
            <table style={Table}>
              <thead style={TableHeader}>
                <tr>
                  <th style={{ ...TableCell, color: '#D2D2D2', fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Product
                  </th>
                  <th style={{ ...TableCell, color: '#D2D2D2', fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Category
                  </th>
                  <th style={{ ...TableCell, color: '#D2D2D2', fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Price
                  </th>
                  <th style={{ ...TableCell, color: '#D2D2D2', fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Status
                  </th>
                  <th style={{ ...TableCell, color: '#D2D2D2', fontSize: '0.75rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: '#2D2D2D' }}>
                {products.map((product) => (
                  <tr key={product.uuid}>
                    <td style={TableCell}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={product.image_url} alt={product.name} style={ProductImage} />
                        <div style={{ marginLeft: '1rem' }}>
                          <Text variant="white" style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                            {product.name}
                          </Text>
                          <Text variant="gray" style={{ fontSize: '0.875rem', maxWidth: '20rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {product.description}
                          </Text>
                        </div>
                      </div>
                    </td>
                    <td style={TableCell}>
                      <Text variant="white" style={{ fontSize: '0.875rem' }}>
                        {product.category}
                      </Text>
                    </td>
                    <td style={TableCell}>
                      <Text variant="white" style={{ fontSize: '0.875rem' }}>
                        ${product.price.toFixed(2)}
                      </Text>
                    </td>
                    <td style={TableCell}>
                      <span style={StatusBadge(product.is_hidden)}>
                        {product.is_hidden ? 'Hidden' : 'Visible'}
                      </span>
                    </td>
                    <td style={TableCell}>
                      <div style={ActionButtonsGroup}>
                        <button
                          onClick={() => handleToggleVisibility(product)}
                          style={{ ...IconButton, color: '#3b82f6' }}
                          aria-label={product.is_hidden ? 'Show product' : 'Hide product'}
                        >
                          {product.is_hidden ? (
                            <Eye style={{ height: '1rem', width: '1rem' }} />
                          ) : (
                            <EyeOff style={{ height: '1rem', width: '1rem' }} />
                          )}
                        </button>
                        <button
                          onClick={() => setEditingProduct(product)}
                          style={{ ...IconButton, color: '#a71fd0' }}
                          aria-label="Edit product"
                        >
                          <Edit style={{ height: '1rem', width: '1rem' }} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product)}
                          style={{ ...IconButton, color: '#FF4444' }}
                          aria-label="Delete product"
                        >
                          <Trash2 style={{ height: '1rem', width: '1rem' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <Text variant="gray" style={{ fontSize: '1.125rem' }}>
                No products found. Add your first product!
              </Text>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}