import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { UserRole } from '../../../core/models/user.model';

@Component({ selector: 'app-login', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink], templateUrl: './login.html', styleUrl: './login.css' })
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  error = '';
  loading = false;
  loginType: UserRole = 'Customer';
  form = this.fb.group({ email: ['', [Validators.required, Validators.email]], password: ['', Validators.required] });

  selectLogin(type: UserRole): void {
    this.loginType = type;
    this.error = '';
    this.form.reset(type === 'Admin'
      ? { email: 'admin@company.com', password: 'admin123' }
      : { email: '', password: '' }
    );
  }

  login(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    const email = this.form.value.email || '';
    const password = this.form.value.password || '';

    this.auth.login(email, password).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: ok => {
        if (!ok) {
          this.error = this.loginType === 'Customer'
            ? 'No employee found with this email or password. Please sign up first.'
            : 'Invalid admin email or password.';
          window.alert(this.error);
          return;
        }

        const user = this.auth.currentUser();
        if (user?.role !== this.loginType) {
          this.auth.logout();
          this.error = this.loginType === 'Admin'
            ? 'This is not an admin account.'
            : 'This is not an employee account. Please use Employee Login or sign up.';
          window.alert(this.error);
          return;
        }

        this.router.navigate([user.role === 'Admin' ? '/admin/dashboard' : '/dashboard']);
      },
      error: () => {
        this.error = 'Start json-server with db.json, then try again.';
        window.alert(this.error);
      }
    });
  }
}
