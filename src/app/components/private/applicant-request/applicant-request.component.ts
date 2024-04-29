import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import {
  ApplicantTypeList,
  AssociateApplicantRequest,
  AssociationApplicantRequestList,
  Pagination,
  RequestTypeList,
} from '../../../models/users.interface';
import { MessageService } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
@Component({
  selector: 'app-applicant-request',
  templateUrl: './applicant-request.component.html',
  styleUrl: './applicant-request.component.scss',
})
export class ApplicantRequestComponent implements OnInit {
  requestTypeList!: RequestTypeList[];
  applicantTypeList!: ApplicantTypeList[];
  applicantTypeRequestsList!: AssociationApplicantRequestList[];
  applicant_request_association!: AssociationApplicantRequestList;
  ingredient!: string;
  visibleDialog = false;
  visibleDialogSelector = false;
  visibleDialogAlert = false;
  message = '';
  buttonmsg = '';
  parameter = [''];
  enableAction: boolean = false;
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
    this.getApplicantTypeRequestsAssociation();
  }
  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
  }
  onPageChange(event: PaginatorState) {
    this.first = event.first || 0;
    this.rows = event.rows || 0;
    this.page = Number(event.page) + 1 || 0;
    this.getApplicantTypeRequestsAssociation();
  }
  cleanForm() {
    this.first = 0;
    this.page = 1;
    this.rows = 10;
    this.getApplicantTypeRequestsAssociation();
  }

  initPaginador() {
    this.first = 0;
    this.page = 1;
    this.rows = 10;
    this.getApplicantTypeRequestsAssociation();
  }
  getApplicantTypeRequestsAssociation() {
    const payload: Pagination = {
      page: this.page,
      page_size: this.rows,
    };
    this.userService.getApplicantTypeRequestsAssociation(payload).subscribe({
      next: (response: BodyResponse<AssociationApplicantRequestList[]>) => {
        if (response.code === 200) {
          this.applicantTypeRequestsList = response.data;
          this.totalRows = Number(response.message);
          this.applicantTypeRequestsList.forEach(item => {
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

  in_active_association(applicant_request_association: AssociationApplicantRequestList) {
    if (!applicant_request_association.is_active) {
      this.message = '¿Seguro que desea Inactivar la relación del solicitante con la solicitud?';
      this.visibleDialog = true;
      applicant_request_association.is_active = 0;
    } else {
      this.message = '¿Seguro que desea Activar la relación del solicitante con la solicitud?';
      this.visibleDialog = true;
      applicant_request_association.is_active = 1;
    }
    this.applicant_request_association = applicant_request_association;
  }
  closeDialog(value: boolean) {
    this.visibleDialog = false;
    if (value) {
      this.userService
        .inactivateAssociationApplicantRequest(this.applicant_request_association)
        .subscribe({
          next: (response: BodyResponse<string>) => {
            if (response.code === 200) {
              this.showSuccessMessage('success', 'Exitoso', 'Operación exitosa!');
            } else {
              this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
              if ((this.applicant_request_association.is_active = 1)) {
                this.applicant_request_association.is_active = 0;
              } else {
                this.applicant_request_association.is_active = 1;
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

  closeDialogSelector(value: boolean) {
    this.visibleDialogSelector = false;
    this.enableAction = value;
  }

  closeDialogAlert(value: boolean) {
    this.visibleDialogAlert = false;
    this.enableAction = value;
  }

  associateRequestsType() {
    this.visibleDialogSelector = true;
    this.buttonmsg = 'Asociar';
    this.parameter = ['Tipo de solicitante', 'Tipo de solicitud'];
    this.message = 'Asociar solicitante a tipo de solicitud';
  }

  setParameter(inputValue: AssociateApplicantRequest) {
    if (!this.enableAction) {
      return;
    } else {
      if (
        this.applicantTypeRequestsList.some(
          obj =>
            obj.request_type === inputValue.request_type_id &&
            obj.applicant_type === inputValue.applicant_type_id
        )
      ) {
        this.visibleDialogAlert = true;
        this.informative = true;
        this.message = 'Ya existe esa asociación';
        this.severity = 'danger';
      } else {
        this.userService.createAssociationApplicantRequest(inputValue).subscribe({
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
    this.ngOnInit();
  }
}
