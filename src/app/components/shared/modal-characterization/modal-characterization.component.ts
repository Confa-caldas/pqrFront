import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ApplicantTypeList,
  CategoryList,
  CharacterizationCreate,
  ModalityList,
  QualityDimensionList,
  RequestTypeList,
  RequestsDetails,
  TipologiesCauses,
} from '../../../models/users.interface';
import { Users } from '../../../services/users.service';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modal-characterization',
  templateUrl: './modal-characterization.component.html',
  styleUrl: './modal-characterization.component.scss',
})
export class ModalCharacterizationComponent implements OnInit {
  @Input() login = false;
  @Input() select = false;
  @Input() message = '';
  @Input() buttonmsg = '';
  @Input() visible: boolean = false;
  @Input() read_only: boolean = false;
  @Input() request_details?: RequestsDetails;
  @Output() setRta = new EventEmitter<boolean>();
  @Output() setRtaParameter = new EventEmitter<CharacterizationCreate>();
  inputValue: string[] = [''];
  month!: number;
  modalityList!: ModalityList[];

  applicantTypeList: ApplicantTypeList[] = [];
  requestTypeList: RequestTypeList[] = [];
  categoryList: CategoryList[] = [];
  qualityList: QualityDimensionList[] = [];
  TipologyList: TipologiesCauses[] = [];
  CauseList: TipologiesCauses[] = [];
  modalBoolean!: boolean;
  categoryBoolean!: boolean;
  causeBoolean!: boolean;

