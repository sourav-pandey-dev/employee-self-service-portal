import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private sessionKey = 'portal_current_user';
  currentUser = signal<User | null>(this.loadCurrentUser());
  usersSignal = signal<User[]>([]);

  constructor(private router: Router, private http: HttpClient) {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.http.get<User[]>('http://localhost:3000/users').subscribe({
      next: (data) => this.usersSignal.set(data),
      error: (err) => console.error('Failed to load users from mock server', err)
    });
  }

  private getItem(key: string): string | null {
    try {
      if (typeof localStorage !== 'undefined' && typeof localStorage.getItem === 'function') {
        return localStorage.getItem(key);
      }
    } catch {
      // Ignore
    }
    return null;
  }

  private setItem(key: string, value: string): void {
    try {
      if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
        localStorage.setItem(key, value);
      }
    } catch {
      // Ignore
    }
  }

  private removeItem(key: string): void {
    try {
      if (typeof localStorage !== 'undefined' && typeof localStorage.removeItem === 'function') {
        localStorage.removeItem(key);
      }
    } catch {
      // Ignore
    }
  }

  register(user: Omit<User, 'id'>): Observable<boolean> {
    if (this.usersSignal().some(item => item.email === user.email)) {
      return of(false);
    }
    const newUser: User = { ...user, id: Date.now() };
    return this.http.post<User>('http://localhost:3000/users', newUser).pipe(
      map(saved => {
        this.usersSignal.update(users => [...users, saved]);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  login(email: string, password: string): boolean {
    const user = this.usersSignal().find(item => item.email === email && item.password === password);
    if (!user) {
      return false;
    }
    this.setItem(this.sessionKey, JSON.stringify(user));
    this.currentUser.set(user);
    return true;
  }

  logout(): void {
    this.removeItem(this.sessionKey);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  getUsers(): User[] {
    return this.usersSignal();
  }

  updateProfile(updated: User): void {
    this.http.put<User>(`http://localhost:3000/users/${updated.id}`, updated).subscribe({
      next: (savedUser) => {
        this.usersSignal.update(users => users.map(user => user.id === savedUser.id ? savedUser : user));
        const current = this.currentUser();
        if (current && current.id === savedUser.id) {
          this.setItem(this.sessionKey, JSON.stringify(savedUser));
          this.currentUser.set(savedUser);
        }
      },
      error: (err) => console.error('Failed to update user profile', err)
    });
  }

  private loadCurrentUser(): User | null {
    const value = this.getItem(this.sessionKey);
    return value ? JSON.parse(value) as User : null;
  }
}
