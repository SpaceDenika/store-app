export interface IProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface ICartProduct extends IProduct {
  count: number;
  totalPrice: number;
}

export interface ServerResponse {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}