import { Injectable } from '@angular/core';
import { Order } from '../main/models/order.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders() {
  	return this.http.get(`${environment.apiBaseUrl}/admin/orders`);
  }

  getOrdersDetail() {
  	return this.http.get(`${environment.apiBaseUrl}/admin/orders/:id`);
  }

  getOrdersByUser(){
  	return this.http.get(`${environment.apiBaseUrl}/orders`);
  }
}
