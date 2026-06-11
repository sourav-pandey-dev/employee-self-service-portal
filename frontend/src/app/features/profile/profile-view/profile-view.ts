import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({ selector: 'app-profile-view', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './profile-view.html', styleUrl: './profile-view.css' })
export class ProfileView { constructor(public auth: AuthService) {} }
