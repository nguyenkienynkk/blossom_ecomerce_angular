import { Injectable } from '@angular/core';
import { enviroment } from '../enviroments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiGetProducts = `${enviroment.apiBaseUrl}/products`;
  constructor(private http: HttpClient) {}
  getProducts(
    keyword: string,
    categoryId: number,
    page: number,
    limit: number
  ): Observable<Product[]> {
    const params = new HttpParams()
      .set('keyword', keyword.toString())
      .set('category_id', categoryId.toString())
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<Product[]>(this.apiGetProducts, { params });
  }
  getDetailProduct(prodcutId: number) {
    return this.http.get(`${enviroment.apiBaseUrl}/products/${prodcutId}`)
  }
}
