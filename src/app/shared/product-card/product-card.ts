import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, UpperCasePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<{ id: number; price: number }>();

  onAddToCart() {
    this.addToCart.emit({ id: this.product.id, price: this.product.price });
  }
}
