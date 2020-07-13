import { Injectable } from '@angular/core';
import { Product } from '../main/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getProducts() {
  	return this.http.get(`${environment.apiBaseUrl}/products`);
  }

  getProductByAdmin() {
  	return this.http.get(`${environment.apiBaseUrl}/admin/products`);
  }

  /*deleteProductByAdmin(productId){
  	return this.http.delete(`${environment.apiBaseUrl}/admin/products/${productId}`);
  }*/

  getProductDetail(productId) {
    return this.http.get(`${environment.apiBaseUrl}/products/${productId}`);
  }

  addProduct(product) {
    return this.http.post(`${environment.url}/product/create`, product)
  }

  editProduct(product, productId) {
    return this.http.put(`${environment.url}/product/${productId}`, product)
  }

  deleteProduct(productId) {
    return this.http.delete(`${environment.url}/product/${productId}`);
  }

}
  