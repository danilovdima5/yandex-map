import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[onHover]',
})
export class OnHoverDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.enlarge(1.2);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.enlarge(1);
  }

  enlarge(coef: number): void {
    this.el.nativeElement.style.transform = `scale(${coef})`;
  }
}
