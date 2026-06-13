import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getEmployees(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users').pipe(
      map(users => users.filter(u => u.role !== 'Admin')),
      catchError(() => of([]))
    );
  }
}
