import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private productsService: ProductsService, private router: ActivatedRoute) { }
  products: Product[] = [];
  limit = 10;
  offset = 0;
  id: string | null= null;
  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(data => {
      this.products = data;
    });
    this.router.queryParamMap.subscribe(
      params=> {
        this.id= params.get('product');
        if(this.id){
          console.log(this.id);
        }
      }
    )
  }
  loadMore() {
    this.productsService.getProductByPage(this.limit, this.offset).subscribe(data => {
      this.products.push(...data);
      this.offset += this.limit;
    });
  }
}
