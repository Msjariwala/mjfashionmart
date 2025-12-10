export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type PageView = 'home' | 'catalog' | 'about' | 'contact' | 'feedback';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}