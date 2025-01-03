export interface Promotion {
  id: string;
  name: string;
  price: number;
  fullybooked?: boolean;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
}

export interface CartItem extends Promotion {
  quantity: number;
}