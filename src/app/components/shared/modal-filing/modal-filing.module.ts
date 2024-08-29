import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFilingComponent } from './modal-filing.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [ModalFilingComponent],
  imports: [CommonModule, DialogModule, ButtonModule, ProgressSpinnerModule],
  exports: [ModalFilingComponent],
})
export class ModalFilingModule {}
