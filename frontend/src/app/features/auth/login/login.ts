import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({ selector: 'app-login', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink], templateUrl: './login.html', styleUrl: './login.css' })
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  error = '';
  form = this.fb.group({ email: ['employee@test.com', [Validators.required, Validators.email]], password: ['123456', Validators.required] });
  login(): void { const email = this.form.value.email || ''; const password = this.form.value.password || ''; if (this.auth.login(email, password)) { const user = this.auth.currentUser(); this.router.navigate([user?.role === 'Admin' ? '/admin/dashboard' : '/dashboard']); return; } this.error = 'Invalid email or password.'; }
}
