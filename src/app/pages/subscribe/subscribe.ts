import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  imports: [FormsModule],
  templateUrl: './subscribe.html',
  styleUrl: './subscribe.css',
})
export class Subscribe {
  private http = inject(HttpClient);
  email = '';

  subscribeFunction() {
    this.http
      .post('http://localhost:5678/webhook-test/subscribe', {
        email: this.email,
      })
      .subscribe();
  }
}
