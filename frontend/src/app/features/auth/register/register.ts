import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { InputMaskDirective } from '../../../shared/directives/input-mask.directive';

@Component({ selector: 'app-register', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink, InputMaskDirective], templateUrl: './register.html', styleUrl: './register.css' })
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  message = '';
  form = this.fb.group({ name: ['', Validators.required], email: ['', [Validators.required, Validators.email]], password: ['', Validators.required], role: ['Employee', Validators.required], department: ['', Validators.required], designation: ['', Validators.required], phone: ['', [Validators.required, Validators.minLength(10)]], joinDate: ['', Validators.required] });
  register(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.auth.register(this.form.getRawValue() as any).subscribe(ok => {
      if (!ok) {
        this.message = 'Email already exists.';
        return;
      }
      this.router.navigate(['/login']);
    });
  }
}
