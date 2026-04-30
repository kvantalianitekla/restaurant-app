import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly USER_KEY = 'registered_user';
  private readonly SESSION_KEY = 'logged_in_user';
  isLoggedIn = signal(false);

  constructor(private router: Router) {
    const session = localStorage.getItem(this.SESSION_KEY);
    if (session) {
      this.isLoggedIn.set(true);
    }
  }

  register(email: string, password: string): boolean {
    const user: User = { email, password };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    this.isLoggedIn.set(true);
    return true;
  }

  login(email: string, password: string): boolean {
    const stored = localStorage.getItem(this.USER_KEY);
    if (!stored) return false;
    const user: User = JSON.parse(stored);
    if (user.email === email && user.password === password) {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
      this.isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
    this.isLoggedIn.set(false);
    this.router.navigate(['/']);
  }
}
