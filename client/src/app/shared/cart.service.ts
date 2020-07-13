import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../main/models/cart-item';
import { Product } from '../main/models/product.model';
import { environment } from '../../environments/environment';


const cartUrl = `${environment.apiBaseUrl}/cart`;


@Injectable({
  providedIn: 'root'
})

export class CartService {

  constructor(private http: HttpClient) { }

  paymentCart(){
    return this.http.post(`${environment.apiBaseUrl}/cart/payment`,{});
  }

  getCartItems()/*: Observable<CartItem[]>*/ {
    return this.http.get(`${environment.apiBaseUrl}/cart`);
  }

  addProductToCart(product: Product): Observable<any> {
    return this.http.post(cartUrl, { product });
  }

  RemoveProductFromCart(productId): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/cart/${productId}`);
  }



}
