import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  product: Product= {
    id: '',
    title: '',
    price: 0,
    description: '',
    category: {
      id: 0,
      name: '',
      typeImg: ''
    },
    images: [
      
    ]
  }
  @Input('myProduct') 
  set addProduct(product: Product){
    this.product= product;
  }
  @Output() addedCart = new EventEmitter<Product>();
  onAddToCart(){
    this.addedCart.emit(this.product);
  }
  @Output() showDetail= new EventEmitter<string>();
  onShowDetail(){
    this.showDetail.emit(this.product.id);
  }
}
