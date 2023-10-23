import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  constructor(private productsService: ProductsService, private router: ActivatedRoute, private location: Location) {}
  @Input() id: string | null= '';
  product: Product | null= null;
  ngOnInit(): void {
    this.router.paramMap.pipe(
      switchMap((params=> {
        this.id= params.get('id');
        if(this.id){ 
          return this.productsService.getProduct(this.id);
        }
        return [];
      }))
    ).subscribe(
      data=> {
        this.product= data;
      }
    )
  }
  goToBack(){
    this.location.back();    
  }

}
