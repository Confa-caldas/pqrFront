import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalityRoutingModule } from './modality-routing.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from '../../shared/shared.module';
import { ModalityComponent } from './modality.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ModalityComponent],
  imports: [
    CommonModule,
    ModalityRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    InputSwitchModule,
    SharedModule,
    ToastModule,
  ],
  exports: [ModalityComponent],
})
export class ModalityModule {}
