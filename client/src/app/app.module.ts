import { BrowserModule } from '@angular/platform-browser';
import { HomeLayoutComponent } from './main/layouts/home-layout/home-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';
import {NgxPaginationModule} from 'ngx-pagination';
import {Ng2SearchPipeModule} from 'ng2-search-filter';

import { UserService } from './shared/user.service';
import { ProductService } from './shared/product.service';
import { MessengerService } from './shared/messenger.service';
import { CartService } from './shared/cart.service';
import { OrderService } from './shared/order.service';
import { AdminService } from './shared/admin.service';


import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './admin/components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LogInComponent } from './main/user/login/login.component';
import { SignUpComponent } from './main/user/signup/signup.component';
import { UserComponent } from './main/user/user.component';
import { ProductComponent } from './main/components/product/product.component';
import { HomeComponent } from './main/components/home/home.component';
import { AboutComponent } from './main/components/about/about.component';
import { WhyComponent } from './main/components/why/why.component';
import { TogetherComponent } from './main/components/together/together.component';
import { MomComponent } from './main/components/mom/mom.component';
import { ProductListComponent } from './main/components/product/product-list/product-list.component';
import { ProductFilterComponent } from './main/components/product/product-filter/product-filter.component';
import { ProductCardComponent } from './main/components/product/product-list/product-card/product-card.component';
import { ShoppingCartComponent } from './main/components/shopping-cart/shopping-cart.component';
import { ShoppingItemComponent } from './main/components/shopping-cart/shopping-item/shopping-item.component';
import { UserProfileComponent } from './admin/user-profile/user-profile.component';
import { UserprofileComponent } from './main/components/userprofile/userprofile.component';
import { OrdersUserComponent } from './main/components/orders-user/orders-user.component';
import { TableListComponent } from './admin/table-list/table-list.component';
import { TypographyComponent } from './admin/typography/typography.component';
import { IconsComponent } from './admin/icons/icons.component';
import { MapsComponent } from './admin/maps/maps.component';
import { NotificationsComponent } from './admin/notifications/notifications.component';
import { UpgradeComponent } from './admin/upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './admin/layouts/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';

 


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    SocialLoginModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HomeLayoutComponent
  ],
  providers: [{
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '921406465241-7h2kisp6v9dv804the6i2h2f67kfm2l5.apps.googleusercontent.com'
            ),
          }
        ],
      } as SocialAuthServiceConfig,
    },{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AdminGuard,AuthGuard,UserService,CartService,OrderService,ProductService,MessengerService,AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
