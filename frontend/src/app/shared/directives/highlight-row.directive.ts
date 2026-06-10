import { Directive, HostBinding, Input } from '@angular/core';

@Directive({ selector: '[appHighlightRow]', standalone: true })
export class HighlightRowDirective {
  @Input() appHighlightRow = false;
  @HostBinding('class.highlight-row') get isHighlighted(): boolean {
    return this.appHighlightRow;
  }
}
