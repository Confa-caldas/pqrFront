import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Users } from '../../../services/users.service';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import {
  ApplicantAttachments,
  ApplicantTypeList,
  RequestFormList,
  RequestTypeList,
} from '../../../models/users.interface';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { RoutesApp } from '../../../enums/routes.enum';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss',
})
export class RequestFormComponent implements OnInit {
  @ViewChild('archive_request') fileInput!: ElementRef;

  requestForm: FormGroup;

  documentList!: [];
  document!: string;
  applicantType!: ApplicantTypeList;
  requestType!: RequestTypeList;
  arrayApplicantAttachment: ApplicantAttachments[] = [];
  fileNameList: Set<string> = new Set();
  selectedFiles: FileList | null = null;
  base64String: string = '';
  option: string[] = [];
  errorSizeFile!: boolean;
  errorExtensionFile!: boolean;
  errorRepeatFile!: boolean;
  errorMensaje!: string;
  errorMensajeDisabled!: string;
  errorMensajeFile!: string;
  visibleDialogAlert = false;
  informative: boolean = false;
  severity = '';
  message = '';
  enableAction: boolean = false;
  loadingAttachments: boolean = false;
  optionDefault!: string;
  optionsCompany = [
    {
      catalog_item_id: 1,
      catalog_item_name: 'NIT',
      regex: '^[0-9]{0,9}$',
    },
  ];
  value!: {};
  preSignedUrl: string = '';
  selectedFile: File | null = null;
  numeroDocumentoIngresado: boolean = false;
  ngOnInit(): void {
    let applicant = localStorage.getItem('applicant-type');
    if (applicant) {
      this.applicantType = JSON.parse(applicant);
    }
    let request = localStorage.getItem('request-type');
    if (request) {
      this.requestType = JSON.parse(request);
    }
    this.getApplicantList();
    this.requestForm.get('number_id')?.disable();
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: Users,
    private messageService: MessageService,
    private router: Router,
    private http: HttpClient
  ) {
    this.value = {
      catalog_item_id: 1,
      catalog_item_name: 'NIT',
      regex: '^[0-9]{0,9}$',
    };
    this.requestForm = this.formBuilder.group(
      {
        document_type: ['', Validators.required],
        number_id: ['', Validators.required],
        name: ['', [Validators.required, Validators.pattern('^[^@#$%&]+$')]],

        cellphone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
          ],
        ],
        validator_email: ['', [Validators.required]],
        mensage: ['', [Validators.required, Validators.maxLength(1000)]],
      },
      { validator: this.emailMatcher }
    );

    this.requestForm.get('document_type')?.valueChanges.subscribe(value => {
      this.requestForm.get('number_id')?.setValidators([Validators.pattern(value.regex)]);
      this.requestForm.get('number_id')?.enable();
      if (value.catalog_item_id == 0) {
        this.errorMensaje = 'Ingrese solo números ';
      } else if (value.catalog_item_id == 15) {
        this.errorMensaje = 'Ingrese solo números y máximo 12 digitos';
      } else if (value.catalog_item_id == 16) {
        this.errorMensaje = 'Formato inválido';
      } else if (value.catalog_item_id == 1) {
        this.errorMensaje = 'Ingrese solo números y máximo 9 digitos';
      }
    });
  }

  showSuccessMessage(state: string, title: string, message: string) {
    this.messageService.add({ severity: state, summary: title, detail: message });
  }
  emailMatcher: ValidatorFn = (formControl: AbstractControl) => {
    const email = formControl.get('email')?.value;
    const emailConfirmed = formControl.get('validator_email')?.value;
    return email === emailConfirmed ? null : { notMatched: true };
  };

  openFileInput() {
    this.fileInput.nativeElement.value = ''; // Limpiar la entrada de archivos antes de abrir el cuadro de diálogo
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (this.arrayApplicantAttachment.length === 0) {
      this.fileNameList.clear();
    }

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];

      let fileSizeFormat: string;
      const fileName: string = file.name;
      const fileSizeInKiloBytes = file.size / 1024;
      if (fileSizeInKiloBytes < 1024) {
        fileSizeFormat = fileSizeInKiloBytes.toFixed(2) + 'KB';
      } else {
        const fileSizeMegabytes = fileSizeInKiloBytes / 1024;
        fileSizeFormat = fileSizeMegabytes.toFixed(2) + 'MB';
      }

      if (this.isValidExtension(file)) {
        this.errorMensajeFile = `El archivo ${files[i].name} tiene una extension no permitida`;
        this.errorExtensionFile = true;
        continue;
      }

      if (file.size > 20971520) {
        this.errorMensajeFile = `El archivo ${files[i].name} supera los 20MB`;
        this.errorSizeFile = true;
        continue;
      }

      const exists = this.arrayApplicantAttachment.some(item => item.source_name === fileName);
      if (exists) {
        this.errorMensajeFile = `El archivo ${fileName} ya está adjunto`;
        this.errorRepeatFile = true;
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String: string = e.target.result.split(',')[1];

        const applicantAttach: ApplicantAttachments = {
          base64file: base64String,
          source_name: fileName,
          fileweight: fileSizeFormat,
          file: files[i],
        };

        this.fileNameList.add(fileName);
        this.arrayApplicantAttachment.push(applicantAttach);
      };
      reader.readAsDataURL(file);
    }
    console.log(this.arrayApplicantAttachment, 'seleccionados');
    setTimeout(() => {
      this.errorRepeatFile = false;
      this.errorExtensionFile = false;
      this.errorSizeFile = false;
    }, 5000);
  }

  getAplicant(): ApplicantAttachments[] {
    return this.arrayApplicantAttachment;
  }

  clearFileInput(index: number) {
    const removedFile = this.arrayApplicantAttachment.splice(index, 1)[0];
    this.fileNameList.delete(removedFile.source_name);
  }

  isValidExtension(file: File): boolean {
    const extensionesValidas = ['.jpg', '.png', '.pdf', '.doc', '.xlsx', '.docx', '.xls'];
    const fileExtension = file?.name?.split('.').pop()?.toLowerCase();
    return !extensionesValidas.includes('.' + fileExtension);
  }

  getApplicantList() {
    this.userService.getFormById(this.requestType.form_id || 0).subscribe({
      next: (response: BodyResponse<any[]>): void => {
        if (response.code === 200) {
          this.documentList = response.data[0].catalog_source;
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
  setParameter(inputValue: RequestFormList) {
    this.userService.createRequest(inputValue).subscribe({
      next: (response: BodyResponse<number>) => {
        if (response.code === 200) {
          this.requestForm.reset();
          this.fileNameList.clear();
          if (this.getAplicant().length == 0) {
            setTimeout(() => {
              this.showAlertModal(response.data);
            }, 1000);
          } else {
            this.attachApplicantFiles(response.data);
          }
        } else {
          setTimeout(() => {
            this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
          }, 1000);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('La suscripción ha sido completada post.');
      },
    });
  }
  async getPreSignedUrl(file: ApplicantAttachments, request_id: number) {
    const payload = {
      source_name: file['source_name'],
      fileweight: file['fileweight'],
      request_id: request_id,
    };
    this.userService.getUrlSigned(payload, 'applicant').subscribe({
      next: (response: BodyResponse<string>): void => {
        if (response.code === 200) {
          this.preSignedUrl = response.data;
        } else {
          this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
        }
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('La suscripción ha sido completada.');
        this.uploadToPresignedUrl(file);
        return this.preSignedUrl;
      },
    });
  }
  async uploadToPresignedUrl(file: ApplicantAttachments) {
    const uploadResponse = await this.http
      .put(this.preSignedUrl, file.file, {
        headers: {
          'Content-Type': 'application/png',
        },
        reportProgress: true,
        observe: 'events',
      })
      .toPromise();
  }

  async attachApplicantFiles(request_id: number) {
    await Promise.all(
      this.arrayApplicantAttachment.map(async item => {
        await this.getPreSignedUrl(item, request_id);
      })
    );
    this.showAlertModal(request_id);
  }
  sendRequest() {
    const payload: RequestFormList = {
      request_status: 1,
      applicant_type: this.applicantType.applicant_type_id,
      request_type: this.requestType.request_type_id,
      doc_type: this.requestForm.controls['document_type'].value['catalog_item_id'],
      doc_id: this.requestForm.controls['number_id'].value,
      applicant_name: this.requestForm.controls['name'].value,
      applicant_email: this.requestForm.controls['email'].value,
      applicant_cellphone: this.requestForm.controls['cellphone'].value,
      request_description: this.requestForm.controls['mensage'].value,
      request_days: this.requestType.request_days || 15,
      assigned_user: '',
      request_answer: '',
      data_treatment: true,
      applicant_attachments: null,
      assigned_attachments: null,
      form_id: this.requestType.form_id,
    };

    this.setParameter(payload);
  }
  closeDialogAlert(value: boolean) {
    this.visibleDialogAlert = false;
    this.enableAction = value;
    this.router.navigate([RoutesApp.CREATE_REQUEST]);
  }
  showAlertModal(filing_number: number) {
    this.visibleDialogAlert = true;
    this.informative = true;
    this.message = filing_number.toString();
    this.severity = 'danger';
  }

  //Configuracion mensajes placeholder
  /*
  getPlaceholder(): string {
    switch(this.applicantType.applicant_type_id) {
      case 1:
        return '*Descripción detallada de la solicitud';
      default:
        return '*Descripción detallada de la solicitud incluyendo los datos de las personas a cargo';
    }
  } */
}