  formGroup: FormGroup<any> = new FormGroup<any>({});

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    // Prevenir el cierre del diálogo al presionar "Esc"
    event.preventDefault();
  }
  constructor(
    private userService: Users,
    private messageService: MessageService
  ) {
    this.formGroup = new FormGroup({
      request_id: new FormControl(null),
      applicant_type_id: new FormControl(null, [Validators.required]),
      request_type_id: new FormControl(null, [Validators.required]),
      is_pqr: new FormControl(null, [Validators.required]),
      quality_dimension_id: new FormControl(null),
      modality_id: new FormControl(null),
      category_id: new FormControl(null),
      tipology_id: new FormControl(null),
      cause_id: new FormControl(null),
    });
    this.disableConditionalModalityandQuality();
    this.disableConditionalCategoryandTipology();

    this.formGroup.get('is_pqr')?.valueChanges.subscribe(value => {
      if (value === 1) {
        this.enableConditionalModalityandQuality();
      } else {
        this.disableConditionalModalityandQuality();
      }
    });
    this.formGroup.get('modality_id')?.valueChanges.subscribe(value => {
      if (value === 2) {
        this.enableConditionalCategoryandTipology();
        this.enableConditionalCause();
      } else {
        this.disableConditionalCategoryandTipology();
        this.disableConditionalCause();
      }
    });
  }

  ngOnInit(): void {
    this.getApplicantTypesList();
    this.getQualityDimensionsTable();
    this.getModalityTable();
    this.formGroup.get('applicant_type_id')?.setValue(this.request_details?.applicant_type_id);
    this.getRequestsTypeByApplicantType(this.request_details!.applicant_type_id);
    this.formGroup.get('request_type_id')?.setValue(this.request_details?.request_type_id);
    const arrayMonth = this.request_details?.filing_date.split('-').slice(1, 2) || '00';
    this.month = parseInt(arrayMonth[0], 10);
  }

  disableConditionalModalityandQuality() {
    this.formGroup.get('modality_id')?.clearValidators();
    this.formGroup.get('modality_id')?.updateValueAndValidity();
    this.formGroup.get('quality_dimesion_id')?.clearValidators();
    this.formGroup.get('quality_dimesion_id')?.updateValueAndValidity();
    this.modalBoolean = false;
  }

  enableConditionalModalityandQuality() {
    this.formGroup.get('modality_id')?.setValidators(Validators.required);
    this.formGroup.get('modality_id')?.updateValueAndValidity();
    this.formGroup.get('quality_dimesion_id')?.setValidators(Validators.required);
    this.formGroup.get('quality_dimesion_id')?.updateValueAndValidity();
    this.modalBoolean = true;
  }
  disableConditionalCategoryandTipology() {
    this.formGroup.get('category_id')?.clearValidators();
    this.formGroup.get('category_id')?.updateValueAndValidity();
    this.formGroup.get('tipology_id')?.clearValidators();
    this.formGroup.get('tipology_id')?.updateValueAndValidity();
    this.formGroup.get('cause_id')?.clearValidators();
    this.categoryBoolean = false;
  }

  enableConditionalCategoryandTipology() {
    this.formGroup.get('category_id')?.setValidators(Validators.required);
    this.formGroup.get('category_id')?.updateValueAndValidity();
    this.formGroup.get('tipology_id')?.setValidators(Validators.required);
    this.formGroup.get('tipology_id')?.updateValueAndValidity();
    this.formGroup.get('cause_id')?.setValidators(Validators.required);
    this.categoryBoolean = true;
  }

  disableConditionalCause() {
    this.formGroup.get('cause_id')?.clearValidators();
    this.formGroup.get('tipology_id')?.updateValueAndValidity();
    this.causeBoolean = false;
  }

  enableConditionalCause() {
    this.formGroup.get('cause_id')?.clearValidators();
    this.formGroup.get('tipology_id')?.updateValueAndValidity();
    this.causeBoolean = true;
  }

  showDialog() {
    this.visible = true;
  }
  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
  }
  getApplicantTypesList() {
    this.userService.getApplicantTypesList().subscribe({
      next: (response: BodyResponse<ApplicantTypeList[]>) => {
        if (response.code === 200) {
          this.applicantTypeList = response.data.filter(obj => obj.is_active !== 0);
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

  getRequestType() {
    this.getRequestsTypeByApplicantType(this.formGroup.get('applicant_type_id')?.value);
  }

  getRequestsTypeByApplicantType(applicant_type_id: number) {
    this.userService.getRequestsTypeByApplicantType(applicant_type_id).subscribe({
      next: (response: BodyResponse<RequestTypeList[]>) => {
        if (response.code === 200) {
          this.requestTypeList = response.data.filter(obj => obj.is_active !== 0);
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

  getQualityDimensionsTable() {
    this.userService.getQualityDimensionsList().subscribe({
      next: (response: BodyResponse<QualityDimensionList[]>) => {
        if (response.code === 200) {
          this.qualityList = response.data.filter(obj => obj.is_active !== 0);
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
  getModalityTable() {
    this.userService.getModalityList().subscribe({
      next: (response: BodyResponse<ModalityList[]>) => {
        if (response.code === 200) {
          this.modalityList = response.data.filter(obj => obj.is_active !== 0);
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

  getCategoryTableByModality(modality_id: number) {
    this.userService.getCategoryListByModality(modality_id).subscribe({
      next: (response: BodyResponse<CategoryList[]>) => {
        if (response.code === 200) {
          this.categoryList = response.data.filter(obj => obj.is_active !== 0);
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

  getTipologiesListByCategory(category_name_string: string) {
    const payload: TipologiesCauses = {
      category_name: category_name_string,
    };
    this.userService.getTipologiesListByCategory(payload).subscribe({
      next: (response: BodyResponse<TipologiesCauses[]>) => {
        if (response.code === 200) {
          this.TipologyList = response.data;
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

  getCausesListByTipology(tipology_name_string: string) {
    const payload: TipologiesCauses = {
      tipology_name: tipology_name_string,
    };
    this.userService.getCausesListByTipology(payload).subscribe({
      next: (response: BodyResponse<TipologiesCauses[]>) => {
        if (response.code === 200) {
          this.CauseList = response.data;
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
  closeDialog(value: boolean) {
    this.setRta.emit(value);

    const payload: CharacterizationCreate = {
      request_id: this.request_details?.request_id || 0,
      applicant_type_id: this.formGroup.controls['applicant_type_id'].value,
      request_type_id: this.formGroup.controls['request_type_id'].value,
      is_pqr: this.formGroup.controls['is_pqr'].value,
      quality_dimension_id: this.formGroup.controls['quality_dimension_id'].value || null,
      modality_id: this.formGroup.controls['modality_id'].value || null,
      category_id: this.formGroup.get('category_id')?.value?.category_id || null,
      //tipology_name: this.formGroup.controls['tipology_id'].value || null,
      //cause_name: this.formGroup.controls['cause_id'].value || null,
      //category_id: this.formGroup.get('category_id.category_id')?.value || null,
      month: this.month,
    };
    this.setRtaParameter.emit(payload);
    this.visible = false;
  }
}
