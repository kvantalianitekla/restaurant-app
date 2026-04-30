import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  formData = { email: '', password: '' };
  errorMessage = '';

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  onSubmit(form: any) {
    const success = this.auth.login(this.formData.email, this.formData.password);
    if (success) {
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}
