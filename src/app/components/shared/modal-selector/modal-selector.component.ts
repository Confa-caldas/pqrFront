import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ApplicantTypeList,
  AssociateApplicantRequest,
  RequestTypeList,
} from '../../../models/users.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../../services/users.service';
import { BodyResponse } from '../../../models/shared/body-response.inteface';

@Component({
  selector: 'app-modal-selector',
  templateUrl: './modal-selector.component.html',
  styleUrl: './modal-selector.component.scss',
})
export class ModalSelectorComponent implements OnInit {
  @Input() login = false;
  @Input() select = false;
  @Input() message = '';
  @Input() buttonmsg = '';
  @Input() parameter = [''];
  @Input() visible: boolean = false;
  @Output() setRta = new EventEmitter<boolean>();
  @Output() setRtaParameter = new EventEmitter<AssociateApplicantRequest>();
  applicantTypeList: ApplicantTypeList[] = [];
  requestTypeList: RequestTypeList[] = [];
  inputValue1: string = '';
  inputValue2: string = '';
  inputValue: string[] = [''];
  isButtonDisabled = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: Users
  ) {
    this.formGroup = this.formBuilder.group({
      selectedApplicant: ['', Validators.required],
      selectedRequest: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getApplicantTypesList();
    this.getRequestTypesList();
  }
  getRequestTypesList() {
    this.userService.getRequestTypesList().subscribe({
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
  //userForm: FormGroup;
  formGroup: FormGroup<any> = new FormGroup<any>({});
  showDialog() {
    this.visible = true;
  }

  closeDialog(value: boolean) {
    this.setRta.emit(value);
    this.inputValue = [this.inputValue1, this.inputValue2];
    const payload: AssociateApplicantRequest = {
      applicant_type_id: this.formGroup.controls['selectedApplicant'].value['applicant_type_id'],
      request_type_id: this.formGroup.controls['selectedRequest'].value['request_type_id'],
    };
    this.setRtaParameter.emit(payload);
    this.visible = false;
  }
  updateButtonState() {
    this.isButtonDisabled =
      !this.formGroup.get('selectedApplicant')?.value ||
      !this.formGroup.get('selectedRequest')?.value;
  }
}
