import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-input',
  templateUrl: './modal-input.component.html',
  styleUrl: './modal-input.component.scss',
})
export class ModalInputComponent implements OnInit {
  @Input() login = false;
  @Input() select = false;
  @Input() message = '';
  @Input() buttonmsg = '';
  @Input() parameter = [''];
  @Input() visible: boolean = false;
  @Input() oneField: boolean = false;
  @Input() inputForm: string[] = [];
  @Output() setRta = new EventEmitter<boolean>();
  @Output() setRtaParameter = new EventEmitter<string[]>();
  inputValue1: string = '';
  inputValue2: string = '';
  inputValue: string[] = [''];
  showDialog() {
    this.visible = true;
  }
  formGroup: FormGroup<any> = new FormGroup<any>({});

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      inputValue1: ['', [Validators.required, Validators.pattern('^[^#$%&]+$')]],
      inputValue2: ['', [Validators.required, Validators.pattern('^[^#$%&]+$')]],
    });
  }
  ngOnInit(): void {
    if (this.buttonmsg != 'Crear') {
      this.formGroup.setValue({
        inputValue1: this.inputForm[0],
        inputValue2: this.inputForm[1],
      });
    } else {
      this.formGroup.reset();
    }
  }

  closeDialog(value: boolean) {
    this.setRta.emit(value);
    if (this.inputForm.length > 0) {
      this.inputValue = [
        this.formGroup.controls['inputValue1'].value,
        this.formGroup.controls['inputValue2'].value,
        this.inputForm[2],
      ];
    } else {
      this.inputValue = [
        this.formGroup.controls['inputValue1'].value,
        this.formGroup.controls['inputValue2'].value,
      ];
    }
    this.setRtaParameter.emit(this.inputValue);
    this.visible = false;
  }
}
