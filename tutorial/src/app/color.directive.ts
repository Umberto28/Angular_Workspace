import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[colorDirective]'
})

export class ColorDirective {

  @Input() color!: string;

  constructor(private el: ElementRef) { }

  private colorize(color: string){
    this.el.nativeElement.style.backgroundColor = color;
  }

  @HostListener('click') onClick() {
    alert('Il colore è ' + this.color);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.colorize(this.color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.colorize('');
  }

}
