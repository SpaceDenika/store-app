import { IProduct } from '../../models/IProduct';

export interface IProductCard {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  product: IProduct;
}