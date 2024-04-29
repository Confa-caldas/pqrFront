import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { ILogin } from '../../../models/login/login.interface';
import { BodyResponse } from '../../../models/shared/body-response.inteface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesApp } from '../../../enums/routes.enum';
import { SessionStorageItems } from '../../../enums/session-storage-items.enum';
import { jwtDecode } from 'jwt-decode';
import { ILink, ISession } from '../../../models/login/session.interface';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  ingredient!: string;
  visibleDialog = false;
  message = '';

  jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOjI2NCwidXN1YXJpbyI6ImV4dF9wcnVlYmExIiwiY29udHJhc2VuYSI6IiIsInRlbWEiOiIiLCJwbGF6YUlkIjoiIiwiZXN0YWRvIjp0cnVlLCJmZWNoYVZlbmNpbWllbnRvIjoiIiwicGVyZmlsZXMiOlt7InBlcmZpbElkIjoxMDYsInNpc3RlbWEiOnsic2lzdGVtYUlkIjo1NCwibm9tYnJlIjoiUFFSUyIsImVzdGFkbyI6dHJ1ZX0sIm5vbWJyZSI6IkZVTkNJT05BTCIsImRlc2NyaXBjaW9uIjoiIiwiZXN0YWRvIjp0cnVlfV0sImxpbmtzIjpbeyJtb2R1bG9faWQiOiIxODQiLCJtb2R1bG9Ob21icmUiOiJSRVBPUlRFUyIsIm5vbWJyZSI6IlJFUE9SVEVTIiwidXJsIjoiL3JlcG9ydGVzL3JlcG9ydGVzLnhodG1sIiwiZXN0YWRvIjp0cnVlLCJ1c3VhcmlvTGlua3MiOltdLCJwZXJmaWxMaW5rcyI6W119XSwiZXhwaXJlIjoiMjAyOS0xMC0xNiAwNjowNzowOSJ9.VlWO2rMDUZdoyG0OC5XdpFrIAL38KIH7xUvyoASGlTA';

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  userForm: FormGroup;

  login() {
    if (this.userForm.invalid) {
      return;
    }

    const payload: ILogin = {
      usuario: this.userForm.controls['usuario'].value,
      contrasena: this.userForm.controls['contrasena'].value,
      sistema: 54,
    };
    this.loginService.login(payload).subscribe({
      next: (response: BodyResponse<string>) => {
        if (response.code === 200) {
          sessionStorage.setItem(SessionStorageItems.SESSION, response.data);
          const decodedToken: ISession = jwtDecode(response.data);
          const menu: TreeNode[] = this.convertirLinks(decodedToken.links);
          sessionStorage.setItem(SessionStorageItems.USER, decodedToken.usuario);
          const perfil = decodedToken.perfiles[0].nombre;
          if (perfil) {
            sessionStorage.setItem(SessionStorageItems.PERFIL, perfil);
          }
          if (menu) {
            sessionStorage.setItem(SessionStorageItems.MENU, JSON.stringify(menu));
          }
          this.router.navigate([RoutesApp.MAIN_PAGE]);
        } else {
          this.message = response.data;
          this.visibleDialog = true;
        }
        console.log('Respuesta exitosa:', response);
      },
      error: (err: any) => {
        this.message = 'Sistema no disponible';
        this.visibleDialog = true;
      },
      complete: () => {
        console.log('La suscripción ha sido completada.');
      },
    });
  }

  convertirLinks(links: ILink[]): TreeNode[] {
    const arrayResultante: TreeNode[] = [];
    links.forEach(link => {
      if (link.perfilLinks) {
        const objetoConvertido: TreeNode = {
          key: `${link.modulo_id}-${link.moduloNombre}`,
          label: link.nombre,
          data: link.url,
          type: link.perfilLinks && link.perfilLinks.length > 0 ? 'default' : 'url',
        };

        if (link.perfilLinks && link.perfilLinks.length > 0) {
          objetoConvertido['children'] = this.convertirLinks(link.perfilLinks);
        }

        arrayResultante.push(objetoConvertido);
      }
    });
    return arrayResultante;
  }

  closeDialog() {
    this.visibleDialog = false;
  }
}
