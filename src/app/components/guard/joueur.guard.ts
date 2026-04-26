import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const joueurGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('joueur')) {
    return true;
  } else {
    return router.parseUrl('/');
  }
};

export const haveToConnectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (!localStorage.getItem('joueur')) {
    return true;
  } else {
    return router.parseUrl('/play');
  }
};
