import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantRequestRoutingModule } from './applicant-request-routing.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from '../../shared/shared.module';
import { ApplicantRequestComponent } from './applicant-request.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ApplicantRequestComponent],
  imports: [
    CommonModule,
    ApplicantRequestRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    InputSwitchModule,
    SharedModule,
    ToastModule,
  ],
  exports: [ApplicantRequestComponent],
})
export class ApplicantRequestModule {}
