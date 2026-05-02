import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product';
import { ProductCard } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-menu',
  imports: [ProductCard],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {
  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        console.log('products:', response);
        this.products.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load products');
        this.loading.set(false);
      },
    });
  }
}
