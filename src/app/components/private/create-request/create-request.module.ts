import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRequestRoutingModule } from './create-request-routing.module';
import { CreateRequestComponent } from './create-request.component';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CreateRequestComponent],
  exports: [CreateRequestComponent],
  imports: [
    CommonModule,
    CreateRequestRoutingModule,
    CardModule,
    CheckboxModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    ToastModule,
    SharedModule,
  ],
})
export class CreateRequestModule {}
