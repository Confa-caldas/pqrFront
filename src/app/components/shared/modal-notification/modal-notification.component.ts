import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CategoryList,
  ModalityList,
  NotificationActionList,
  NotificationList,
  NotificationReceiversList,
} from '../../../models/users.interface';
import { Users } from '../../../services/users.service';
import { BodyResponse } from '../../../models/shared/body-response.inteface';

@Component({
  selector: 'app-modal-notification',
  templateUrl: './modal-notification.component.html',
  styleUrl: './modal-notification.component.scss',
})
export class ModalNotificationComponent implements OnInit {
  @Input() login = false;
  @Input() select = false;
  @Input() message = '';
  @Input() buttonmsg = '';
  @Input() visible: boolean = false;
  @Input() read_only: boolean = false;
  @Input() notificationForm?: NotificationList;
  @Output() setRta = new EventEmitter<boolean>();
  @Output() setRtaParameter = new EventEmitter<NotificationList>();

  notificationActionsList: NotificationActionList[] = [];
  inputValue: string[] = [''];
  modalityList!: ModalityList[];
  notificationReceiversList: NotificationReceiversList[] = [];
  recipients: string[] = [];
  regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
  msgError!: string;
  formGroup: FormGroup;

  constructor(
    private userService: Users,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      notification_id: [null],
      notification_name: [
        null,
        [
          Validators.required,
          // eslint-disable-next-line prettier/prettier
      Validators.pattern('^[^0-9@#$%&]*$'),
        ],
      ],
      notification_message: [null, [Validators.required, Validators.pattern('^[^#%&]+$')]],
      action_id: [null, Validators.required],
      notification_receiver_id: [null],
      notification_receiver: [
        null,
        // eslint-disable-next-line prettier/prettier
        [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\.?[a-zA-Z]{2,}$')],
      ],
    });
  }

  ngOnInit(): void {
    this.getNotificationActionsTable();
    this.getNotificationReceiversTable();
    if (this.buttonmsg !== 'Crear' && this.notificationForm) {
      this.formGroup.patchValue(this.notificationForm);
      this.recipients = this.notificationForm.notification_receiver as string[];
      this.formGroup.get('notification_receiver')?.setValue('');
    } else {
      this.formGroup.reset();
    }
  }

  showDialog() {
    this.visible = true;
  }

  addRecipients() {
    if (this.regex.test(this.formGroup.get('notification_receiver')?.value)) {
      this.recipients.push(this.formGroup.get('notification_receiver')?.value);
      this.formGroup.get('notification_receiver')?.setValue('');
    } else {
      this.msgError = 'Ingrese correo valido';
    }
  }

  getNotificationActionsTable() {
    this.userService.getNotificationActionList().subscribe({
      next: (response: BodyResponse<NotificationActionList[]>) => {
        if (response.code === 200) {
          this.notificationActionsList = response.data;
          this.notificationActionsList.forEach(item => {
            item.is_active = item.is_active === 1 ? true : false;
          });
        } else {
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('La suscripción ha sido completada.');
      },
    });
  }

  getNotificationReceiversTable() {
    this.userService.getNotificationReceiversList().subscribe({
      next: (response: BodyResponse<NotificationReceiversList[]>) => {
        if (response.code === 200) {
          this.notificationReceiversList = response.data;
          this.notificationReceiversList.forEach(item => {
            item.is_active = item.is_active === 1 ? true : false;
          });
        } else {
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('La suscripción ha sido completada.');
      },
    });
  }

  closeDialog(value: boolean) {
    this.setRta.emit(value);
    const payload: NotificationList = {
      notification_id: +this.formGroup.controls['notification_id'].value,
      notification_name: this.formGroup.controls['notification_name'].value,
      notification_message: this.formGroup.controls['notification_message'].value,
      action_id: this.formGroup.get('action_id')?.value,
      notification_receiver_id: this.formGroup.get('notification_receiver_id')?.value,
      notification_receiver: this.recipients,
    };
    this.setRtaParameter.emit(payload);
    this.visible = false;
  }
  clearFileInput(index: number) {
    this.recipients.splice(index, 1);
  }
}
