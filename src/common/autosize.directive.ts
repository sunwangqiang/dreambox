import { ElementRef, HostListener, Directive, OnInit, AfterViewChecked } from '@angular/core';

@Directive({
  selector: 'ion-textarea[autosize]'
})

export class Autosize implements AfterViewChecked {
  textArea: any;
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  constructor(public element: ElementRef) {
  }
  ngAfterViewInit():void{
    this.textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
  }
  ngAfterViewChecked(): void {
    this.adjust();
  }
  adjust(): void {
      this.textArea.style.overflow = 'hidden';
      this.textArea.style.height = 'auto';
      this.textArea.style.height = this.textArea.scrollHeight + "px";
  }
}
