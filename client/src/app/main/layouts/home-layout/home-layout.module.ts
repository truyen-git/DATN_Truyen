import { SignUpComponent } from '../../user/signup/signup.component';
import { LogInComponent } from '../../user/login/login.component';
import { UserComponent } from '../../user/user.component';
import { ProductComponent } from '../../components/product/product.component';
import { ProductListComponent } from '../../components/product/product-list/product-list.component';
import { ProductFilterComponent } from '../../components/product/product-filter/product-filter.component';
import { ProductCardComponent } from '../../components/product/product-list/product-card/product-card.component';

import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component';
import { ShoppingItemComponent } from '../../components/shopping-cart/shopping-item/shopping-item.component';

import { HeaderComponent } from '../../components/header/header.component';
import { BodyComponent } from '../../components/body/body.component';
import { HomeComponent } from '../../components/home/home.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserprofileComponent } from '../../components/userprofile/userprofile.component';
import { OrdersUserComponent } from '../../components/orders-user/orders-user.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeLayoutRoutingModule } from './home-layout-routing.module';


@NgModule({
  declarations: [LogInComponent,UserComponent, SignUpComponent,HeaderComponent,BodyComponent,HomeComponent,FooterComponent,UserprofileComponent,
  ProductComponent,ProductListComponent,ProductCardComponent,ProductFilterComponent,ShoppingCartComponent,ShoppingItemComponent,OrdersUserComponent],
  imports: [
    CommonModule,
    HomeLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeLayoutModule { }
