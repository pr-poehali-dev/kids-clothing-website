const API_BASE_URL = 'https://functions.poehali.dev';
const PRODUCTS_API = `${API_BASE_URL}/023a2035-78dc-4410-b45d-f7050caada9f`;
const CART_API = `${API_BASE_URL}/1735056e-9de6-49ae-8a6a-d872bab5c438`;

let sessionId = localStorage.getItem('sessionId');
if (!sessionId) {
  sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('sessionId', sessionId);
}

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  sizes: string[];
  isNew?: boolean;
  gender: string;
  ageGroup: string;
}

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  category: string;
  size: string;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
  total: number;
  count: number;
}

export const api = {
  async getProducts(filters?: {
    gender?: string;
    ageGroup?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Product[]> {
    const params = new URLSearchParams();
    
    if (filters?.gender) params.append('gender', filters.gender);
    if (filters?.ageGroup) params.append('age_group', filters.ageGroup);
    if (filters?.minPrice) params.append('min_price', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('max_price', filters.maxPrice.toString());
    
    const url = `${PRODUCTS_API}${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.products;
  },

  async getCart(): Promise<CartResponse> {
    const response = await fetch(CART_API, {
      headers: {
        'X-Session-Id': sessionId!
      }
    });
    return response.json();
  },

  async addToCart(productId: number, size: string, quantity: number = 1): Promise<{ success: boolean; count: number }> {
    const response = await fetch(CART_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-Id': sessionId!
      },
      body: JSON.stringify({ productId, size, quantity })
    });
    return response.json();
  },

  async removeFromCart(itemId: number): Promise<{ success: boolean }> {
    const response = await fetch(`${CART_API}?id=${itemId}`, {
      method: 'DELETE',
      headers: {
        'X-Session-Id': sessionId!
      }
    });
    return response.json();
  }
};
