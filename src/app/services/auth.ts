import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SignUpDto, SignInDto, AuthResponse } from '../models/auth.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly BASE_URL = 'https://api.everrest.educata.dev';
  private readonly TOKEN_KEY = 'access_token';

  isLoggedIn = signal(false);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.isLoggedIn.set(true);
    }
  }

  signUp(data: SignUpDto): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/sign_up`, data);
  }

  signIn(data: SignInDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/auth/sign_in`, data).pipe(
      tap((response) => {
        localStorage.setItem(this.TOKEN_KEY, response.access_token);
        this.isLoggedIn.set(true);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedIn.set(false);
    this.router.navigate(['/sign-in']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
