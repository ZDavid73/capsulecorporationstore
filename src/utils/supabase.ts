// Supabase configuration - filled with provided project values.
// Public (publishable) key - safe for client usage.
// For server-side operations use the secret key below (DO NOT expose this in client-side code).

export const SUPABASE_URL = 'https://ihhevhrrvmofklorfxfc.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloaGV2aHJydm1vZmtsb3JmeGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwMzIzMDQsImV4cCI6MjA4NDYwODMwNH0.2aBMqZ1zDgRbmOXQxtOZWYXfBfRQ6UYExJlJYWz8zj4';

// Server / service role key (keep secret, use only on server)
// SUPABASE_SERVICE_KEY = 'sb_secret_lZXdIqjtacr3STe4GD28mw_32famwkb'

// Cliente Supabase activado - ahora funcional
import { createClient } from '@supabase/supabase-js';
import type { Product } from '../types/product.ts';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const productService = {
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_hidden', false);
    
    if (error) throw error;
    return data;
  },

  async getAllProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  async createProduct(product: Omit<Product, 'uuid'>) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async updateProduct(uuid: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('uuid', uuid)
      .select();
    
    if (error) throw error;
    return data[0];
  },

  async deleteProduct(uuid: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('uuid', uuid);
    
    if (error) throw error;
  }
};

// Mock data para desarrollo (opcional, ahora puedes removerlo cuando Supabase funcione)
export const mockProducts = [
  {
    uuid: '1',
    name: 'Charizard Card',
    image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
    description: 'Rare holographic Charizard trading card',
    price: 299.99,
    category: 'Trading Cards',
    is_hidden: false,
    stock_quantity: 3,
    created_at: '2023-10-01T12:00:00Z'
  },
  {
    uuid: '2',
    name: 'Settlers of Catan',
    image_url: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400',
    description: 'Classic strategy board game for 3-4 players',
    price: 49.99,
    category: 'Board Games',
    is_hidden: false,
    stock_quantity: 10,
    created_at: '2023-10-05T15:30:00Z'
  },
  {
    uuid: '3',
    name: 'Space Marine Miniature',
    image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    description: 'Detailed painted miniature figure',
    price: 24.99,
    category: 'Miniatures',
    is_hidden: false,
    stock_quantity: 15,
    created_at: '2023-10-10T09:45:00Z'
  }
];
