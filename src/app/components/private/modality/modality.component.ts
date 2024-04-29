import { Component, OnInit } from '@angular/core';
import { IRequestManager } from '../../../models/request-manager/request-manager.interface';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import { ModalityList, Pagination } from '../../../models/users.interface';
import { MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-modality',
  templateUrl: './modality.component.html',
  styleUrl: './modality.component.scss',
})
export class ModalityComponent implements OnInit {
  data!: IRequestManager[];
  modalityList!: ModalityList[];
  ingredient!: string;
  visibleDialog = false;
  visibleDialogModality = false;
  visibleDialogAlert = false;
  message = '';
  parameter = [''];
  buttonmsg = '';
  modality_details!: ModalityList;
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
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getModalityTablePagination();
  }
  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first || 0;
    this.rows = event.rows || 0;
    this.page = Number(event.page) + 1 || 0;
    this.getModalityTablePagination();
  }
  cleanForm() {
    this.first = 0;
    this.page = 1;
    this.rows = 10;
    this.getModalityTablePagination();
  }

  initPaginador() {
    this.first = 0;
    this.page = 1;
    this.rows = 10;
    this.getModalityTablePagination();
  }

  getModalityTablePagination() {
    const payload: Pagination = {
      page: this.page,
      page_size: this.rows,
    };
    this.userService.getModalityListPagination(payload).subscribe({
      next: (response: BodyResponse<ModalityList[]>) => {
        if (response.code === 200) {
          this.modalityList = response.data;
          this.totalRows = Number(response.message);
          this.modalityList.forEach(item => {
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
  inActiveModality(modality_details: ModalityList) {
    if (!modality_details.is_active) {
      this.message = '¿Seguro que desea Inactivar modalidad?';
      this.visibleDialog = true;
      modality_details.is_active = 0;
    } else {
      this.message = '¿Seguro que desea Activar modalidad?';
      this.visibleDialog = true;
      modality_details.is_active = 1;
    }
    this.modality_details = modality_details;
  }
  displayModality(modality_details: ModalityList) {
    this.visibleDialogModality = true;
    this.buttonmsg = '';
    this.message = 'Detalles de modalidad';
    this.read_only = true;
    this.enableCreate = false;
    this.modality_details = modality_details;
  }
  editModality(modality_details: ModalityList) {
    this.visibleDialogModality = true;
    this.buttonmsg = 'Modificar';
    this.message = 'Modificar modalidad';
    this.read_only = false;
    this.enableCreate = false;
    this.modality_details = modality_details;
  }
  createModality() {
    this.visibleDialogModality = true;
    this.buttonmsg = 'Crear';
    this.message = 'Crear modalidad';
    this.read_only = false;
    this.enableCreate = true;
  }

  closeDialogModality(value: boolean) {
    this.visibleDialogModality = false;
    this.enableAction = value;
    if (value) {
      //
    }
  }
  closeDialogAlert(value: boolean) {
    this.visibleDialogAlert = false;
    this.enableAction = value;
  }

  setParameter(modality_details: ModalityList) {
    if (!this.enableAction || this.read_only) {
      return;
    } else if (this.enableCreate) {
      if (this.modalityList.some(obj => obj.modality_id === +modality_details.modality_id)) {
        this.visibleDialogAlert = true;
        this.informative = true;
        this.message = 'Ya existe una modalidad con código ' + modality_details.modality_id;
        this.severity = 'danger';
      } else {
        this.userService.createModality(modality_details).subscribe({
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
    } else {
      this.userService.modifyModality(modality_details).subscribe({
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
    this.ngOnInit();
  }

  closeDialog(value: boolean) {
    this.visibleDialog = false;
    if (value) {
      this.userService.inactivateModality(this.modality_details).subscribe({
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
    this.ngOnInit();
  }
}
