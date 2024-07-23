import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantTypeRoutingModule } from './applicant-type-routing.module';
import { ApplicantTypeComponent } from './applicant-type.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from '../../shared/shared.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ApplicantTypeComponent],
  imports: [
    CommonModule,
    ApplicantTypeRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    InputSwitchModule,
    SharedModule,
    ToastModule,
  ],
  exports: [ApplicantTypeComponent],
})
export class ApplicantTypeModule {}
