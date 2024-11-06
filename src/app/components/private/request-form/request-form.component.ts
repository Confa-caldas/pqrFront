import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Users } from '../../../services/users.service';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import {
  ApplicantAttachments,
  ApplicantTypeList,
  RequestFormList,
  RequestTypeList,
  ErrorAttachLog,
} from '../../../models/users.interface';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { RoutesApp } from '../../../enums/routes.enum';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { HttpEventType, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { throwError, retry } from 'rxjs';
import { catchError, retryWhen, delay, take, tap } from 'rxjs/operators';

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
  isError: boolean = false;
  severity = '';
  message = '';
  tittle_message = '';
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

  showModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';
  resolveModal!: () => void; // Función para resolver la promesa

  isUploading: boolean = false;
  uploadProgress = 0;
  visibleDialogProgress: boolean = false;
  isSpinnerVisible = false;
  hasPendingChanges: boolean = false;

  ngOnInit(): void {

    let applicant = localStorage.getItem('applicant-type');
    let request = localStorage.getItem('request-type');
    const visitedFirstPage = localStorage.getItem('visitedFirstPage');

    console.log(visitedFirstPage);

    if (!visitedFirstPage){
      this.router.navigate([RoutesApp.CREATE_REQUEST]);
    } else {
      //let applicant = localStorage.getItem('applicant-type');
    if (applicant) {
      this.applicantType = JSON.parse(applicant);
    }
    //let request = localStorage.getItem('request-type');
    if (request) {
      this.requestType = JSON.parse(request);
    }
    this.getApplicantList();
    this.requestForm.get('number_id')?.disable();
    }

    
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
        this.errorMensaje = 'Ingrese solo números y máximo 11 digitos';
      }
    });
  }

  convertToLowercase(controlName: string): void {
    const control = this.requestForm.get(controlName);
    if (control) {
      control.setValue(control.value.toLowerCase(), { emitEvent: false });
    }
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

      if (file.size > 30720000) {
        this.errorMensajeFile = `El archivo ${files[i].name} supera los 30MB`;
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
  async setParameter(inputValue: RequestFormList) {
    const mensaje = inputValue.request_description;
    const adjuntarArchivo = await this.validarMensaje(mensaje);
    inputValue.count_attacments = this.getAplicant().length;

    // Si es necesario adjuntar archivo y no hay aplicantes
    if (adjuntarArchivo && this.getAplicant().length == 0) {
      const continuar = await this.showAdjuntarArchivoModal(); // Espera la acción del usuario en el modal
      if (!continuar) {
        // Si el usuario canceló, no continuar con la creación de la solicitud
        return;
      }
    }

    // Continúa con la creación de la solicitud
    this.continuarCreacionSolicitud(inputValue);
  }

  continuarCreacionSolicitud(inputValue: RequestFormList) {
    console.log(inputValue);
    this.userService.createRequest(inputValue).subscribe({
      next: (response: BodyResponse<number>) => {
        if (response.code === 200) {
          //this.requestForm.reset();
          //this.fileNameList.clear();
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

  showAdjuntarArchivoModal(): Promise<boolean> {
    return new Promise(resolve => {
      this.modalTitle = 'Adjuntar archivo';
      this.modalMessage = '¿Desea enviar su solicitud sin documentos o archivos adjuntos?';
      this.showModal = true; // Muestra el modal

      // Asignar funciones para aceptar o cancelar
      this.onAccept = () => {
        this.showModal = false; // Oculta el modal
        resolve(true); // Resuelve la promesa, continúa el proceso
      };

      this.onCancel = () => {
        this.showModal = false; // Oculta el modal
        resolve(false); // Resuelve la promesa, pero el proceso no sigue
      };
    });
  }

  // Cuando el usuario acepta
  onAccept() {
    this.showModal = false; // Oculta el modal
    this.resolveModal(); // Resuelve la promesa
  }

  // Cuando el usuario cancela
  onCancel() {
    this.showModal = false; // Oculta el modal
    this.resolveModal(); // Resuelve la promesa, pero no continúa el proceso
  }

  // setParameter(inputValue: RequestFormList) {
  //   this.userService.createRequest(inputValue).subscribe({
  //     next: (response: BodyResponse<number>) => {
  //       if (response.code === 200) {
  //         this.requestForm.reset();
  //         this.fileNameList.clear();
  //         if (this.getAplicant().length == 0) {
  //           setTimeout(() => {
  //             this.showAlertModal(response.data);
  //           }, 1000);
  //         } else {
  //           this.attachApplicantFiles(response.data);
  //         }
  //       } else {
  //         setTimeout(() => {
  //           this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
  //         }, 1000);
  //       }
  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //     },
  //     complete: () => {
  //       console.log('La suscripción ha sido completada post.');
  //     },
  //   });
  // }
  /*
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
  */

  async getPreSignedUrl(file: ApplicantAttachments, request_id: number): Promise<string | void> {
    this.isSpinnerVisible = true;
    const payload = {
      // Ajuste para eliminar lo puntos o caracteres especiales en los nombres de los adjuntos
      source_name: file['source_name'].replace(/(?!\.[^.]+$)\./g, '_'),
      fileweight: file['fileweight'],
      request_id: request_id,
    };

    return new Promise((resolve, reject) => {
      this.userService.getUrlSigned(payload, 'applicant').subscribe({
        next: (response: BodyResponse<string>): void => {
          if (response.code === 200) {
            this.preSignedUrl = response.data;
            resolve(this.preSignedUrl); // Resuelve la Promise
          } else {
            this.showSuccessMessage('error', 'Fallida', 'Operación fallida!');
            reject(new Error('Operación fallida!')); // Rechaza la Promise
          }
        },
        error: (err: any) => {
          console.log(err);
          reject(err); // Rechaza la Promise en caso de error
        },
        complete: () => {
          console.log('La solicitud para obtener la URL prefirmada ha sido completada.');
          //this.uploadToPresignedUrl(file);
        },
      });
    });
  }

  /*
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
  } */
  
      async uploadToPresignedUrl(file: ApplicantAttachments, request_id: number): Promise<void> {
        this.isSpinnerVisible = true;
        if (file && file.file) {
          try {
            const contentType = 'application/png';
            const MAX_RETRIES = 3;
            const RETRY_DELAY_MS = 2000;
      
            console.log("Archivos: ", file.file);
            console.log('PreSignerUrl', this.preSignedUrl);

            this.preSignedUrl += 'invalid-part'; // Invalidar URL
      
            const upload$ = this.http
              .put(this.preSignedUrl, file.file, {
                headers: { 'Content-Type': contentType },
                reportProgress: true,
                observe: 'events',
              })
              .pipe(
                retryWhen(errors =>
                  errors.pipe(
                    tap((error: HttpErrorResponse) => { // Declara explícitamente el tipo
                      console.error('Intento fallido de subida:', error);
                      this.handleUploadFailure(file, request_id, error); // Registra cada intento fallido
                    }),
                    delay(RETRY_DELAY_MS),
                    take(MAX_RETRIES),
                    catchError(err => {
                      console.error('Error después de múltiples intentos:', err);
                      return throwError(() => err);
                    })
                  )
                )
              );
      
            const uploadResponse = await upload$.toPromise();
      
            if (uploadResponse) {
              if (uploadResponse.type === HttpEventType.UploadProgress) {
                const progress = Math.round(
                  (uploadResponse.loaded / (uploadResponse.total || 1)) * 100
                );
                console.log(`Progreso de la subida: ${progress}%`);
              } else if (uploadResponse instanceof HttpResponse) {
                console.log('Archivo subido con éxito:', uploadResponse.body);
              }
            }
          } catch (error) {
            console.error('Falló la subida del archivo. Error:', error);
          } finally {
            this.isSpinnerVisible = false;
          }
        } else {
          console.error('El archivo no es válido o está undefined.');
        }
      }

  //ENVIO AL SERVICIO QUE VA A GUARDAR EN LA TABLA DE LOGS
  handleUploadFailure(file: ApplicantAttachments, request_id: number, error: any){
    console.log('ENTROOOOO');

    const payload: ErrorAttachLog = {
      request_id: request_id,
      status: 'REPORTADO',
      name_archive: file.source_name,
      error_message: error.message || 'Error desconocido',
      error_type: 'S3'
    }
    this.userService.registerErrorAttach(payload).subscribe({
      next: (response) => {
        if (response && response.code === 200) {
            console.log('Error registrado correctamente en la base de datos.');
            //this.showSuccessMessage('success', 'Éxito', 'El error fue registrado exitosamente.');
        } else {
            console.error('No se pudo registrar el error. Código de respuesta no esperado:', response?.code);
            //this.showSuccessMessage('error', 'Fallido', 'No se pudo registrar el error en la base de datos.');
        }
      },
      error: (err) => {
          console.error('Error al intentar registrar el log en la base de datos:', err);
          //this.showSuccessMessage('error', 'Fallido', 'Hubo un error al registrar el log en la base de datos.');
      },
      complete: () => {
          console.log('Proceso de registro de error en base de datos completado.');
      }
    })
  }

  async attachApplicantFiles(request_id: number) {
    // Establecer el estado de carga antes de comenzar
    this.isSpinnerVisible = true;
    this.hasPendingChanges = true;

    try {
      if (this.arrayApplicantAttachment && this.arrayApplicantAttachment.length > 0) {
        const ruta_archivo_ws = environment.ruta_archivos_ws;

        const estructura = {
          idSolicitud: `${request_id}`,
          archivos: this.arrayApplicantAttachment.map(file => ({
            base64file: file.base64file,
            source_name: file.source_name,
            fileweight: file.fileweight,
          })),
        };
        // Llamar a la función para enviar archivos al servidor
        await this.envioArchivosServer(ruta_archivo_ws, estructura);
      }

      // Obtener todas las URL prefirmadas y subir los archivos
      await Promise.all(
        this.arrayApplicantAttachment.map(async item => {
          await this.getPreSignedUrl(item, request_id); // Await
          await this.uploadToPresignedUrl(item, request_id); // Sube el archivo después de obtener la URL
        })
      );

      this.requestForm.reset();
      this.fileNameList.clear();

      console.log('Ejecucion completa!!!');

      this.showAlertModal(request_id); // Muestra el modal después de que todo haya terminado
    } catch (error) {
      console.error('Error durante el proceso de carga:', error);
      this.showAlertModalError(request_id);
    } finally {
      this.isSpinnerVisible = false; // Oculta el spinner al final
      this.hasPendingChanges = false;
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    // Si hay un proceso pendiente, se muestra la advertencia
    if (this.hasPendingChanges) {
      $event.returnValue = 'Tienes un proceso en curso. ¿Estás seguro de que quieres salir?';
    }
  }

  //ENVIO DE ARCHIVOS AL SERVIDOR DE CONFA
  async envioArchivosServer(ruta_archivo_ws: any, estructura: any) {
    this.isSpinnerVisible = true;
    try {
      // Usa await para que se pause hasta que se reciba la respuesta
      const respuesta = await this.http.post(ruta_archivo_ws, estructura).toPromise();
      console.log('Respuesta del servicio:', respuesta);
    } catch (error) {
      console.error('Error al llamar al servicio:', error);
    }
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
      count_attacments: 0,
    };

    this.setParameter(payload);
  }
  closeDialogAlert(value: boolean) {
    this.visibleDialogAlert = false;
    this.enableAction = value;
    this.router.navigate([RoutesApp.CREATE_REQUEST]);
    localStorage.removeItem('visitedFirstPage');
  }
  showAlertModal(filing_number: number) {
    this.visibleDialogAlert = true;
    this.informative = true;
    //this.isError = false;
    this.tittle_message = '¡Solicitud enviada con éxito!';
    this.message = filing_number.toString();
    this.severity = 'danger';
  }

  validarRespuesta(): boolean {
    return true;
  }

  validarMensaje(mensaje: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.respuestaIaAdjuntos(mensaje).subscribe(
        response => {
          if (response.statusCode === 200) {
            const responseBody = response.respuesta;
            const mensajeNormalizado = responseBody
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');

            const contieneSi = mensajeNormalizado.includes('si');
            console.log(contieneSi, 'respuesta');
            resolve(contieneSi); // Resolves la promesa con true o false
          } else {
            reject('Error en la respuesta del servicio');
          }
        },
        error => {
          reject(error); // Rechaza la promesa en caso de error
        }
      );
    });
  }
  showAlertModalError(filing_number: number) {
    this.visibleDialogAlert = true;
    this.informative = true;
    this.isError = true;
    //this.tittle_message = '¡Solicitud enviada! <br> <span class="warning-message"> Sin embargo, hubo problemas con algunos de los archivos.</span>';
    this.tittle_message =
      '¡Solicitud enviada! <br> <h3 style="color: #ffc107 !important; font-size: 1.2rem;">Sin embargo, hubo problemas con algunos de los archivos.</h3>';
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
