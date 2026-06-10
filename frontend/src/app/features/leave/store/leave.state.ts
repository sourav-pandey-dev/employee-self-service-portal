import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { LeaveRequest } from '../../../core/models/leave.model';

export const leaveFeatureKey = 'leaves';
export const leaveAdapter = createEntityAdapter<LeaveRequest>();
export interface LeaveState extends EntityState<LeaveRequest> {
  loading: boolean;
}
export const initialLeaveState: LeaveState = leaveAdapter.getInitialState({ loading: false });
