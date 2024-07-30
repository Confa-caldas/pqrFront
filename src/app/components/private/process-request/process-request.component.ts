import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import {
  ApplicantTypeList,
  FilterRequests,
  RequestStatusList,
  RequestTypeList,
  RequestsList,
  UserList,
} from '../../../models/users.interface';
import { RoutesApp } from '../../../enums/routes.enum';
import { MessageService } from 'primeng/api';
import { SessionStorageItems } from '../../../enums/session-storage-items.enum';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { PaginatorState } from 'primeng/paginator';
import { PageEvent } from '../../../models/shared/page-event.interface';

@Component({
  selector: 'app-process-request',
  templateUrl: './process-request.component.html',
  styleUrl: './process-request.component.scss',
})
export class ProcessRequestComponent implements OnInit {
  requestList: RequestsList[] = [];
  requestListByAssigned: RequestsList[] = [];
  aplicantList: ApplicantTypeList[] = [];
  requestTypeList: RequestTypeList[] = [];
  userList: UserList[] = [];
  ingredient!: string;
  parameter = [''];
  request_details!: RequestsList;
  selectedRequests!: RequestsList[];
  informative: boolean = false;
  filterForm: FormGroup<any> = new FormGroup<any>({});
  filterFormAssigned: FormGroup<any> = new FormGroup<any>({});
  statusList: RequestStatusList[] = [];

  visibleDialogAlert = false;
  statusOptions!: string[];
  daysOption!: number[];
  selectedDaysOptions!: number[];
  selectedStatusOptions!: string[];
  user: string = '';

  //paginador
  first: number = 0;
  page: number = 1;
  rows: number = 10;
  totalRows: number = 0;

  //paginadorAssigned
  firstAssigned: number = 0;
  pageAssigned: number = 1;
  rowsAssigned: number = 10;
  totalRowsAssigned: number = 0;

