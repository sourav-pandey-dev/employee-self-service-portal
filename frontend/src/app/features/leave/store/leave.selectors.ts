import { createFeatureSelector, createSelector } from '@ngrx/store';
import { leaveAdapter, leaveFeatureKey, LeaveState } from './leave.state';

export const selectLeaveState = createFeatureSelector<LeaveState>(leaveFeatureKey);
const selectors = leaveAdapter.getSelectors(selectLeaveState);
export const selectAllLeaves = selectors.selectAll;
export const selectLeaveLoading = createSelector(selectLeaveState, state => state.loading);
export const selectPendingLeaves = createSelector(selectAllLeaves, leaves => leaves.filter(item => item.status === 'Pending' || item.status === 'Correction'));
