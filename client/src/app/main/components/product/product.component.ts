import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
	isDisplayDetail = true;
	productDetail: any;
  
  constructor() { }

  ngOnInit(): void {


  }

  productDetailEmit(value) {
  	console.log(value);
  	this.productDetail = value;
  	this.isDisplayDetail = false;
  }

  comeBack(){
  	this.isDisplayDetail = true;
  }

}
