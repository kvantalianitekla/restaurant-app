import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { N8nChat } from '../../shared/n8n-chat/n8n-chat';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, N8nChat],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  successMessage = signal('');
  errorMessage = signal('');
  isLoading = signal(false);

  private http = inject(HttpClient);

  contact = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  };

  onSubmit() {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.http
      .post('https://teklakvantaliani.app.n8n.cloud/webhook/contact', this.contact)
      .subscribe({
        next: () => {
          this.successMessage.set('Your message has been sent successfully!');
          this.contact = { firstName: '', lastName: '', email: '', message: '' };
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage.set('Something went wrong. Please try again.');
          this.isLoading.set(false);
        },
      });
  }
}
