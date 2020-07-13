import { Component, OnInit, ChangeDetectorRef, HostListener, ViewChild } from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { MessengerService } from '../../shared/messenger.service';
import { Product } from '../../main/models/product.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  page: Number = 1;
 	public change: boolean = false;
 	public editproduct: boolean = false;
 	productList: Product[] = []
 	product: any;
 	productItems = [];
  addProductFrm: FormGroup;
  editProductFrm: FormGroup;
  imagePath;
  fileToUpload;
  public searchText; 
  constructor(private productService : ProductService, private msg : MessengerService, private fb: FormBuilder) { }

  ngOnInit() {
  	 this.loadProducts();
  	 this.handleSubscription();
     this.buildForm();
  }

  buildForm() {
    this.addProductFrm = this.fb.group({
      name: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      link: ['', [Validators.required]],
      imageProduct: [null],
    })
  }
  productId;
  createEditProductFrm(product) {
    this.productId = product._id;
    this.editProductFrm = this.fb.group({
      name: [product.name, [Validators.required]],
      author: [product.author, [Validators.required]],
      description: [product.description, [Validators.required]],
      price: [product.price, [Validators.required]],
      link: [product.link, [Validators.required]],
      imageProduct: [null],
    })
  }

  fileToUploadEdit;
  onFileChangeEdit(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      
      this.fileToUploadEdit = file;
      reader.onload = (event): any => {
          this.imagePath = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
  }  

  saveProductEdit() {
    let formData: FormData = new FormData();
    // console.log(this.addBlogFrm.get('img').value.name);
    formData.append("name", this.editProductFrm.get('name').value);
    if(this.fileToUploadEdit != null) {
      formData.append("imageProduct", this.fileToUploadEdit, this.fileToUploadEdit.name);
    }
    formData.append("author", this.editProductFrm.get('author').value);
    formData.append("description", this.editProductFrm.get('description').value);
    formData.append("price", this.editProductFrm.get('price').value);
    formData.append("link", this.editProductFrm.get('link').value);

    this.productService.editProduct(formData, this.productId).subscribe(
      (rs) => {
        // debugger
        /*console.log(rs)*/
        alert("Đã sửa sản phẩm!!");
        location.reload();
      },
      (err) => {
        // debugger
        console.log(err)
      }
    )
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      
      this.fileToUpload = file;
      reader.onload = (event): any => {
          this.imagePath = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
  }  

  createProduct() {
    let formData: FormData = new FormData();
    // console.log(this.addBlogFrm.get('img').value.name);
    formData.append("name", this.addProductFrm.get('name').value);
    if(this.fileToUpload != null) {
      formData.append("imageProduct", this.fileToUpload, this.fileToUpload.name);
    }
    formData.append("author", this.addProductFrm.get('author').value);
    formData.append("description", this.addProductFrm.get('description').value);
    formData.append("price", this.addProductFrm.get('price').value);
    formData.append("link", this.addProductFrm.get('link').value);

    this.productService.addProduct(formData).subscribe(
      (rs) => {
        // debugger
        /*console.log(rs)*/
        alert("Đã thêm sản phẩm!!");
        location.reload();
      },
      (err) => {
        // debugger
        console.log(err)
      }
    )
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
  editProductForm(product){
    /*console.log(product)*/
    this.createEditProductFrm(product);
  	// this.product = product;
  	this.editproduct = !this.editproduct;
  }

  closeEdit() {
    this.editproduct = false;
  }

  remove(productId){
    /*console.log(productId)*/
    var r = confirm("Bạn chắc chắn xóa khóa học này?")
    if(r == true){
    this.productService.deleteProduct(productId).subscribe(rs => {
      /*console.log(this.productItems)*/

      this.productItems = this.productItems.filter(e => e._id != productId)
    }, (err) => {
      console.log(err)
    });
  }
  }
}
