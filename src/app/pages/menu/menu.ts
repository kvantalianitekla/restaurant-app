import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product';
import { BasketService } from '../../services/basket';
import { ProductCard } from '../../shared/product-card/product-card';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [ProductCard],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  private productService = inject(ProductService);
  private basketService = inject(BasketService);
  private router = inject(Router);
  error = signal(false);

  products = toSignal(
    this.productService.getProducts().pipe(
      catchError(() => {
        this.error.set(true);
        return of([]);
      }),
    ),
    { initialValue: [] },
  );

  addToCart(data: { id: number; price: number }) {
    this.basketService.addToBasket(data.id, data.price).subscribe({
      next: () => {
        this.router.navigate(['/cart']);
      },
      error: () => {
        alert('Failed to add to cart');
      },
    });
  }
}
