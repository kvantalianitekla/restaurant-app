import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product';
import { BasketService } from '../../services/basket';
import { ProductCard } from '../../shared/product-card/product-card';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  imports: [ProductCard, FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  private productService = inject(ProductService);
  private basketService = inject(BasketService);
  private router = inject(Router);

  products = signal<Product[]>([]);
  error = signal(false);
  loading = signal(true);

  filters = {
    vegeterian: false,
    nuts: false,
    spiciness: undefined as number | undefined,
  };

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    this.productService
      .getProducts()
      .pipe(
        catchError(() => {
          this.error.set(true);
          return of([]);
        }),
      )
      .subscribe((data) => {
        this.products.set(data);
        this.loading.set(false);
      });
  }

  applyFilters() {
    this.loading.set(true);
    const activeFilters: any = {};
    if (this.filters.vegeterian) activeFilters.vegeterian = true;
    if (this.filters.nuts) activeFilters.nuts = true;
    if (this.filters.spiciness !== undefined) activeFilters.spiciness = this.filters.spiciness;

    if (Object.keys(activeFilters).length === 0) {
      this.loadProducts();
      return;
    }

    this.productService
      .getFilteredProducts(activeFilters)
      .pipe(
        catchError(() => {
          this.error.set(true);
          return of([]);
        }),
      )
      .subscribe((data) => {
        this.products.set(data);
        this.loading.set(false);
      });
  }

  resetFilters() {
    this.filters = { vegeterian: false, nuts: false, spiciness: undefined };
    this.loadProducts();
  }

  addToCart(data: { id: number; price: number }) {
    this.basketService.addToBasket(data.id, data.price).subscribe({
      next: () => this.router.navigate(['/cart']),
      error: () => alert('Failed to add to cart'),
    });
  }
}
