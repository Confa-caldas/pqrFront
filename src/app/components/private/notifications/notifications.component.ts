import { Component, OnInit } from '@angular/core';
import { IRequestManager } from '../../../models/request-manager/request-manager.interface';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import { NotificationList, Pagination } from '../../../models/users.interface';
import { MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  data!: IRequestManager[];
  notificationList!: NotificationList[];
  ingredient!: string;
  visibleDialog = false;
  visibleDialogNotification = false;
  visibleDialogAlert = false;
  message = '';
  parameter = [''];
  buttonmsg = '';
  notification_details!: NotificationList;
  enableAction: boolean = false;
  read_only: boolean = false;
  enableCreate: boolean = false;
  informative: boolean = false;
  severity = '';

  //paginador
  first: number = 0;
  page: number = 1;
  rows: number = 10;
  totalRows: number = 0;

  constructor(
    private userService: Users,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getNotificationTable();
  }
  onPageChange(event: PaginatorState) {
    this.first = event.first || 0;
    this.rows = event.rows || 0;
    this.page = Number(event.page) + 1 || 0;
    this.getNotificationTable();
  }
  cleanForm() {
    this.first = 0;
    this.page = 1;
    this.rows = 10;
    this.getNotificationTable();
  }

  initPaginador() {
    this.first = 0;
    this.page = 1;
    this.rows = 10;
    this.getNotificationTable();
  }
  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
  }
  getNotificationTable() {
    const payload: Pagination = {
      page: this.page,
      page_size: this.rows,
    };
    this.userService.getNotificationList(payload).subscribe({
      next: (response: BodyResponse<NotificationList[]>) => {
        if (response.code === 200) {
          this.notificationList = response.data;
          this.totalRows = Number(response.message);
          this.notificationList.forEach(item => {
            item.is_active = item.is_active === 1 ? true : false;
          });
        } else {
          this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
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

  inActiveNotification(notification_details: NotificationList) {
    if (!notification_details.is_active) {
      this.message = '¿Seguro que desea Inactivar notificación?';
      this.visibleDialog = true;
      notification_details.is_active = 0;
    } else {
      this.message = '¿Seguro que desea Activar notificación?';
      this.visibleDialog = true;
      notification_details.is_active = 1;
    }
    this.notification_details = notification_details;
  }
  displayNotification(notification_details: NotificationList) {
    this.visibleDialogNotification = true;
    this.buttonmsg = '';
    this.message = 'Detalles de notificación';
    this.read_only = true;
    this.enableCreate = false;
    this.notification_details = notification_details;
  }
  editNotification(notification_details: NotificationList) {
    this.visibleDialogNotification = true;
    this.buttonmsg = 'Modificar';
    this.message = 'Modificar notificación';
    this.read_only = false;
    this.enableCreate = false;
    this.notification_details = notification_details;
  }
  createNotification() {
    this.visibleDialogNotification = true;
    this.buttonmsg = 'Crear';
    this.message = 'Crear notificación';
    this.read_only = false;
    this.enableCreate = true;
  }

  closeDialogModality(value: boolean) {
    this.visibleDialogNotification = false;
    this.enableAction = value;
    if (value) {
      //
    }
  }
  closeDialogAlert(value: boolean) {
    this.visibleDialogAlert = false;
    this.enableAction = value;
  }
  setParameter(notification_details: NotificationList) {
    if (!this.enableAction || this.read_only) {
      return;
    } else if (this.enableCreate) {
      this.userService.createNotification(notification_details).subscribe({
        next: (response: BodyResponse<string>) => {
          if (response.code === 200) {
            this.showSuccessMessage('success', 'Exitoso', 'Operación exitosa!');
          } else {
            this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.ngOnInit();
          console.log('La suscripción ha sido completada.');
        },
      });
    } else {
      this.userService.modifyNotification(notification_details).subscribe({
        next: (response: BodyResponse<string>) => {
          if (response.code === 200) {
            this.showSuccessMessage('success', 'Exitoso', 'Operación exitosa!');
          } else {
            this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.ngOnInit();
          console.log('La suscripción ha sido completada.');
        },
      });
    }
  }

  closeDialog(value: boolean) {
    this.visibleDialog = false;
    if (value) {
      this.userService.inactivateNotification(this.notification_details).subscribe({
        next: (response: BodyResponse<string>) => {
          if (response.code === 200) {
            this.showSuccessMessage('success', 'Exitoso', 'Operación exitosa!');
          } else {
            this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
            if ((this.notification_details.is_active = 1)) {
              this.notification_details.is_active = 0;
            } else {
              this.notification_details.is_active = 1;
            }
          }
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.ngOnInit();
          console.log('La suscripción ha sido completada.');
        },
      });
    } else {
      this.ngOnInit();
    }
  }
}
