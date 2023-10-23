import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgComponent } from '../shared/components/img/img.component';
import { ProductComponent } from '../shared/components/product/product.component';
import { ProductsListComponent } from '../shared/components/products-list/products-list.component';
import { ReversePipe } from '../shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '../shared/pipes/time-ago.pipe'
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsListComponent,
    ReversePipe,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    ImgComponent,
    ProductComponent,
    ProductsListComponent,
    ReversePipe,
    TimeAgoPipe
  ]
})
export class SharedModule { }
