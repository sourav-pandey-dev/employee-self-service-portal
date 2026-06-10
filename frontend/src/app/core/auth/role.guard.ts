import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserRole } from '../models/user.model';

export const roleGuard: CanActivateFn = route => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const roles = route.data['roles'] as UserRole[] | undefined;
  const user = auth.currentUser();
  if (user && (!roles || roles.includes(user.role))) {
    return true;
  }
  router.navigate(['/dashboard']);
  return false;
};
