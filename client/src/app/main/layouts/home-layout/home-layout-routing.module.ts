import { SignUpComponent } from '../../user/signup/signup.component';
import { LogInComponent } from '../../user/login/login.component';
import { UserComponent } from '../../user/user.component';
import { HeaderComponent } from '../../components/header/header.component';
import { UserprofileComponent } from '../../components/userprofile/userprofile.component';
import { BodyComponent } from '../../components/body/body.component';
import { HomeComponent } from '../../components/home/home.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductComponent } from '../../components/product/product.component';
import { ProductListComponent } from '../../components/product/product-list/product-list.component';
import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component';
import { OrdersUserComponent } from '../../components/orders-user/orders-user.component';
import { ProductFilterComponent } from '../../components/product/product-filter/product-filter.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuard } from '../../../auth/auth.guard';


const routes: Routes = [
    {
        path: 'header', component: HeaderComponent
    },
    {
        path: 'body', component: BodyComponent
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'productList', component: ProductComponent,
        children: [{ path: '', component: ProductListComponent }]
    },
    {
        path: 'shoppingCart', component: ShoppingCartComponent
    },
    {
        path: 'ordersUser', component: OrdersUserComponent
    },
    {
        path: 'userprofile', component: UserprofileComponent,canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: LogInComponent }]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeLayoutRoutingModule { }
