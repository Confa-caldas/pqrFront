import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryList, ModalityList } from '../../../models/users.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-modality',
  templateUrl: './modal-modality.component.html',
  styleUrl: './modal-modality.component.scss',
})
export class ModalModalityComponent implements OnInit {
  @Input() login = false;
  @Input() select = false;
  @Input() message = '';
  @Input() buttonmsg = '';
  @Input() visible: boolean = false;
  @Input() read_only: boolean = false;
  @Input() modalityForm?: ModalityList;
  @Output() setRta = new EventEmitter<boolean>();
  @Output() setRtaParameter = new EventEmitter<ModalityList>();
  inputValue: string[] = [''];

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      modality_id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      modality_name: ['', [Validators.required, Validators.pattern('^[^#$%&+-/*]+$')]],
    });
  }
  ngOnInit(): void {
    if (this.buttonmsg != 'Crear' && this.modalityForm) {
      this.formGroup.patchValue(this.modalityForm);
    } else {
      this.formGroup.reset();
    }
  }

  formGroup: FormGroup<any> = new FormGroup<any>({});
  showDialog() {
    this.visible = true;
  }

  closeDialog(value: boolean) {
    this.setRta.emit(value);
    const payload: ModalityList = {
      modality_id: this.formGroup.controls['modality_id'].value,
      modality_name: this.formGroup.controls['modality_name'].value,
    };
    this.setRtaParameter.emit(payload);
    this.visible = false;
  }
}
