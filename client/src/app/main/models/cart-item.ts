import { Product } from './product.model';

export class CartItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: string;
  imageUrl: string;

  constructor(id: number, product: Product, quantity = 0) {
    this.id = id;
    this.productId = product._id;
    this.productName = product.name;
    this.price = product.price;
    this.quantity = quantity;
    this.imageUrl = product.imageUrl
  }
}