import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({ selector: 'app-calendar-view', standalone: true, imports: [CommonModule], templateUrl: './calendar-view.html', styleUrl: './calendar-view.css' })
export class CalendarView {
  @Input() dates: string[] = [];
}
