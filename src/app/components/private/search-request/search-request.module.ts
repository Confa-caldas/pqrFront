import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRequestRoutingModule } from './search-request-routing.module';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from '../../shared/shared.module';
import { SearchRequestComponent } from './search-request.component';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [SearchRequestComponent],
  imports: [
    CommonModule,
    SearchRequestRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DropdownModule,
    InputSwitchModule,
    SharedModule,
    ToastModule,
    MultiSelectModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
  exports: [SearchRequestComponent],
})
export class SearchRequestModule {}
