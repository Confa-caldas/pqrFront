import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from './services/login.service';
import { SessionStorageItems } from './enums/session-storage-items.enum';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Confa';
  isSpinnerVisible = false;

  currentDate = new Date();
  expirationDate = new Date();
  minutesInactive = environment.minutesInactive;
  requiresAuthentication = true;
  currentComponent: string = '';
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private _loginService: LoginService
  ) {
    this.runTimer();
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentComponent = this.getCurrentComponent(event.urlAfterRedirects);
      });
    this.spinner?.spinnerObservable.subscribe(response => {
      this.isSpinnerVisible = response?.show;
    });
  }
  getCurrentComponent(url: string): string {
    if (url == '/request-form' || url == '/create-request') {
      this.requiresAuthentication = false;
    } else {
      this.requiresAuthentication = true;
    }
    return url.split('/')[1] || 'Unknown';
  }

  @HostListener('window:mousemove', ['$event'])
  refreshUserState() {
    this.expirationDate = new Date();
    // Le resta 5 minutos a la fecha de expiración
    this.expirationDate.setTime(this.expirationDate.getTime() + this.minutesInactive * 60 * 1000);
  }

  runTimer() {
    if (this.requiresAuthentication) {
      const sleep = (milliseconds: any) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
      };

      sleep(30000).then(() => {
        this.validateInactive();
        this.validateToken();
      });
    }
  }

  validateInactive() {
    if (this.requiresAuthentication) {
      this.currentDate = new Date();
      if (this.currentDate >= this.expirationDate) {
        this._loginService.logout();
      }
      this.runTimer();
    }
  }

  validateToken() {
    if (this.requiresAuthentication) {
      if (this._loginService.isLoggedIn()) {
        if (this._loginService.checkToken()) {
          this._loginService.refreshToken(this._loginService.getToken()).subscribe(response => {
            sessionStorage.setItem(SessionStorageItems.SESSION, response.data);
          });
        }
      }
    }
  }
}
