import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestsList, UserList } from '../../../models/users.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../../services/users.service';
import { BodyResponse } from '../../../models/shared/body-response.inteface';

@Component({
  selector: 'app-modal-assign-selector',
  templateUrl: './modal-assign-selector.component.html',
  styleUrl: './modal-assign-selector.component.scss',
})
export class ModalAssignSelectorComponent implements OnInit {
  @Input() message = '';
  @Input() buttonmsg = '';
  @Input() parameter = [''];
  @Input() visible: boolean = false;
  @Output() setRta = new EventEmitter<boolean>();
  @Output() setRtaParameter = new EventEmitter<any>();
  userList: UserList[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: Users
  ) {
    this.formGroup = this.formBuilder.group({
      selectedUser: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getUsersTable();
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

  formGroup: FormGroup<any> = new FormGroup<any>({});
  showDialog() {
    this.visible = true;
  }

  closeDialog(value: boolean) {
    this.setRta.emit(value);
    const selectedUser = this.formGroup.controls['selectedUser'].value;
    const userName = selectedUser?.user_name || '';
    const userNameCompleted = selectedUser?.user_name_completed || '';
    this.setRtaParameter.emit({ userName, userNameCompleted });
    this.visible = false;
  }
}
