import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pipe, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(private productsService: ProductsService, private categoryService: CategoryService, private router: ActivatedRoute) { }
  categories: Product[] = [];
  @Input() id: string | null = '';
  limit: string = '10';
  offset: string = '0';
  productId: string | null = '';
  ngOnInit(): void {

    this.router.paramMap.
      pipe(
        switchMap((params) => {
          this.id = params.get('id');
          if (this.id) {
            return this.productsService.getProductsByCategory(this.id, this.limit, this.offset);
          }
          return []
        })
      ).subscribe(data => {
        this.categories = data;
        console.log(data);
      });
    this.router.queryParamMap.
      pipe(
        switchMap((params) => {
          this.productId = params.get("product");
          if (this.id) {
            console.log(this.productId);
          }
          return [null]
        })
      ).subscribe();

  }
}
