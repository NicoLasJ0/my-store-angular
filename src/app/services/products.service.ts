import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Product, UpdateProductDto } from '../models/product.model';
import { CreateProductDto } from '../models/product.model';
import { catchError, retry, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) { }
  private apiUrl = 'https://damp-spire-59848.herokuapp.com/api/products/';
  getAllProducts() {
    return this.httpClient.get<Product[]>(this.apiUrl)
      .pipe(
        retry(3)
      );
  }
  getProduct(id: string | null) {
    return this.httpClient.get<Product>(`${this.apiUrl}${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 500) {
            return throwError("Un error ha ocurrido dentro del servidor");
          }
          if (error.status === 404) {
            return throwError("El producto no ha sido encontrado");
          }
          if (error.status === 401) {
            return throwError("No tienes autorizacion para acceder a estos recursos");
          }
          return throwError("Un error inesperado ha ocurrido");
        })
      );

  }
  getProductByPage(limit: number, offset: number) {
    return this.httpClient.get<Product[]>(this.apiUrl, {
      params: { limit, offset }
    });
  }
  getProductsByCategory(id: string, limit: string, offset: string) {
    let params = new HttpParams();
    if (limit && offset !== null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.httpClient.get<Product[]>(`https://damp-spire-59848.herokuapp.com/api/categories/${id}/products`, { params });
  }
  create(dto: CreateProductDto) {
    return this.httpClient.post(this.apiUrl, dto);
  }
  update(dto: UpdateProductDto, id: string) {
    return this.httpClient.put(this.apiUrl + id, dto);
  }
  delete(id: string) {
    return this.httpClient.delete(this.apiUrl + id);
  }
}
