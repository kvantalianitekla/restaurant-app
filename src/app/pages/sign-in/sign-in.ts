import { Component, signal } from '@angular/core';
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
  showPassword = signal(false);

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  onSubmit() {
    this.auth.signIn(this.formData).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
      },
    });
  }
}
