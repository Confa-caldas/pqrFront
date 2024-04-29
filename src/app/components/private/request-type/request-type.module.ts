import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from '../../shared/shared.module';
import { RequestTypeRoutingModule } from './request-type-routing.module';
import { RequestTypeComponent } from './request-type.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [RequestTypeComponent],
  imports: [
    CommonModule,
    RequestTypeRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    InputSwitchModule,
    SharedModule,
    ToastModule,
  ],
  exports: [RequestTypeComponent],
})
export class RequestTypeModule {}
