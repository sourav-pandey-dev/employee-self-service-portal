import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { RoleBasedAccessDirective } from '../../directives/role-based-access-directive';

@Component({ selector: 'app-navbar', standalone: true, imports: [CommonModule, RouterLink, RouterLinkActive, RoleBasedAccessDirective], templateUrl: './navbar.html', styleUrl: './navbar.css' })
export class Navbar { constructor(public auth: AuthService) {} }
