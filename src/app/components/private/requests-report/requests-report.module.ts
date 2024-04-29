import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsReportRoutingModule } from './requests-report-routing.module';
import { RequestsReportComponent } from './requests-report.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from '../../shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [RequestsReportComponent],
  imports: [
    CommonModule,
    RequestsReportRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    ReactiveFormsModule,
    InputSwitchModule,
    SharedModule,
    CalendarModule,
    ToastModule,
    MultiSelectModule,
  ],
  exports: [RequestsReportComponent],
})
export class RequestsReportModule {}
