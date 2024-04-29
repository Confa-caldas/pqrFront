import { Component, OnInit } from '@angular/core';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import { Pagination, RequestTypeList } from '../../../models/users.interface';
import { MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-request-type',
  templateUrl: './request-type.component.html',
  styleUrl: './request-type.component.scss',
})
export class RequestTypeComponent implements OnInit {
  requestTypeList!: RequestTypeList[];
  ingredient!: string;
  visibleDialog = false;
  visibleDialogInput = false;
  message = '';
  buttonmsg = '';
  parameter = [''];
  request_details!: RequestTypeList;
  inputForm: any[] = [];
  enableCreate: boolean = false;
  enableAction: boolean = false;

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
    this.getRequestTypesListPagination();
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first || 0;
    this.rows = event.rows || 0;
    this.page = Number(event.page) + 1 || 0;
    this.getRequestTypesListPagination();
  }
  cleanForm() {
    this.first = 0;
    this.page = 1;
    this.rows = 10;
    this.getRequestTypesListPagination();
  }

  initPaginador() {
    this.first = 0;
    this.page = 1;
    this.rows = 10;
    this.getRequestTypesListPagination();
  }
  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
  }

  getRequestTypesListPagination() {
    const payload: Pagination = {
      page: this.page,
      page_size: this.rows,
    };
    this.userService.getRequestTypesListPagination(payload).subscribe({
      next: (response: BodyResponse<RequestTypeList[]>) => {
        if (response.code === 200) {
          this.requestTypeList = response.data;

          this.totalRows = Number(response.message);
          this.requestTypeList.forEach(item => {
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
  inActiveRequest(request_details: RequestTypeList) {
    if (!request_details.is_active) {
      this.message = '¿Seguro que desea Inactivar este tipo de solicitud?';
      this.visibleDialog = true;
      request_details.is_active = 0;
    } else {
      this.message = '¿Seguro que desea Activar este tipo de solicitud?';
      this.visibleDialog = true;
      request_details.is_active = 1;
    }
    this.request_details = request_details;
  }
  editRequestType(request_details: RequestTypeList) {
    this.inputForm = [
      request_details['request_type_name'],
      request_details['request_type_description'],
      request_details['request_type_id'],
    ];
    this.visibleDialogInput = true;
    this.buttonmsg = 'Modificar';
    this.message = 'Modificar tipo de solicitud';
    this.enableCreate = false;
    this.parameter = [
      'Tipo de solicitud',
      'Escriba nombre',
      'Descripción de solicitud',
      'Escriba descripción',
    ];
  }

  createRequestType() {
    this.visibleDialogInput = true;
    this.buttonmsg = 'Crear';
    this.parameter = [
      'Tipo de solicitud',
      'Escriba nombre',
      'Descripción de solicitud',
      'Escriba descripción',
    ];
    this.message = 'Crear tipo de solicitud';
    this.enableCreate = true;
  }

  closeDialog(value: boolean) {
    this.visibleDialog = false;
    if (value) {
      this.userService.inactivateRequest(this.request_details).subscribe({
        next: (response: BodyResponse<RequestTypeList[]>) => {
          if (response.code === 200) {
            this.showSuccessMessage('success', 'Exitoso', 'Operación exitosa!');
          } else {
            this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
            if ((this.request_details.is_active = 1)) {
              this.request_details.is_active = 0;
            } else {
              this.request_details.is_active = 1;
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
    this.ngOnInit();
  }
  closeDialogInput(value: boolean) {
    this.visibleDialogInput = false;
    this.enableAction = value;
  }
  setParameter(inputValue: string[]) {
    if (!this.enableAction) {
      return;
    } else if (this.enableCreate) {
      const payload = {
        request_type_name: inputValue[0],
        request_type_description: inputValue[1],
      };
      this.userService.createRequestType(payload).subscribe({
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
      const payload = {
        request_type_name: inputValue[0],
        request_type_description: inputValue[1],
        request_type_id: Number(inputValue[2]),
      };
      this.userService.modifyRequestType(payload).subscribe({
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
}
