import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectJoueurDialogComponent } from './connect-joueur/connect-joueur-dialog.component';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginChampionDialogComponent } from './login-champion-dialog/login-champion-dialog.component';
import { RemoteStorageKey } from '../../models/enums/remote-storage-keys.enum';
import { CompetChampion } from '../../models/questions-super-cash.model';
import { CompetChampionStore } from '../../store/compet-champion.store';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  connectJoueurDialog = inject(MatDialog);
  loginChampionDialog = inject(MatDialog);

  constructor(
    private competChampionStore: CompetChampionStore,
    private router: Router,
  ) {}

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
    const competChampionFromStore = localStorage.getItem(RemoteStorageKey.COMPET_CHAMPION);
    if (competChampionFromStore) {
      const competChampion: CompetChampion = JSON.parse(competChampionFromStore);
      this.competChampionStore.setCompetChampion(competChampion);
      this.router.navigate(['/champion']);
      return;
    }
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
