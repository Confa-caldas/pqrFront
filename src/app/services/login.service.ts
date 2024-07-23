import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BodyResponse } from '../models/shared/body-response.inteface';
import { ILogin } from '../models/login/login.interface';
import { EndPointRoute, RoutesApp } from '../enums/routes.enum';
import { SessionStorageItems } from '../enums/session-storage-items.enum';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(payload: ILogin) {
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${RoutesApp.LOGIN}`,
      payload
    );
  }

  isLoggedIn() {
    const sessionToken = sessionStorage.getItem(SessionStorageItems.SESSION);
    return sessionToken ? true : false;
  }

  getToken(): string {
    const sessionToken = sessionStorage.getItem(SessionStorageItems.SESSION);
    return sessionToken || '';
  }

  public checkToken(): boolean {
    const authToken = sessionStorage.getItem(SessionStorageItems.SESSION);
    const isExpired = helper.isTokenExpired(authToken);
    if (isExpired) {
      return true;
      // this._alertService.littleAlertInfo('Su sesión ha expirado.');
      // this.logout();
    } else {
      return false;
    }
    return false;
  }

  logout(): void {
    // Eliminar información de autenticación (por ejemplo, token)
    sessionStorage.clear();
    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

  refreshToken(token: string) {
    /*const token = 'Bearer ' + sessionStorage.getItem(SessionStorageItems.SESSION);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token || '',
    });*/
    const payload = {
      token: token,
    };
    return this.http.post<BodyResponse<string>>(
      `${environment.API_PUBLIC}${EndPointRoute.REFRESH_TOKEN}`,
      payload
    );
  }
}
