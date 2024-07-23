import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryList, ModalityList } from '../../../models/users.interface';
import { Users } from '../../../services/users.service';
import { BodyResponse } from '../../../models/shared/body-response.inteface';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrl: './modal-category.component.scss',
})
export class ModalCategoryComponent implements OnInit {
  @Input() login = false;
  @Input() select = false;
  @Input() message = '';
  @Input() buttonmsg = '';
  @Input() visible: boolean = false;
  @Input() read_only: boolean = false;
  @Input() categoryForm?: CategoryList;
  @Output() setRta = new EventEmitter<boolean>();
  @Output() setRtaParameter = new EventEmitter<CategoryList>();

  inputValue: string[] = [''];
  modalityList!: ModalityList[];

  //formGroup: FormGroup;

  constructor(
    private userService: Users,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = new FormGroup({
      category_id: new FormControl(null, [Validators.required]),
      category_name: new FormControl(null, [Validators.required]),
      tipology_name: new FormControl(null, [Validators.required]),
      cause_name: new FormControl(null),
      modality_id: new FormControl(null, [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.getModalityTable();
    if (this.buttonmsg !== 'Crear' && this.categoryForm) {
      this.formGroup.patchValue(this.categoryForm);
    } else {
      this.formGroup.reset();
    }
    this.formGroup.get('category_id')?.addValidators(Validators.pattern('^[0-9]+$'));
    this.formGroup.get('category_name')?.addValidators(Validators.pattern('^[^#$%&]+$'));
    this.formGroup.get('tipology_name')?.addValidators(Validators.pattern('^[^#$%&]+$'));
    this.formGroup.get('cause_name')?.addValidators(Validators.pattern('^[^#$%&]+$'));
  }

  formGroup: FormGroup<any> = new FormGroup<any>({});
  showDialog() {
    this.visible = true;
  }
  getModalityTable() {
    this.userService.getModalityList().subscribe({
      next: (response: BodyResponse<ModalityList[]>) => {
        if (response.code === 200) {
          this.modalityList = response.data.filter(obj => obj.is_active !== 0);
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

  closeDialog(value: boolean) {
    this.setRta.emit(value);
    const payload: CategoryList = {
      category_id: this.formGroup.controls['category_id'].value,
      category_name: this.formGroup.controls['category_name'].value,
      tipology_name: this.formGroup.controls['tipology_name'].value,
      cause_name: this.formGroup.controls['cause_name'].value,
      modality_id: this.formGroup.controls['modality_id'].value,
    };
    this.setRtaParameter.emit(payload);
    this.visible = false;
  }
}
