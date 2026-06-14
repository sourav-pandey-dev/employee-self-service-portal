import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(public auth: AuthService, private router: Router) {}

  shouldShow(): boolean {
    const url = this.router.url;
    return this.auth.isLoggedIn() && url !== '/login' && url !== '/register';
  }
}
