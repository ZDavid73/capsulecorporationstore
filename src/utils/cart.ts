import { type Product } from "../types/product"; 

export const cartService = {
  getCart(): Product[] {
    const cart = localStorage.getItem('hobbyShopCart');
    return cart ? JSON.parse(cart) : [];
  },

  addToCart(product: Product, quantity: number = 1) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.uuid === product.uuid);

    if (existingItem) {
      existingItem.stock_quantity += quantity;
    } else {
      cart.push({ ...product, stock_quantity: quantity });
    }

    localStorage.setItem('hobbyShopCart', JSON.stringify(cart));
    return cart;
  },

  updateQuantity(uuid: string, quantity: number) {
    const cart = this.getCart();
    const item = cart.find(item => item.uuid === uuid);
    
    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(uuid);
      }
      item.stock_quantity = quantity;
      localStorage.setItem('hobbyShopCart', JSON.stringify(cart));
    }
    
    return cart;
  },

  removeFromCart(uuid: string) {
    const cart = this.getCart().filter(item => item.uuid !== uuid);
    localStorage.setItem('hobbyShopCart', JSON.stringify(cart));
    return cart;
  },

  clearCart() {
    localStorage.removeItem('hobbyShopCart');
    return [];
  },

  getCartTotal(): number {
    return this.getCart().reduce((total, item) => total + (item.price * item.stock_quantity), 0);
  },

  generateWhatsAppMessage(): string {
    const cart = this.getCart();
    const total = this.getCartTotal();
    
    let message = 'Hello! I would like to order the following items:\n\n';
    
    cart.forEach(item => {
      message += `• ${item.name} x${item.stock_quantity} - $${(item.price * item.stock_quantity).toFixed(2)}\n`;
    });
    
    message += `\nTotal: $${total.toFixed(2)}`;
    
    return encodeURIComponent(message);
  }
};