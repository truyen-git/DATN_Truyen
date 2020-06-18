import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/order.service';
import { Order } from '../../main/models/order.model';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
	orderList : Order[] = [];

  constructor(private orderService : OrderService) { }

  ngOnInit() {
  	this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe((orders: any) => {
      this.orderList = orders.data;
      console.log(orders);
    }, (err) => {
      console.log(err)
    })
  }
}
