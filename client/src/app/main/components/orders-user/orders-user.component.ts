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
  order = [];
  listOrderDetail = [];
  public vieworder: boolean = false;
  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
  	this.loadOrders();
   /* this.loadDetailOrders();*/
  }
loadOrders() {
    this.orderService.getOrdersByUser().subscribe((orders: any) => {
      this.ordersList = orders.data;

      /*console.log(orders);*/
    }, (err) => {
      console.log(err)
    })
  }

  loadDetailOrders(orderId){
    this.vieworder = !this.vieworder;
    this.orderService.getOrdersDetailByUser(orderId).subscribe((details: any ) => {
      // this.orderDetail = details.data;
      this.listOrderDetail = details.data[0].products;
      console.log(details.data[0].products);
    }, (err) => {
      console.log(err)
    })
  }

  remove(orderId){
    console.log(orderId)
    var r = confirm("Bạn chắc chắn xóa hóa đơn này?")
    if(r == true){
      this.orderService.deleteOrdersByUser(orderId).subscribe(rs => {
        /*console.log(this.productItems)*/
        location.reload();
        this.order = this.order.filter(e => e._id != orderId)
      }, (err) => {
        console.log(err)
      });
    }
  }
}
