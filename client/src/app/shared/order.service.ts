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
  	return this.http.get(`${environment.apiBaseUrl}/admin/orderadmins`);
  }

  confirmOrder(orderId, userId){
    return this.http.post(`${environment.apiBaseUrl}/admin/orderadmins/confirm/${orderId}/${userId}`,{});
  }

  deleteOrders(orderId){
     return this.http.delete(`${environment.apiBaseUrl}/admin/orderadmins/${orderId}`);
  }

  deleteOrdersByUser(orderId){
     return this.http.delete(`${environment.apiBaseUrl}/orders/${orderId}`);
  }

  getOrdersDetail(orderId) {
  	return this.http.get(`${environment.apiBaseUrl}/admin/orderadmins/${orderId}`);
  }

  getOrdersDetailByUser(orderId) {
    return this.http.get(`${environment.apiBaseUrl}/orders/${orderId}`);
  }

  getOrdersByUser(){
  	return this.http.get(`${environment.apiBaseUrl}/orders`);
  }
}
