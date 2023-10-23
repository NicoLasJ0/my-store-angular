import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl= 'https://damp-spire-59848.herokuapp.com/api/categories';
  constructor(private http: HttpClient) { }
  getAll(limit: string, offset: string) {
    let params = new HttpParams();
    if (limit && offset !== null) { 
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Category[]>(`${this.apiUrl}`, { params });
    }
}
