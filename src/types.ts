export interface Promotion {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export interface CartItem extends Promotion {
  quantity: number;
}