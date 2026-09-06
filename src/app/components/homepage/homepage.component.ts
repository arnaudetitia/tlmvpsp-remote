import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectJoueurDialogComponent } from './connect-joueur/connect-joueur-dialog.component';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginChampionDialogComponent } from './login-champion-dialog/login-champion-dialog.component';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  connectJoueurDialog = inject(MatDialog);
  loginChampionDialog = inject(MatDialog);

  constructor(private router: Router) {}

  openConnectJoueurDialog() {
    const connectJoueurDialog = this.connectJoueurDialog.open(ConnectJoueurDialogComponent, {
      width: '75vw',
      disableClose: false,
    });

    connectJoueurDialog
      .afterClosed()
      .pipe(
        tap(() => {
          this.router.navigate(['/play']);
        }),
      )
      .subscribe();
  }

  openLoginChampionDialog() {
    const loginChampionDialog = this.loginChampionDialog.open(LoginChampionDialogComponent, {
      width: '75vw',
      disableClose: false,
    });

    loginChampionDialog
      .afterClosed()
      .pipe(
        tap((success) => {
          if (success) {
            this.router.navigate(['/champion']);
          }
        }),
      )
      .subscribe();
  }
}
