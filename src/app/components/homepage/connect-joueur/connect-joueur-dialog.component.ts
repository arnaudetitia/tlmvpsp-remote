import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { JoueurCompetService } from '../../../service/joueurs-compet.service';
import { Observable, of, tap } from 'rxjs';
import { JoueurCompet } from '../../../models/joueur-compet';
import { MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { RemoteStorageKey } from '../../../models/enums/remote-storage-keys.enum';
import { HomepageComponent } from '../homepage.component';

@Component({
  selector: 'app-connect-joueur.dialog',
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatGridList, MatGridTile],
  templateUrl: './connect-joueur-dialog.component.html',
  styleUrl: './connect-joueur-dialog.component.scss',
})
export class ConnectJoueurDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<HomepageComponent>);
  joueursCompet$: Observable<JoueurCompet[]> = of([]);
  isPortrait = signal(false);

  constructor(private joueurCompetService: JoueurCompetService) {}

  ngOnInit(): void {
    this.joueursCompet$ = this.joueurCompetService.getJoueursCompet();
    this.updateOrientation();
  }

  connectJoueur(joueur: JoueurCompet) {
    this.joueurCompetService
      .connectJoueur(joueur.nomJoueur)
      .pipe(
        tap(() => {
          localStorage.setItem(RemoteStorageKey.NOM_JOUEUR, joueur.nomJoueur);
          localStorage.setItem(
            RemoteStorageKey.DATE_EXPIRATION,
            moment().add(1, 'days').startOf('day').toISOString(),
          );
          this.dialogRef.close();
        }),
      )
      .subscribe();
  }

  @HostListener('window:resize')
  updateOrientation(): void {
    this.isPortrait.set(window.innerHeight >= window.innerWidth);
  }
}
