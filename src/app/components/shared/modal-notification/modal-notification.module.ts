import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalNotificationComponent } from './modal-notification.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';

@NgModule({
  declarations: [ModalNotificationComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    ToggleButtonModule,
  ],
  exports: [ModalNotificationComponent],
})
export class ModalNotificationModule {}
