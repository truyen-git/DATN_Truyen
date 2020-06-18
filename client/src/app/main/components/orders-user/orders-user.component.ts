import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/order.service';
import { Order } from '../../models/order.model';
@Component({
  selector: 'app-orders-user',
  templateUrl: './orders-user.component.html',
  styleUrls: ['./orders-user.component.css']
})
export class OrdersUserComponent implements OnInit {
	ordersList = [];
  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
  	this.loadOrders();
  }

loadOrders() {
    this.orderService.getOrdersByUser().subscribe((orders: any) => {
      this.ordersList = orders.data;
      console.log(orders);
    }, (err) => {
      console.log(err)
    })
  }
}
