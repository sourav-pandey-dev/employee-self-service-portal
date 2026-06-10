import { Component } from '@angular/core';
import { CalendarView } from '../../../shared/components/calendar-view/calendar-view';

@Component({ selector: 'app-leave-calendar', standalone: true, imports: [CalendarView], templateUrl: './leave-calendar.html', styleUrl: './leave-calendar.css' })
export class LeaveCalendar { dates = ['2026-06-12', '2026-06-18', '2026-06-24']; }
