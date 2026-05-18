import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BasketService } from '../../services/basket';
import { CurrencyPipe } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CurrencyPipe, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  private basketService = inject(BasketService);
  private router = inject(Router);

  items = signal<any[]>([]);
  submitted = signal(false);
  success = signal(false);

  constructor() {
    this.basketService
      .getBasket()
      .pipe(catchError(() => of([])))
      .subscribe((data) => this.items.set(data));
  }

  checkoutForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });

  get total() {
    return this.items().reduce((sum, item) => sum + item.product.price * (item.quantity || 1), 0);
  }

  onSubmit() {
    this.submitted.set(true);
    if (this.checkoutForm.valid) {
      this.success.set(true);
    }
  }
}
