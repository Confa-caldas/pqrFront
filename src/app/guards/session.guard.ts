import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { RoutesApp } from '../enums/routes.enum';

export const sessionGuard: CanActivateFn = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const isLoggedIn = loginService.isLoggedIn();
  if (!isLoggedIn) router.navigate([RoutesApp.LOGIN]);

  return true;
};
