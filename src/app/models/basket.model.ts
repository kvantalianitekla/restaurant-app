import { Product } from './product.model';

export interface BasketItem {
  quantity: number;
  price: number;
  product: Product;
}
