import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalDataTreatmentComponent } from './modal-data-treatment.component';

@NgModule({
  declarations: [ModalDataTreatmentComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ModalDataTreatmentComponent],
})
export class ModalDataTreatmentModule {}
