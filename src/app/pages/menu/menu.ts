import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product';
import { ProductCard } from '../../shared/product-card/product-card';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [ProductCard],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  private productService = inject(ProductService);
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
}
