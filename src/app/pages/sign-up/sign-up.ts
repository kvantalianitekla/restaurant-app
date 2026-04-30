import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  formData = { email: '', password: '', confirmPassword: '' };
  errorMessage = '';
  passwordMismatch = false;

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  onSubmit(form: any) {
    this.passwordMismatch = this.formData.password !== this.formData.confirmPassword;
    if (this.passwordMismatch) return;
    this.auth.register(this.formData.email, this.formData.password);
    this.router.navigate(['/']);
  }
}
