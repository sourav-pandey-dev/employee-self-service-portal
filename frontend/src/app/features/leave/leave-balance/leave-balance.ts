import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DaysRemainingPipe } from '../../../shared/pipes/days-remaining.pipe';
import { LeaveService } from '../leave.service';

@Component({ selector: 'app-leave-balance', standalone: true, imports: [CommonModule, DaysRemainingPipe], templateUrl: './leave-balance.html', styleUrl: './leave-balance.css' })
export class LeaveBalance { constructor(public leaveService: LeaveService) {} }
