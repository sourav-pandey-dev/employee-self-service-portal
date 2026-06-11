import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, of, switchMap, timeout } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://127.0.0.1:3001/users';
  private sessionKey = 'portal_current_user';
  currentUser = signal<User | null>(this.loadCurrentUser());

  constructor(private router: Router, private http: HttpClient) {}

  register(user: Omit<User, 'id' | 'role'>): Observable<boolean> {
    const email = user.email.trim().toLowerCase();

    return this.findUserByEmail(email).pipe(
      switchMap(existing => {
        if (existing) {
          return of(false);
        }

        const newUser: Omit<User, 'id'> = {
          ...user,
          email,
          role: 'Customer'
        };

        return this.http.post<User>(this.apiUrl, newUser).pipe(
          timeout(5000),
          map(() => true)
        );
      })
    );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.findUserByEmail(email.trim().toLowerCase()).pipe(
      map(user => {
        if (!user || user.password !== password) {
          return false;
        }

        localStorage.setItem(this.sessionKey, JSON.stringify(user));
        this.currentUser.set(user);
        return true;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(timeout(5000));
  }

  updateProfile(updated: User): void {
    localStorage.setItem(this.sessionKey, JSON.stringify(updated));
    this.currentUser.set(updated);
    this.http.put<User>(`${this.apiUrl}/${updated.id}`, updated).pipe(timeout(5000)).subscribe();
  }

  private loadCurrentUser(): User | null {
    const value = localStorage.getItem(this.sessionKey);
    return value ? JSON.parse(value) as User : null;
  }

  private findUserByEmail(email: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${encodeURIComponent(email)}`).pipe(
      timeout(5000),
      map(users => users[0])
    );
  }
}
