import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private categoryService: CategoryService, private authSerice: AuthService, private router: Router) { }
  limit: string= '10';
  offset: string= '0';
  id= '1';
  categories: Category[]= [];
  ngOnInit(): void {
    this.categoryService.getAll(this.limit, this.offset).subscribe(data=> {
      this.categories= data;
    });
  }
  logout(){
    this.authSerice.logout();
    this.router.navigate(['/home']);  
  }

}