  constructor(
    private userService: Users,
    private router: Router,
    private messageService: MessageService
  ) {
    this.filterForm = new FormGroup({
      dates_range: new FormControl(null),
      filing_number: new FormControl(null),
      doc_id: new FormControl(null),
      applicant_name: new FormControl(null),
      request_days: new FormControl(null),
      applicant_type_id: new FormControl(null),
      request_type_id: new FormControl(null),
      assigned_user: new FormControl(null),
      request_status_id: new FormControl(null),
    });
    this.filterFormAssigned = new FormGroup({
      dates_range: new FormControl(null),
      filing_number: new FormControl(null),
      doc_id: new FormControl(null),
      applicant_name: new FormControl(null),
      request_days: new FormControl(null),
      applicant_type_id: new FormControl(null),
      request_type_id: new FormControl(null),
      assigned_user: new FormControl(null),
      request_status_id: new FormControl(null),
    });
    this.filterForm.get('request_status_id')?.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.filterForm.get('request_status_id')?.setValue(null);
      }
    });
    this.filterForm.get('applicant_type_id')?.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.filterForm.get('applicant_type_id')?.setValue(null);
      }
    });
    this.filterForm.get('assigned_user')?.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.filterForm.get('assigned_user')?.setValue(null);
      }
    });
    this.filterForm.get('request_type_id')?.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.filterForm.get('request_type_id')?.setValue(null);
      }
    });
    this.filterFormAssigned.get('request_status_id')?.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.filterFormAssigned.get('request_status_id')?.setValue(null);
      }
    });
    this.filterFormAssigned.get('applicant_type_id')?.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.filterFormAssigned.get('applicant_type_id')?.setValue(null);
      }
    });
    this.filterFormAssigned.get('assigned_user')?.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.filterFormAssigned.get('assigned_user')?.setValue(null);
      }
    });
    this.filterFormAssigned.get('request_type_id')?.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.filterFormAssigned.get('request_type_id')?.setValue(null);
      }
    });
  }

  ngOnInit() {
    this.user = sessionStorage.getItem(SessionStorageItems.USER) || '';
    this.searhRequests();
    this.searhRequestsAssignedUser();
    this.getApplicantTypeList();
    this.getRequestTypeList();
    this.getUsersList();
    this.getRequestStatusList();
  }

  getColor(value: number): string {
    if (value >= 0 && value < 4) {
      return '#01b0ef';
    } else {
      return 'red';
    }
  }
  onPageChange(event: PaginatorState) {
    this.first = event.first || 0;
    this.rows = event.rows || 0;
    this.page = Number(event.page) + 1 || 0;
    this.searhRequests();
  }
  cleanForm() {
    this.first = 0;
    this.page = 1;
    this.rows = 10;
    this.filterForm.reset();
    this.requestList = [];
    this.searhRequests();
  }

  initPaginador() {
    this.first = 0;
    this.page = 1;
    this.rows = 10;
    this.searhRequests();
  }

  onPageChangeAssigned(eventAssigned1: PageEvent) {
    this.firstAssigned = eventAssigned1.first || 0;
    this.rowsAssigned = eventAssigned1.rows || 0;
    this.pageAssigned = Number(eventAssigned1.page) + 1 || 0;
    this.searhRequestsAssignedUser();
  }
  cleanFormAssigned() {
    this.firstAssigned = 0;
    this.pageAssigned = 1;
    this.rowsAssigned = 10;
    this.filterFormAssigned.reset();
    this.requestListByAssigned = [];
    this.searhRequestsAssignedUser();
  }

  initPaginadorAssigned() {
    this.firstAssigned = 0;
    this.pageAssigned = 1;
    this.rowsAssigned = 10;
    this.searhRequestsAssignedUser();
  }

  searhRequests() {
    const payload: FilterRequests = {
      i_date:
        this.filterForm.controls['dates_range'].value == null
          ? null
          : this.convertDates(this.filterForm.controls['dates_range']?.value[0] || null),
      f_date:
        this.filterForm.controls['dates_range']?.value == null
          ? null
          : this.convertDates(this.filterForm.controls['dates_range']?.value[1] || null),
      filing_number: this.filterForm.controls['filing_number'].value || null,
      doc_id: this.filterForm.controls['doc_id'].value || null,
      applicant_name: this.filterForm.controls['applicant_name'].value || null,
      request_days: this.filterForm.controls['request_days'].value || null,
      applicant_type_id: this.filterForm.controls['applicant_type_id'].value || null,
      request_type_id: this.filterForm.controls['request_type_id'].value || null,
      assigned_user: this.filterForm.controls['assigned_user'].value || null,
      status_id: this.filterForm.controls['request_status_id'].value || null,
      page: this.page,
      page_size: this.rows,
    };
    this.getRequestListByFilter(payload);
  }
  getRequestListByFilter(payload: FilterRequests) {
    this.userService.getRequestListByFilter(payload).subscribe({
      next: (response: BodyResponse<RequestsList[]>) => {
        if (response.code === 200) {
          this.requestList = response.data;
          this.daysOption = Array.from(new Set(this.requestList.map(item => item.request_days)));
          this.statusOptions = Array.from(new Set(this.requestList.map(item => item.status_name)));
          this.requestList = response.data.map(item => {
            const transformedDate = formatDate(item.filing_date, 'MM/dd/yyyy', 'en-US');
            return { ...item, filing_date: transformedDate };
          });
          this.requestList.forEach(item => {
            if (typeof item.filing_date === 'string') {
              item.filing_date_date = new Date(item.filing_date);
            }
          });
          this.totalRows = Number(response.message);
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
  convertDates(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
  }
  searhRequestsAssignedUser() {
    const payload: FilterRequests = {
      i_date:
        this.filterFormAssigned.controls['dates_range'].value == null
          ? null
          : this.convertDates(this.filterFormAssigned.controls['dates_range']?.value[0] || null),
      f_date:
        this.filterFormAssigned.controls['dates_range']?.value == null
          ? null
          : this.convertDates(this.filterFormAssigned.controls['dates_range']?.value[1] || null),
      filing_number: this.filterFormAssigned.controls['filing_number'].value || null,
      doc_id: this.filterFormAssigned.controls['doc_id'].value || null,
      applicant_name: this.filterFormAssigned.controls['applicant_name'].value || null,
      request_days: this.filterFormAssigned.controls['request_days'].value || null,
      applicant_type_id: this.filterFormAssigned.controls['applicant_type_id'].value || null,
      request_type_id: this.filterFormAssigned.controls['request_type_id'].value || null,
      status_id: this.filterFormAssigned.controls['request_status_id'].value || null,
      page: this.pageAssigned,
      page_size: this.rowsAssigned,
    };
    this.getRequestListByAssignedUserByFilter(payload);
  }
  getRequestListByAssignedUserByFilter(payload: FilterRequests) {
    this.userService.getRequestListByAssignedUser(this.user, payload).subscribe({
      next: (response: BodyResponse<RequestsList[]>) => {
        if (response.code === 200) {
          this.requestListByAssigned = response.data;
          this.daysOption = Array.from(
            new Set(this.requestListByAssigned.map(item => item.request_days))
          );
          this.statusOptions = Array.from(
            new Set(this.requestListByAssigned.map(item => item.status_name))
          );
          this.requestListByAssigned = response.data.map(item => {
            const transformedDate = formatDate(item.filing_date, 'MM/dd/yyyy', 'en-US');
            return { ...item, filing_date: transformedDate };
          });
          this.requestListByAssigned.forEach(item => {
            if (typeof item.filing_date === 'string') {
              item.filing_date_date = new Date(item.filing_date);
            }
          });
          this.totalRowsAssigned = Number(response.message);
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
  getRequestStatusList() {
    this.userService.getRequestStatusList().subscribe({
      next: (response: BodyResponse<RequestStatusList[]>) => {
        if (response.code === 200) {
          this.statusList = response.data;
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
  getApplicantTypeList() {
    this.userService.getApplicantTypesList().subscribe({
      next: (response: BodyResponse<ApplicantTypeList[]>) => {
        if (response.code === 200) {
          this.aplicantList = response.data.filter(obj => obj.is_active !== 0);
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
  getRequestTypeList() {
    this.userService.getRequestTypesList().subscribe({
      next: (response: BodyResponse<RequestTypeList[]>) => {
        if (response.code === 200) {
          this.requestTypeList = response.data;
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
  getUsersList() {
    this.userService.getUsersList().subscribe({
      next: (response: BodyResponse<UserList[]>) => {
        if (response.code === 200) {
          this.userList = response.data;
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

  redirectDetails(request_id: number) {
    localStorage.removeItem('route');
    localStorage.setItem('route', this.router.url);
    this.router.navigate([RoutesApp.REQUEST_DETAILS, request_id]);
  }
}
