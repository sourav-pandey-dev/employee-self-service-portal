import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { LeaveService } from '../leave.service';
import { applyLeave, applyLeaveSuccess, changeLeaveStatus, changeLeaveStatusSuccess, loadLeaves, loadLeavesSuccess, updateLeave, updateLeaveSuccess } from './leave.action';

@Injectable()
export class LeaveEffects {
  private actions$ = inject(Actions);
  private leaveService = inject(LeaveService);

  loadLeaves$ = createEffect(() => this.actions$.pipe(
    ofType(loadLeaves),
    switchMap(() => this.leaveService.getRequests().pipe(map(leaves => loadLeavesSuccess({ leaves }))))
  ));

  applyLeave$ = createEffect(() => this.actions$.pipe(
    ofType(applyLeave),
    switchMap(({ leave }) => this.leaveService.addRequest(leave).pipe(map(saved => applyLeaveSuccess({ leave: saved }))))
  ));

  changeStatus$ = createEffect(() => this.actions$.pipe(
    ofType(changeLeaveStatus),
    switchMap(({ id, status, remark }) => this.leaveService.updateStatus(id, status, remark).pipe(map(leave => changeLeaveStatusSuccess({ leave }))))
  ));

  updateLeave$ = createEffect(() => this.actions$.pipe(
    ofType(updateLeave),
    switchMap(({ leave }) => this.leaveService.updateRequest(leave).pipe(map(saved => updateLeaveSuccess({ leave: saved }))))
  ));
}
