import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AttendenceService } from '../attendence.service';

@Component({ selector: 'app-admin-regularization', standalone: true, imports: [CommonModule], templateUrl: './admin-regularization.html', styleUrl: './admin-regularization.css' })
export class AdminRegularization { constructor(public attendance: AttendenceService) {} }
