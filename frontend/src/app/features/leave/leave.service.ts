import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LeaveBalance, LeaveRequest } from '../../core/models/leave.model';
import { AuthService } from '../../core/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class LeaveService {
  private auth = inject(AuthService);
  leaveRequests = signal<LeaveRequest[]>([]);

  constructor(private http: HttpClient) {
    this.loadRequests();
  }

  private loadRequests(): void {
    const user = this.auth.currentUser();
    let url = 'http://localhost:3000/leaveRequests';
    if (user && user.role !== 'Admin') {
      url += `?employeeId=${user.id}`;
    }
    this.http.get<LeaveRequest[]>(url).subscribe({
      next: (data) => {
        const filtered = user && user.role !== 'Admin' ? data.filter(r => r.employeeId === user.id) : data;
        this.leaveRequests.set(filtered);
      },
      error: (err) => console.error('Failed to load leave requests', err)
    });
  }

  getRequests(): Observable<LeaveRequest[]> {
    const user = this.auth.currentUser();
    let url = 'http://localhost:3000/leaveRequests';
    if (user && user.role !== 'Admin') {
      url += `?employeeId=${user.id}`;
    }
    return this.http.get<LeaveRequest[]>(url).pipe(
      tap(data => {
        const filtered = user && user.role !== 'Admin' ? data.filter(r => r.employeeId === user.id) : data;
        this.leaveRequests.set(filtered);
      })
    );
  }

  addRequest(request: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>('http://localhost:3000/leaveRequests', request).pipe(
      tap(saved => this.leaveRequests.update(items => [saved, ...items]))
    );
  }

  updateStatus(id: number, status: LeaveRequest['status'], adminRemark = ''): Observable<LeaveRequest> {
    const existing = this.leaveRequests().find(r => r.id === id);
    if (!existing) {
      return of({} as LeaveRequest);
    }
    const updated = { ...existing, status, adminRemark };
    return this.http.put<LeaveRequest>(`http://localhost:3000/leaveRequests/${id}`, updated).pipe(
      tap(res => this.leaveRequests.update(items => items.map(item => item.id === id ? res : item)))
    );
  }

  updateRequest(updated: LeaveRequest): Observable<LeaveRequest> {
    const requests = this.read().map(request => request.id === updated.id ? updated : request);
    localStorage.setItem(this.key, JSON.stringify(requests));
    return of(updated).pipe(delay(150));
  }

  balances(): LeaveBalance[] {
    const approved = this.leaveRequests().filter(item => item.status === 'Approved');
    const total = { Casual: 12, Sick: 10, Earned: 15 };
    return (Object.keys(total) as LeaveBalance['type'][]).map(type => ({
      type,
      total: total[type],
      used: approved.filter(item => item.type === type).reduce((sum, item) => sum + item.days, 0)
    }));
  }
}
