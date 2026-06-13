import { createAction, props } from '@ngrx/store';
import { LeaveRequest } from '../../../core/models/leave.model';

export const loadLeaves = createAction('[Leave] Load Leaves');
export const loadLeavesSuccess = createAction('[Leave] Load Leaves Success', props<{ leaves: LeaveRequest[] }>());
export const applyLeave = createAction('[Leave] Apply Leave', props<{ leave: LeaveRequest }>());
export const applyLeaveSuccess = createAction('[Leave] Apply Leave Success', props<{ leave: LeaveRequest }>());
export const changeLeaveStatus = createAction('[Leave] Change Status', props<{ id: number; status: LeaveRequest['status']; remark?: string }>());
export const changeLeaveStatusSuccess = createAction('[Leave] Change Status Success', props<{ leave: LeaveRequest }>());
export const updateLeave = createAction('[Leave] Update Leave', props<{ leave: LeaveRequest }>());
export const updateLeaveSuccess = createAction('[Leave] Update Leave Success', props<{ leave: LeaveRequest }>());
