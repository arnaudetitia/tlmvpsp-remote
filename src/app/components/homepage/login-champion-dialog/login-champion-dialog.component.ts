import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { JoueurCompetService } from '../../../service/joueurs-compet.service';
import { catchError, of, tap } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RemoteStorageKey } from '../../../models/enums/remote-storage-keys.enum';
import moment from 'moment';
import { CompetChampionStore } from '../../../store/compet-champion.store';

@Component({
  selector: 'app-login-champion-dialog.component',
  imports: [FormsModule, MatDialogTitle, MatDialogContent],
  templateUrl: './login-champion-dialog.component.html',
  styleUrl: './login-champion-dialog.component.scss',
})
export class LoginChampionDialogComponent {
  readonly dialogRef = inject(MatDialogRef<LoginChampionDialogComponent>);
  readonly router = inject(Router);
  appCodeChampion: string = '';
  error = signal<string | null>(null);

  constructor(
    private joueurCompetService: JoueurCompetService,
    private competChampionStore: CompetChampionStore,
  ) {}

  connectChampion() {
    this.error.set(null);
    this.joueurCompetService
      .checkCodeChampion(this.appCodeChampion)
      .pipe(
        tap((result) => {
          this.competChampionStore.setCompetChampion(result);
          localStorage.setItem(RemoteStorageKey.CHAMPION_AUTH, 'true');
          localStorage.setItem(
            RemoteStorageKey.DATE_EXPIRATION,
            moment().add(1, 'days').startOf('day').toISOString(),
          );
          this.dialogRef.close(true);
        }),
        catchError((error) => {
          this.error.set(error.error.error);
          return of();
        }),
      )
      .subscribe();
  }
}
