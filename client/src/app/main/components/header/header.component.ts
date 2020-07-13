import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../../shared/cart.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
public userDetails;
public currentUser : any = {};
cartItems=[];
cartQuantity = 0;
  
constructor(private userService: UserService,private cartService: CartService, private router: Router) { }

ngOnInit() {
  if(this.userService.getToken() !== '') {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => { 
        console.log(err);
        
      }
      );


  }
  
  this.loadCartItems();
  
}
onLogout(){
  this.userService.deleteToken();
  this.router.navigate(['/body']);
}

loadCartItems() {
  this.cartService.getCartItems().subscribe((items: any) => {
    this.cartItems = items.data;
    this.calcCartTotal();
  })
}

calcCartTotal() {
  this.cartQuantity = 0
  this.cartItems.forEach(item => {
    this.cartQuantity += (item.quantity)
  })
}
}

