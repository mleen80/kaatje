import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Output() outsideClick = new EventEmitter();

  outsideClicked() {
    this.outsideClick.emit();
  }

  insideClicked(event: Event) {
    event.stopPropagation();
  }
}
