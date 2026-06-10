import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usersKey = 'portal_users';
  private sessionKey = 'portal_current_user';
  currentUser = signal<User | null>(this.loadCurrentUser());

  constructor(private router: Router) {
    this.seedUsers();
  }

  register(user: Omit<User, 'id'>): boolean {
    const users = this.getUsers();
    if (users.some(item => item.email === user.email)) {
      return false;
    }
    users.push({ ...user, id: Date.now() });
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.getUsers().find(item => item.email === email && item.password === password);
    if (!user) {
      return false;
    }
    localStorage.setItem(this.sessionKey, JSON.stringify(user));
    this.currentUser.set(user);
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  getUsers(): User[] {
    const value = localStorage.getItem(this.usersKey);
    return value ? JSON.parse(value) as User[] : [];
  }

  updateProfile(updated: User): void {
    const users = this.getUsers().map(user => user.id === updated.id ? updated : user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    localStorage.setItem(this.sessionKey, JSON.stringify(updated));
    this.currentUser.set(updated);
  }

  private loadCurrentUser(): User | null {
    const value = localStorage.getItem(this.sessionKey);
    return value ? JSON.parse(value) as User : null;
  }

  private seedUsers(): void {
    if (localStorage.getItem(this.usersKey)) {
      return;
    }
    const users: User[] = [
      { id: 1, name: 'Asha Employee', email: 'employee@test.com', password: '123456', role: 'Customer', department: 'IT', designation: 'Developer', phone: '9876543210', joinDate: '2024-04-01' },
      { id: 2, name: 'Ravi Admin', email: 'admin@test.com', password: '123456', role: 'Admin', department: 'HR', designation: 'HR Manager', phone: '9876500000', joinDate: '2023-01-10' }
    ];
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }
}
