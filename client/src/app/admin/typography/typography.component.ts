import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { MessengerService } from '../../shared/messenger.service';
import { Product } from '../../main/models/product.model';


@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
 	public change: boolean = false;
 	public editproduct: boolean = false;
 	productList: Product[] = []
 	product: any;
 	productItems = [];
  constructor(private productService : ProductService, private msg : MessengerService) { }

  ngOnInit() {
  	 this.loadProducts();
  	 this.handleSubscription();
  }

  handleSubscription() {
    this.msg.getMsg().subscribe((product: Product) => {
      this.loadProducts();
    })
  }

  loadProducts() {
    this.productService.getProductByAdmin().subscribe((products: any) => {
      this.productList = products.data;
      this.productItems = products.data;
      /*console.log(products);*/
    }, (err) => {
      console.log(err)
    })
  }

  changeTab(){
  	this.change = !this.change;
  }
  editProduct(product){
  	this.product = product;
  	this.editproduct = !this.editproduct;
  }

  remove(productId){
    console.log(productId)
    this.productService.deleteProductByAdmin(productId).subscribe(rs => {
      /*console.log(this.productList)*/
      this.productItems = this.productItems.filter(e => e.product._id != productId);
    }, (err) => {
      console.log(err)
    });
  }
}
