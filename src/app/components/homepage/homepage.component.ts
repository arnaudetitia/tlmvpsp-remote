import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectJoueurDialogComponent } from './connect-joueur/connect-joueur-dialog.component';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginChampionDialogComponent } from './login-champion-dialog/login-champion-dialog.component';
import { RemoteStorageKey } from '../../models/enums/remote-storage-keys.enum';
import { CompetChampion } from '../../models/questions-super-cash.model';
import { CompetChampionStore } from '../../store/compet-champion.store';
import { JoueurCompetService } from '../../service/joueurs-compet.service';
import { JoueurCompet } from '../../models/joueur-compet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  connectJoueurDialog = inject(MatDialog);
  loginChampionDialog = inject(MatDialog);

  joueursCompet = signal<JoueurCompet[]>([]);

  canConnecterJoueur = computed(() => {
    return this.joueursCompet().length > 0;
  });

  constructor(
    private competChampionStore: CompetChampionStore,
    private joueurCompetService: JoueurCompetService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.joueurCompetService
      .getJoueursCompet()
      .pipe(
        tap((joueurs) => {
          this.joueursCompet.set(joueurs);
        }),
      )
      .subscribe();
  }

  openConnectJoueurDialog() {
    const connectJoueurDialog = this.connectJoueurDialog.open(ConnectJoueurDialogComponent, {
      width: '75vw',
      disableClose: false,
      data: {
        joueursCompet: this.joueursCompet(),
      },
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
