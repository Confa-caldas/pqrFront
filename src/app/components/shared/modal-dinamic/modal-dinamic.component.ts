import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-dinamic',
  templateUrl: './modal-dinamic.component.html',
  styleUrl: './modal-dinamic.component.scss',
})
export class ModalDinamicComponent {
  @Input() login = false;
  @Input() select = false;
  @Input() message = '';
  @Input() visible: boolean = false;
  @Input() informative: boolean = false;
  @Output() setRta = new EventEmitter<boolean>();

  showDialog() {
    this.visible = true;
  }

  closeDialog(value: boolean) {
    this.setRta.emit(value);
    this.visible = false;
  }
}
