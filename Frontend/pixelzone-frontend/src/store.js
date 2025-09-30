import { reactive, watch } from 'vue';

// Helper function to save cart to localStorage
const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Load cart from localStorage or initialize as empty array
const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

export const store = reactive({
  cart: initialCart,

  addToCart(product) {
    const existingProduct = this.cart.find(item => item.id === product.id);
    if (!existingProduct) {
      this.cart.push(product);
      saveCart(this.cart);
    } else {
      // Optional: handle case where product is already in cart, e.g., show a message.
      console.log('Product already in cart');
    }
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    saveCart(this.cart);
  },

  clearCart() {
    this.cart = [];
    saveCart(this.cart);
  }
});
