import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { Users } from '../../../services/users.service';
import {
  Column,
  ExportColumn,
  FilterRequests,
  IsPqrCatalog,
  RequestReportList,
  RequestStatusList,
  RequestsList,
  UserList,
  RequestReportDetail,
} from '../../../models/users.interface';
import * as FileSaver from 'file-saver';
import { FormControl, FormGroup } from '@angular/forms';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { PageEvent } from '../../../models/shared/page-event.interface';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-requests-report',
  templateUrl: './requests-report.component.html',
  styleUrl: './requests-report.component.scss',
})
export class RequestsReportComponent implements OnInit {
  selectedProducts!: RequestsList[];
  cols!: Column[];
  exportColumns!: ExportColumn[];
  formGroup: FormGroup<any> = new FormGroup<any>({});
  rangeDates: Date[] | undefined;
  statusList: RequestStatusList[] = [];
  userList: UserList[] = [];
  ispqrList: IsPqrCatalog[] = [];
  requestReportList: RequestReportList[] = [];
  requestReportListAll: RequestReportList[] = [];
  requestReportDetailAll: RequestReportDetail[] = [];

  //paginador
  first: number = 0;
  page: number = 1;
  rows: number = 10;
  totalRows: number = 0;

  onPageChange(event: PaginatorState) {
    this.first = event.first || 0;
    this.rows = event.rows || 0;
    this.page = Number(event.page) + 1 || 0;
    this.searhRequests();
  }

