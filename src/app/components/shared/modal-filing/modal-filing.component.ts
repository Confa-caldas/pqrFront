import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-filing',
  templateUrl: './modal-filing.component.html',
  styleUrl: './modal-filing.component.scss',
})
export class ModalFilingComponent {
  @Input() requestCreation = false;
  @Input() select = false;
  @Input() tittle_message = '';
  @Input() message = '';
  @Input() message2 = '';
  @Input() visible: boolean = false;
  @Input() informative: boolean = false;
  @Input() severity = '';
  @Output() setRta = new EventEmitter<boolean>();

  showDialog() {
    this.visible = true;
  }

  closeDialog(value: boolean) {
    this.setRta.emit(value);
    this.visible = false;
  }
}
