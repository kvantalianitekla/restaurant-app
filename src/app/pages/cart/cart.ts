import { Component, inject, signal } from '@angular/core';
import { BasketService } from '../../services/basket';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private basketService = inject(BasketService);
  error = signal(false);
  items = signal<any[]>([]);

  constructor() {
    this.loadCart();
  }

  loadCart() {
    this.basketService
      .getBasket()
      .pipe(
        catchError(() => {
          this.error.set(true);
          return of([]);
        }),
      )
      .subscribe((data) => this.items.set(data));
  }

  get total() {
    return this.items().reduce((sum, item) => sum + item.product.price * (item.quantity || 1), 0);
  }

  updateQuantity(productId: number, price: number, quantity: number) {
    if (quantity < 1) return;
    this.basketService.updateBasket(productId, price, quantity).subscribe({
      next: () => this.loadCart(),
    });
  }

  delete(id: number) {
    this.basketService.deleteFromBasket(id).subscribe({
      next: () => this.loadCart(),
    });
  }
}
