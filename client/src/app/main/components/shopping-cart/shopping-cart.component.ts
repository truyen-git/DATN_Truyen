import { Component, OnInit, Input} from '@angular/core';
import { MessengerService } from '../../../shared/messenger.service';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../../shared/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  public display: boolean;
  cartItems=[];

	cartTotal = 0

  constructor(private msg: MessengerService,private cartService: CartService) { }

  ngOnInit() {
    this.handleSubscription();
    this.loadCartItems();
  }

  payChange(){
    this.display = true;
  }

  handleSubscription() {
    this.msg.getMsg().subscribe((product: Product) => {
      this.loadCartItems();
    })
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe((items: any) => {
      this.cartItems = items.data;
      this.calcCartTotal();
    })
  }



  calcCartTotal() {
    this.cartTotal = 0
    this.cartItems.forEach(item => {
      this.cartTotal += (item.product.price)
    })
  }

  remove(productId){
    console.log(productId)
    this.cartService.RemoveProductFromCart(productId).subscribe(rs => {
      console.log(this.cartItems)
      this.cartItems = this.cartItems.filter(e => e.product._id != productId);
    }, (err) => {
      console.log(err)
    });
  }

  

}
