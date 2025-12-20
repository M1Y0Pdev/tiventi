export interface Category {
  id: number;
  name: string;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  image: string | null;
  stock: number;
  category_id: number | null;
  category_name?: string; // Will be populated by joining with 'categories' table
  colors: string[] | null;
  sizes: string[] | null;
  is_new: boolean;
  is_best_seller: boolean;
  discount: number | null;
  created_at: string;
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize: string
  selectedColor: string
}

export interface Campaign {
  id: string
  title: string
  description: string
  image: string
  link: string
  badge?: string
}

export interface OrderStatus {
  orderNumber: string
  status: 'preparing' | 'shipped' | 'delivered'
  date: string
  estimatedDelivery?: string
}
