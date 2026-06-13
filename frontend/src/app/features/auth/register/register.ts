import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/auth/auth.service';
import { InputMaskDirective } from '../../../shared/directives/input-mask.directive';

@Component({ selector: 'app-register', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink, InputMaskDirective], templateUrl: './register.html', styleUrl: './register.css' })
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  message = '';
  loading = false;
  form = this.fb.group({ name: ['', Validators.required], email: ['', [Validators.required, Validators.email]], password: ['', Validators.required], department: ['', Validators.required], designation: ['', Validators.required], phone: ['', [Validators.required, Validators.minLength(10)]], joinDate: ['', Validators.required] });

  register(): void {
    if (this.form.invalid || this.loading) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.message = '';

    this.auth.register(this.form.getRawValue() as any).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: ok => {
        if (!ok) {
          this.message = 'Email already exists.';
          window.alert(this.message);
          return;
        }

        window.alert('Account created successfully. Please login.');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.message = 'Start json-server with db.json, then try again.';
        window.alert(this.message);
      }
    });
  }
}
