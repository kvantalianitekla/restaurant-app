import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasketItem } from '../models/basket.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private baseUrl = 'https://restaurant.stepprojects.ge/api';

  constructor(private http: HttpClient) {}

  getBasket(): Observable<BasketItem[]> {
    return this.http.get<BasketItem[]>(`${this.baseUrl}/Baskets/GetAll`);
  }

  addToBasket(productId: number, price: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/Baskets/AddToBasket`, { productId, price, quantity: 1 });
  }

  updateBasket(productId: number, price: number, quantity: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/Baskets/UpdateBasket`, { productId, price, quantity });
  }

  deleteFromBasket(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Baskets/DeleteProduct/${id}`);
  }
}
