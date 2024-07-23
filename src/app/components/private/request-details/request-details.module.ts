import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestDetailsRoutingModule } from './request-details-routing.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from '../../shared/shared.module';
import { RequestDetailsComponent } from './request-details.component';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { DatePipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RequestDetailsComponent],
  imports: [
    CommonModule,
    RequestDetailsRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    InputSwitchModule,
    SharedModule,
    CardModule,
    TabViewModule,
    DatePipe,
    ToastModule,
    ReactiveFormsModule,
  ],
  exports: [RequestDetailsComponent],
})
export class RequestDetailsModule {}
