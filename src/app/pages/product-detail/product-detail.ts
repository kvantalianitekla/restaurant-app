import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { BasketService } from '../../services/basket';
import { Product } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private basketService = inject(BasketService);
  private router = inject(Router);

  product = signal<Product | null>(null);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProducts().subscribe((products) => {
      const found = products.find((p) => p.id === id);
      if (found) {
        this.product.set(found);
      } else {
        this.router.navigate(['/menu']);
      }
    });
  }

  addToCart() {
    const p = this.product();
    if (!p) return;
    this.basketService.addToBasket(p.id, p.price).subscribe({
      next: () => this.router.navigate(['/cart']),
      error: () => alert('Failed to add to cart'),
    });
  }
}
