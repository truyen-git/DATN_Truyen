import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../../shared/product.service'; 
import { CartService } from '../../../../shared/cart.service'; 
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit {
	
	@Input() cartItems: any
  constructor(private cartService : CartService) { }

	  ngOnInit(): void {
	  		
	  	}
 	remove(productId){
     console.log(productId)
 		this.cartService.RemoveProductFromCart(productId).subscribe(rs => {
       console.log(rs)
     }, (err) => {
       console.log(err)
     });
 	}
}