  constructor(
    private userService: Users,
    private router: Router,
    private messageService: MessageService
  ) {
    this.formGroup = new FormGroup({
      dates_range: new FormControl(null),
      request_status_id: new FormControl(null),
      assigned_user: new FormControl(null),
      is_pqr: new FormControl(null),
    });
    this.formGroup.get('request_status_id')?.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.formGroup.get('request_status_id')?.setValue(null);
      }
    });

    this.formGroup.get('assigned_user')?.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.formGroup.get('assigned_user')?.setValue(null);
      }
    });
  }

  ngOnInit() {
    this.searhRequests();
    this.getRequestStatusList();
    this.getUsersTable();
    this.cols = [
      { field: 'filing_number', header: 'Número de radicado', customExportHeader: 'Product Code' },
      { field: 'filing_date', header: 'Fecha de radicación' },
      { field: 'filing_time', header: 'Hora de radicación' },
      { field: 'status_name', header: 'Estado solicitud' },
      { field: 'applicant_type_name', header: 'Tipo de solicitante' },
      { field: 'request_type_name', header: 'Tipo de solicitud' },
      { field: 'catalog_item_name', header: 'Tipo de documento' },
      { field: 'doc_id', header: 'Número de documento' },
      { field: 'applicant_name', header: 'Nombre empresa/Solicitante' },
      { field: 'applicant_email', header: 'Correo electrónico' },
      { field: 'applicant_cellphone', header: 'Teléfono móvil' },
      { field: 'request_description', header: 'Descripción de solicitud' },
      { field: 'data_treatment', header: 'Tratamiento de Datos' },
      { field: 'request_days', header: 'Días solicitud' },
      //{ field: 'assigned_user', header: 'Responsable solicitud' },
      { field: 'user_name_completed', header: 'Responsable solicitud' },
      { field: 'request_answer', header: 'Respuesta solicitud' },
      { field: 'answer_date', header: 'Fecha respuesta solicitud' },
      { field: 'answer_time', header: 'Hora respuesta solicitud' },
      { field: 'reclasification_applicant_type_name', header: 'Tipo solicitante reclasificación' },
      { field: 'reclasification_request_type_name', header: 'Tipo solicitud reclasificación' },
      { field: 'is_pqr', header: 'Es Pqr' },
      { field: 'quality_dimension_name', header: 'Dimensión de calidad' },
      { field: 'modality_id', header: 'Código modalidad' },
      { field: 'modality_name', header: 'Modalidad solicitud' },
      { field: 'category_name', header: 'Categoría' },
      { field: 'tipology_name', header: 'Tipología' },
      { field: 'cause_name', header: 'Causa' },
      { field: 'month', header: 'Mes' },
    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
    this.ispqrList = [
      {
        id: 1,
        name: 'Sí',
      },
      {
        id: 0,
        name: 'No',
      },
    ];
  }
  getColor(value: number): string {
    if (value >= 0 && value < 4) {
      return '#01b0ef';
    } else {
      return 'red';
    }
  }
  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
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
  getUsersTable() {
    this.userService.getUsersList().subscribe({
      next: (response: BodyResponse<UserList[]>) => {
        if (response.code === 200) {
          this.userList = response.data;
          this.userList.forEach(item => {
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
  cleanForm() {
    this.first = 0;
    this.page = 1;
    this.rows = 10;
    this.formGroup.reset();
    this.requestReportList = [];
    this.searhRequests();
  }

  initPaginador() {
    this.first = 0;
    this.page = 1;
    this.rows = 10;
    this.searhRequests();
  }
  searhRequests() {
    const payload: FilterRequests = {
      i_date:
        this.formGroup.controls['dates_range'].value == null
          ? null
          : this.convertDates(this.formGroup.controls['dates_range']?.value[0] || null),
      f_date:
        this.formGroup.controls['dates_range']?.value == null
          ? null
          : this.convertDates(this.formGroup.controls['dates_range']?.value[1] || null),
      status_id: this.formGroup.controls['request_status_id'].value || null,
      assigned_user: this.formGroup.controls['assigned_user'].value || null,
      is_pqr: this.formGroup.controls['is_pqr'].value,
      page: this.page,
      page_size: this.rows,
    };
    this.getRequestReportList(payload);
  }
  convertDates(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  changesKeys(object: any[], colMap: any[]) {
    object.forEach(item => {
      colMap.forEach(map => {
        if (item.hasOwnProperty(map.field)) {
          item[map.header] = item[map.field];
          delete item[map.field];
        }
      });
    });
  }

  generateExcel(format: string) {
    const payload: FilterRequests = {
      i_date:
        this.formGroup.controls['dates_range'].value == null
          ? null
          : this.convertDates(this.formGroup.controls['dates_range']?.value[0] || null),
      f_date:
        this.formGroup.controls['dates_range']?.value == null
          ? null
          : this.convertDates(this.formGroup.controls['dates_range']?.value[1] || null),
      status_id: this.formGroup.controls['request_status_id'].value || null,
      assigned_user: this.formGroup.controls['assigned_user'].value || null,
      is_pqr: this.formGroup.controls['is_pqr'].value || null,
    };
    this.userService.getRequestReportAll(payload).subscribe({
      next: (response: BodyResponse<RequestReportList[]>) => {
        if (response.code === 200) {
          console.log(response.data);
          this.requestReportListAll = response.data;
          this.requestReportListAll.forEach(item => {
            item.is_pqr = item.is_pqr === 1 ? 'Sí' : item.is_pqr === null ? '' : 'No';
          });
          this.requestReportListAll.forEach(item => {
            if (item.filing_time !== null) {
              item.filing_time = item.filing_time.split('+')[0];
            }
          });
          this.requestReportListAll.forEach(item => {
            if (item.answer_time !== null) {
              item.answer_time = item.answer_time.split('+')[0];
            }
          });
          this.requestReportListAll.forEach(item => {
            item.data_treatment = item.data_treatment ? 'VERDADERO' : 'FALSO';
          });
          this.requestReportListAll.forEach(item => {
            if (item.month >= '1' && item.month <= '9') {
              item.month = `0${item.month}`;
            } else if (item.month > '9') {
              item.month = String(item.month);
            }
          });
          this.changesKeys(this.requestReportListAll, this.cols);
        } else {
          console.log('err');
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('La suscripción ha sido completada.');
        if (format == 'xls') {
          this.exportExcelXLS(this.requestReportListAll);
        } else {
          this.exportExcelXLSX(this.requestReportListAll);
        }
      },
    });
  }
  exportExcelXLSX(requestList: RequestReportList[]) {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(requestList);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFileXLSX(excelBuffer, 'Solicitudes');
    });
  }

  saveAsExcelFileXLSX(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  exportExcelXLS(requestList: RequestReportList[]) {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(requestList);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xls', type: 'array' });
      this.saveAsExcelFileXLS(excelBuffer, 'Solicitudes');
    });
  }

  saveAsExcelFileXLS(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.ms-excel;charset=UTF-8';
    const EXCEL_EXTENSION = '.xls';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  getRequestReportList(payload: FilterRequests) {
    this.userService.getRequestReport(payload).subscribe({
      next: (response: BodyResponse<RequestReportList[]>) => {
        if (response.code === 200) {
          this.requestReportList = response.data;
          this.totalRows = Number(response.message);
          this.requestReportList.forEach(item => {
            item.is_pqr = item.is_pqr === 1 ? 'Sí' : item.is_pqr === null ? '' : 'No';
          });
          this.requestReportList.forEach(item => {
            item.filing_time = item.filing_time.split('+')[0];
          });
          this.requestReportList.forEach(item => {
            if (item.answer_time !== null) {
              item.answer_time = item.answer_time.split('+')[0];
            }
          });
          this.requestReportList.forEach(item => {
            if (item.month >= '1' && item.month <= '9') {
              item.month = `0${item.month}`;
            } else if (item.month > '9') {
              item.month = String(item.month);
            }
          });
          this.requestReportList.forEach(item => {
            item.data_treatment = item.data_treatment ? 'VERDADERO' : 'FALSO';
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

  reportDetails() {
    this.userService.getRequestReportDetail().subscribe({
      next: (response: BodyResponse<RequestReportDetail[]>) => {
        console.log('Respuesta del servicio:', response);
      },
    });
  }
}
