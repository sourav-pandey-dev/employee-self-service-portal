import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('http://127.0.0.1:3001/')) {
    return next(req);
  }

  const token = localStorage.getItem('portal_current_user') ? 'demo-token' : '';
  const request = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
  return next(request);
};
