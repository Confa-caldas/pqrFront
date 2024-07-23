import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestManagerRoutingModule } from './request-manager-routing.module';
import { RequestManagerComponent } from './request-manager.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from '../../shared/shared.module';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [RequestManagerComponent],
  imports: [
    CommonModule,
    RequestManagerRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    InputSwitchModule,
    SharedModule,
    ToastModule,
  ],
  exports: [RequestManagerComponent],
})
export class RequestManagerModule {}
