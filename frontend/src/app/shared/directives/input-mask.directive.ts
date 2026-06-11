import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[appInputMask]', standalone: true })
export class InputMaskDirective {
  @HostListener('input', ['$event']) onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
  }
}
