import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { ProfileService } from '../profile.service';
import { User } from '../../../core/models/user.model';

@Component({ selector: 'app-profile-edit', standalone: true, imports: [CommonModule, ReactiveFormsModule], templateUrl: './profile-edit.html', styleUrl: './profile-edit.css' })
export class ProfileEdit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private profileService = inject(ProfileService);
  private router = inject(Router);
  previewImage = '';
  imageMessage = '';

  form = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    department: ['', Validators.required],
    designation: ['', Validators.required]
  });

  constructor() {
    const user = this.auth.currentUser();
    if (user) {
      this.form.patchValue(user);
      this.previewImage = user.profileImage || '';
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      if (!result) return;
      this.resizeImage(result, resizedImage => {
        this.previewImage = resizedImage;
        this.saveProfileImage(resizedImage);
        this.imageMessage = 'Profile image saved.';
      });
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.previewImage = '';
    this.saveProfileImage(undefined);
    this.imageMessage = 'Profile image removed.';
  }

  save(): void {
    const user = this.auth.currentUser();
    if (!user || this.form.invalid) return;

    const value = this.form.getRawValue();
    const name = value.name || '';
    const phone = value.phone || '';
    const department = value.department || '';
    const designation = value.designation || '';

    if (user.role === 'Admin') {
      const updated: User = {
        ...user,
        name,
        phone,
        department,
        designation,
        profileImage: this.previewImage || undefined
      };
      this.auth.updateProfile(updated);
    } else {
      const hasChanges =
        name !== user.name ||
        phone !== user.phone ||
        department !== user.department ||
        designation !== user.designation;

      if (hasChanges) {
        this.profileService.createRequest(
          user.id,
          user.name,
          user.email,
          { name: user.name, phone: user.phone, department: user.department, designation: user.designation },
          { name, phone, department, designation }
        );
      }
    }
    this.router.navigate(['/profile']);
  }

  private saveProfileImage(profileImage: string | undefined): void {
    const user = this.auth.currentUser();
    if (!user) return;
    this.auth.updateProfile({ ...user, profileImage });
  }

  private resizeImage(source: string, done: (value: string) => void): void {
    const image = new Image();
    image.onload = () => {
      const size = 320;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) {
        done(source);
        return;
      }

      canvas.width = size;
      canvas.height = size;
      const scale = Math.max(size / image.width, size / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      const x = (size - width) / 2;
      const y = (size - height) / 2;

      context.drawImage(image, x, y, width, height);
      done(canvas.toDataURL('image/jpeg', 0.86));
    };
    image.src = source;
  }
}
