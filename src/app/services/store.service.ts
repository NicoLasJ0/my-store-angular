import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  myShoppingCart: Product[]= [];
  
  total: number= 0;
  onAddedToCart(product: Product){
    return this.myShoppingCart.push(product);
  }
  getShoppingCart(): Product[]{
    return this.myShoppingCart;
  }
  getTotal(){
    return this.myShoppingCart.reduce((val, sum) => val + sum.price, 0);
  }
  
  constructor() { }
}
