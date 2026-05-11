import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  submitted = signal(false);
  successMessage = signal('');

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  onSubmit() {
    this.submitted.set(true);
    if (this.contactForm.valid) {
      this.successMessage.set('Your message has been sent successfully!');
      this.contactForm.reset();
      this.submitted.set(false);
    }
  }
}
