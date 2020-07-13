import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { MessengerService } from '../../../../../shared/messenger.service';
import { CartService } from '../../../../../shared/cart.service';
import { UserService } from '../../../../../shared/user.service';
import { ProductService } from '../../../../../shared/product.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
      @Input() productCard: Product;
      @Input() addedToCard: boolean;

      @Output() productDetail = new EventEmitter();

  constructor(private msg : MessengerService,private cartService: CartService, private productService: ProductService, private userService: UserService,private router : Router) { }

  ngOnInit(): void {
  }

  handleAddToCart() {
    if(!this.userService.isLoggedIn() ){
      this.router.navigateByUrl('/login');
    }else{
      this.cartService.addProductToCart(this.productCard).subscribe(() => {
       this.msg.sendMsg(this.productCard)
       this.addedToCard = true;
       location.reload();
     }, (err) => {
       console.log(err.error.error)
       alert('Khóa học đã tồn tại trong hóa đơn. Vui lòng thanh toán khóa học.');
     })
    }

  }

 viewProduct(productId){
    this.productService.getProductDetail(productId).subscribe((details: any ) => {
      // this.orderDetail = details.data;
      this.productDetail.emit(details.data);
      console.log(details);
    }, (err) => {
      console.log(err)
    })
  }


}
