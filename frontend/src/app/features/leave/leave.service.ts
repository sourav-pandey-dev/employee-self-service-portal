import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { LeaveBalance, LeaveRequest } from '../../core/models/leave.model';

@Injectable({ providedIn: 'root' })
export class LeaveService {
  private key = 'portal_leave_requests';

  getRequests(): Observable<LeaveRequest[]> {
    return of(this.read()).pipe(delay(150));
  }

  addRequest(request: LeaveRequest): Observable<LeaveRequest> {
    const requests = [request, ...this.read()];
    localStorage.setItem(this.key, JSON.stringify(requests));
    return of(request).pipe(delay(150));
  }

  updateStatus(id: number, status: LeaveRequest['status'], adminRemark = ''): Observable<LeaveRequest> {
    let updated = this.read()[0];
    const requests = this.read().map(request => {
      if (request.id === id) {
        updated = { ...request, status, adminRemark };
        return updated;
      }
      return request;
    });
    localStorage.setItem(this.key, JSON.stringify(requests));
    return of(updated).pipe(delay(150));
  }

  updateRequest(updated: LeaveRequest): Observable<LeaveRequest> {
    const requests = this.read().map(request => request.id === updated.id ? updated : request);
    localStorage.setItem(this.key, JSON.stringify(requests));
    return of(updated).pipe(delay(150));
  }

  balances(): LeaveBalance[] {
    const approved = this.read().filter(item => item.status === 'Approved');
    const total = { Casual: 12, Sick: 10, Earned: 15 };
    return (Object.keys(total) as LeaveBalance['type'][]).map(type => ({
      type,
      total: total[type],
      used: approved.filter(item => item.type === type).reduce((sum, item) => sum + item.days, 0)
    }));
  }

  private read(): LeaveRequest[] {
    const value = localStorage.getItem(this.key);
    if (value) {
      return JSON.parse(value) as LeaveRequest[];
    }
    const seed: LeaveRequest[] = [
      { id: 101, employeeId: 1, employeeName: 'Asha Employee', type: 'Sick', fromDate: '2026-06-12', toDate: '2026-06-12', days: 1, reason: 'Doctor appointment', status: 'Pending' }
    ];
    localStorage.setItem(this.key, JSON.stringify(seed));
    return seed;
  }
}
