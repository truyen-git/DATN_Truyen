import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/order.service';
import { Order } from '../../main/models/order.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
	orderList : Order[] = [];
  order = [];
  listOrderDetail;
  
  public vieworder: boolean = false;
  

  constructor(private orderService : OrderService, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.loadOrders();
    // this.loadDetailOrders();
    
  }

 /* viewOrder(){
    this.vieworder = !this.vieworder;
  }*/

  loadOrders() {
    this.orderService.getOrders().subscribe((orders: any) => {
      this.orderList = orders.data;
      this.order = orders.data;

      /*console.log(orders);*/
    }, (err) => {
      console.log(err)
    })
  }

  loadDetailOrders(orderId){
    // this.orderService.getOrdersDetail(orderId).subscribe((details: any ) => {
    //   // this.orderDetail = details.data;
    //   this.listOrderDetail = details.data.products;
    //   console.log(details.data);
    // }, (err) => {
    //   console.log(err)
    // })

    this.vieworder = !this.vieworder;
    if(this.vieworder == false){
      this.listOrderDetail = [];
    } else this.listOrderDetail = orderId;
  }

  confirmOrder(orderId){
    console.log(orderId)
    var r = confirm("Bạn chắc chắn muốn chấp nhận hóa đơn này?")
    if(r == true){
      this.orderService.confirmOrder(orderId).subscribe(rs => {
        /*console.log(this.productItems)*/
        location.reload();
      }, (err) => {
        console.log(err)
      });
    }
  }

  remove(orderId){
    console.log(orderId)
    var r = confirm("Bạn chắc chắn xóa hóa đơn này?")
    if(r == true){
      this.orderService.deleteOrders(orderId).subscribe(rs => {
        /*console.log(this.productItems)*/
        location.reload();
        this.order = this.order.filter(e => e._id != orderId)
      }, (err) => {
        console.log(err)
      });
    }
  }
}
