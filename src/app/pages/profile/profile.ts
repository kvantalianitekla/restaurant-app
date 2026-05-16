import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { UserProfile } from '../../models/auth.model';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private auth = inject(Auth);
  user = signal<UserProfile | null>(null);
  error = signal('');

  constructor() {
    this.auth.getProfile().subscribe({
      next: (data) => this.user.set(data),
      error: (err) => {
        console.log('error:', err);
        this.error.set('Failed to load profile');
      },
    });
  }
}
