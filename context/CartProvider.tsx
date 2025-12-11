'use client'

import { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { CartItem, Product } from '@/types';
import { createClient } from '@/lib/supabase/client';
import AddedToCartModal from '@/components/AddedToCartModal';
import { User } from '@supabase/supabase-js';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, selectedSize: string, selectedColor: string) => Promise<void>;
  removeFromCart: (productId: number, size: string, color: string) => Promise<void>;
  updateQuantity: (productId: number, size: string, color: string, newQuantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
  totalPrice: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState<CartItem | null>(null);
  const [user, setUser] = useState<User | null>(null);
  
  const supabase = createClient();

  const fetchAndSetDbCart = useCallback(async (userId: string) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('cart_items')
      .select('quantity, size, color, products(*, categories(name))')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching cart from DB:', error);
      setCartItems([]);
    } else {
      const fetchedCartItems: CartItem[] = data
        .filter(item => item.products && Array.isArray(item.products) && item.products.length > 0)
        .map(item => {
          const productWithCategory = item.products[0];
          const { categories, ...productData } = productWithCategory;

          return {
            product: {
              ...productData,
              category_name: categories?.name,
            } as Product,
            quantity: item.quantity,
            selectedSize: item.size,
            selectedColor: item.color,
          };
        });
      setCartItems(fetchedCartItems);
    }
    setIsLoading(false);
  }, [supabase]);

  // Simplified useEffect to handle all auth states
  useEffect(() => {
    // Set initial loading to true
    setIsLoading(true);

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        // This handles INITIAL_SESSION and SIGNED_IN events
        await fetchAndSetDbCart(currentUser.id);
      } else {
        // This handles SIGNED_OUT and initial state with no session
        const localCartString = localStorage.getItem('tiventi-cart');
        setCartItems(localCartString ? JSON.parse(localCartString) : []);
        setIsLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, fetchAndSetDbCart]);

  // For guests, save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading && !user) {
        localStorage.setItem('tiventi-cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading, user]);

  const addToCart = useCallback(async (product: Product, quantity: number, selectedSize: string, selectedColor: string) => {
    if (user) {
      const { data: existingItem, error: selectError } = await supabase.from('cart_items').select('id, quantity').eq('user_id', user.id).eq('product_id', product.id).eq('size', selectedSize).eq('color', selectedColor).single();
      if (selectError && selectError.code !== 'PGRST116') { console.error("Error checking cart:", selectError); return; }
      if (existingItem) {
        await supabase.from('cart_items').update({ quantity: existingItem.quantity + quantity }).eq('id', existingItem.id);
      } else {
        await supabase.from('cart_items').insert({ user_id: user.id, product_id: product.id, quantity, size: selectedSize, color: selectedColor });
      }
      await fetchAndSetDbCart(user.id);
    } else {
      setCartItems(prevItems => {
        const existing = prevItems.find(item => item.product.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor);
        if (existing) {
          return prevItems.map(item => item.product.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor ? { ...item, quantity: item.quantity + quantity } : item);
        }
        return [...prevItems, { product, quantity, selectedSize, selectedColor }];
      });
    }
    setModalItem({ product, quantity, selectedSize, selectedColor });
    setIsModalOpen(true);
  }, [user, supabase, fetchAndSetDbCart]);

  const removeFromCart = useCallback(async (productId: number, size: string, color: string) => {
    if (user) {
      await supabase.from('cart_items').delete().match({ user_id: user.id, product_id: productId, size: size, color: color });
      await fetchAndSetDbCart(user.id);
    } else {
      setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)));
    }
  }, [user, supabase, fetchAndSetDbCart]);
  
  const clearCart = useCallback(async () => {
    if (user) {
      await supabase.from('cart_items').delete().eq('user_id', user.id);
      await fetchAndSetDbCart(user.id);
    } else {
      setCartItems([]);
    }
  }, [user, supabase, fetchAndSetDbCart]);

  const updateQuantity = useCallback(async (productId: number, size: string, color: string, newQuantity: number) => {
     if (newQuantity <= 0) {
      await removeFromCart(productId, size, color);
      return;
    }
    if (user) {
      await supabase.from('cart_items').update({ quantity: newQuantity }).match({ user_id: user.id, product_id: productId, size: size, color: color });
      await fetchAndSetDbCart(user.id);
    } else {
      setCartItems(prev => prev.map(item => 
        item.product.id === productId && item.selectedSize === size && item.selectedColor === color
        ? { ...item, quantity: newQuantity }
        : item
      ));
    }
  }, [user, supabase, fetchAndSetDbCart, removeFromCart]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const value = { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, totalPrice, isLoading };

  return (
    <CartContext.Provider value={value}>
      {children}
      <AddedToCartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} item={modalItem} />
    </CartContext.Provider>
  );
}
