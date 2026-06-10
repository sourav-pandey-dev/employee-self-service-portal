import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'daysRemaining', standalone: true })
export class DaysRemainingPipe implements PipeTransform {
  transform(total: number, used: number): number {
    return total - used;
  }
}
