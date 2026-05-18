import { Component, signal } from '@angular/core';
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
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: 0,
    gender: 'MALE',
  };
  errorMessage = '';
  passwordMismatch = false;
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  constructor(
    private auth: Auth,
    private router: Router,
  ) {}

  onSubmit(form: any) {
    this.passwordMismatch = this.formData.password !== this.formData.confirmPassword;
    if (this.passwordMismatch) return;

    this.auth
      .signUp({
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        email: this.formData.email,
        password: this.formData.password,
        age: this.formData.age,
        gender: this.formData.gender as 'MALE' | 'FEMALE',
        address: '',
        phone: '+995599123456',
        zipcode: '12345',
        avatar: 'https://i.pravatar.cc/150',
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/sign-in']);
        },
        error: (err) => {
          console.log('error:', err.error);
          this.errorMessage = 'Registration failed. Please try again.';
        },
      });
  }
}
