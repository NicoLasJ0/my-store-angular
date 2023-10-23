import { Component, EventEmitter, Input,  Output } from '@angular/core';
import { CreateProductDto, Product, UpdateProductDto } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  constructor(private storesService: StoreService, private productsService: ProductsService) {
    this.myShoppingCart = this.storesService.getShoppingCart();

  }
  today = new Date();
  onShoppingCart: boolean = false;
  otherDay = new Date('2021-01-6');
  total: number = 0;
  myShoppingCart: Product[] = [];
  @Input() products: Product[] = [

  ];
  @Input() 
  set productId(id: string | null){
    if(id){
      this.showDetail(id);
    }
  }
  @Output() onLoadMore= new EventEmitter<string>();

productChosen: Product = {
  id:'',
  title: '',
  price: 0,
  description: '',
  category: {
    id: 0,
    name: '',
    typeImg: ''
  },
  images: [

  ],
  
};
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  showProductDetail: boolean = false;
  
  
  
  onAddedToCart(product: Product) {
    this.storesService.onAddedToCart(product);
    this.total = this.storesService.getTotal();
  }

  showShoppingCart() {
    this.onShoppingCart = true;
  }
  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  loadMore(){
    this.onLoadMore.emit();
  }

  showDetail(id: string ) {
    if(!this.showProductDetail){
      this.showProductDetail= true;
    }
    this.productsService.getProduct(id).subscribe(data => {
      this.productChosen = data;
      console.log(data);
    }, errorMsg=> {
      console.log(errorMsg);
      this.statusDetail= 'error';
    });
    
  }
  createProduct() {
    let newProduct: CreateProductDto = {
      title: 'A product',
      price: 5000,
      description: 'do u mind?',
      images: ['as'],
      categoryId: 1
    }
    this.productsService.create(newProduct).subscribe(data => console.log(data));
  }
  updateProduct() {
    let product: UpdateProductDto = {
      title: 'Hola'
    }
    this.productsService.update(product, this.productChosen.id).subscribe(data => {
      console.log('updated', data)

    }
    );
  }
  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(data => console.log('deleted', data));
  }
}
