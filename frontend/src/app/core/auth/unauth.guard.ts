import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const unauthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    const user = auth.currentUser();
    router.navigate([user?.role === 'Admin' ? '/admin/dashboard' : '/dashboard']);
    return false;
  }
  return true;
};
