import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RemoteStorageKey } from '../models/enums/remote-storage-keys.enum';
import moment from 'moment';

export const joueurGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem(RemoteStorageKey.NOM_JOUEUR) && !isExpired()) {
    return true;
  } else {
    return router.parseUrl('/');
  }
};

export const haveToConnectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (!localStorage.getItem(RemoteStorageKey.NOM_JOUEUR) || isExpired()) {
    return true;
  } else {
    return router.parseUrl('/play');
  }
};

const isExpired: () => boolean = () => {
  const dateExpirationString = localStorage.getItem(RemoteStorageKey.DATE_EXPIRATION);

  if (!dateExpirationString) {
    localStorage.clear();
    return true;
  }

  const dateExpiration = moment(dateExpirationString);
  const dateCourante = moment();

  if (dateCourante.isAfter(dateExpiration)) {
    localStorage.clear();
    return true;
  }

  return false;
};
