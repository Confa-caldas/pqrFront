import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ModalAlertComponent } from './modal-alert.component';

@NgModule({
  declarations: [ModalAlertComponent],
  imports: [CommonModule, DialogModule, ButtonModule],
  exports: [ModalAlertComponent],
})
export class ModalAlertModule {}
