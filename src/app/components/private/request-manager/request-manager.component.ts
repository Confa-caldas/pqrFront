import { Component, OnInit } from '@angular/core';
import { IRequestManager } from '../../../models/request-manager/request-manager.interface';
import { Router } from '@angular/router';
import { BodyResponse, ZionResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import { Pagination, UserList } from '../../../models/users.interface';
import { MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-request-manager',
  templateUrl: './request-manager.component.html',
  styleUrl: './request-manager.component.scss',
})
export class RequestManagerComponent implements OnInit {
  data!: IRequestManager[];
  userList!: UserList[];
  ingredient!: string;
  visibleDialog = false;
  visibleDialogInput = false;
  message = '';
  parameter = [''];
  buttonmsg = '';
  oneField = false;
  user_details!: UserList;
  enableAction: boolean = false;
  enableDelete: boolean = false;
  informative: boolean = false;

  //paginador
  first: number = 0;
  page: number = 1;
  rows: number = 10;
  totalRows: number = 0;
  constructor(
    private userService: Users,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getUsersTablePagination();
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first || 0;
    this.rows = event.rows || 0;
    this.page = Number(event.page) + 1 || 0;
    this.getUsersTablePagination();
  }
  cleanForm() {
    this.first = 0;
    this.page = 1;
    this.rows = 10;
    this.getUsersTablePagination();
  }

  initPaginador() {
    this.first = 0;
    this.page = 1;
    this.rows = 10;
    this.getUsersTablePagination();
  }
  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
  }

  getUsersTablePagination() {
    const payload: Pagination = {
      page: this.page,
      page_size: this.rows,
    };
    this.userService.getUsersListPagination(payload).subscribe({
      next: (response: BodyResponse<UserList[]>) => {
        if (response.code === 200) {
          this.userList = response.data;
          this.totalRows = Number(response.message);
          this.userList.forEach(item => {
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
  inactive(user_details: UserList) {
    if (!user_details.is_active) {
      user_details.is_active = 0;
    } else {
      user_details.is_active = 1;
    }
    this.userService.inactivateUser(user_details).subscribe({
      next: (response: BodyResponse<UserList[]>) => {
        if (response.code === 200) {
          this.showSuccessMessage('success', 'Exitoso', 'Operación exitosa!');
        } else {
          this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
          if ((this.user_details.is_active = 1)) {
            this.user_details.is_active = 0;
          } else {
            this.user_details.is_active = 1;
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
  }
  delete(user_details: UserList) {
    this.message = '¿Seguro que desea Eliminar responsable?';
    this.visibleDialog = true;
    user_details.is_visible = 0;
    this.user_details = user_details;
    this.enableDelete = true;
    this.informative = false;
  }
  generateTestData = (count: number): IRequestManager[] => {
    const testData: IRequestManager[] = [];
    for (let i = 0; i < count; i++) {
      const requestManager: IRequestManager = {
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        status: i % 2 === 0, // Alternar entre true y false
      };
      testData.push(requestManager);
    }
    return testData;
  };
  closeDialog(value: boolean) {
    this.visibleDialog = false;
    if (this.informative || !value) {
      return;
    } else if (this.enableDelete) {
      this.userService.invisibleUser(this.user_details).subscribe({
        next: (response: BodyResponse<UserList[]>) => {
          if (response.code === 200) {
            this.showSuccessMessage('success', 'Exitoso', 'Operación exitosa!');
            this.userList = response.data;
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
  createUser() {
    this.visibleDialogInput = true;
    this.buttonmsg = 'Crear';
    this.oneField = true;
    this.parameter = ['Crear Responsable', 'Escriba usuario de red'];
    this.message = 'Crear Responsable';
    this.informative = true;
  }
  closeDialogInput(value: boolean) {
    this.visibleDialogInput = false;
    this.enableAction = value;
  }
  setParameter(inputValue: string[]) {
    if (!this.enableAction) {
      return;
    } else {
      const payload = {
        user_name: inputValue[0],
      };
      this.userService.createUser(payload).subscribe({
        next: (response: BodyResponse<ZionResponse>) => {
          if (response.code === 200) {
            this.showSuccessMessage('success', 'Exitoso', 'Operación exitosa!');
          } else {
            this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
            this.message = response.data.estado;
            this.visibleDialog = true;
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
}
