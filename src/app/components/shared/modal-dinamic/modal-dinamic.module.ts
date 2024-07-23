import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ModalDinamicComponent } from './modal-dinamic.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ModalDinamicComponent],
  imports: [CommonModule, DialogModule, ButtonModule],
  exports: [ModalDinamicComponent],
})
export class ModalDinamicModule {}
