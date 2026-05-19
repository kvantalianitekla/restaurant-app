import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://restaurant.stepprojects.ge/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/Products/GetAll`);
  }

  getFilteredProducts(filters: {
    vegeterian?: boolean;
    nuts?: boolean;
    spiciness?: number;
    categoryId?: number;
  }): Observable<Product[]> {
    let params = new HttpParams();
    if (filters.vegeterian !== undefined) params = params.set('vegeterian', filters.vegeterian);
    if (filters.nuts !== undefined) params = params.set('nuts', filters.nuts);
    if (filters.spiciness !== undefined) params = params.set('spiciness', filters.spiciness);
    if (filters.categoryId !== undefined) params = params.set('categoryId', filters.categoryId);
    return this.http.get<Product[]>(`${this.baseUrl}/Products/GetFiltered`, { params });
  }
}
