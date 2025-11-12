export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: 'bra' | 'panty' | 'sets' | 'nightwear'
  colors: string[]
  sizes: string[]
  description?: string
  material?: string
  careInstructions?: string
  inStock: boolean
  isNew?: boolean
  isBestSeller?: boolean
  discount?: number
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
