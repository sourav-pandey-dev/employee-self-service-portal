import { createReducer, on } from '@ngrx/store';
import { applyLeave, applyLeaveSuccess, changeLeaveStatus, changeLeaveStatusSuccess, loadLeaves, loadLeavesSuccess, updateLeave, updateLeaveSuccess } from './leave.action';
import { initialLeaveState, leaveAdapter } from './leave.state';

export const leaveReducer = createReducer(
  initialLeaveState,
  on(loadLeaves, applyLeave, changeLeaveStatus, updateLeave, state => ({ ...state, loading: true })),
  on(loadLeavesSuccess, (state, { leaves }) => leaveAdapter.setAll(leaves, { ...state, loading: false })),
  on(applyLeaveSuccess, (state, { leave }) => leaveAdapter.addOne(leave, { ...state, loading: false })),
  on(changeLeaveStatusSuccess, (state, { leave }) => leaveAdapter.upsertOne(leave, { ...state, loading: false })),
  on(updateLeaveSuccess, (state, { leave }) => leaveAdapter.upsertOne(leave, { ...state, loading: false }))
);
