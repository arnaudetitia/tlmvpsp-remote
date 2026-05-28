import { Component, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { JoueurCompet } from '../../models/joueur-compet';
import { JoueurCompetService } from '../../service/joueurs-compet.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RemoteStorageKey } from '../../models/enums/remote-storage-keys.enum';
import moment from 'moment';

@Component({
  selector: 'app-selection-joueur',
  imports: [CommonModule],
  templateUrl: './selection-joueur.component.html',
  styleUrls: ['./selection-joueur.component.scss'],
})
export class SelectionJoueurComponent implements OnInit {
  joueursCompet$: Observable<JoueurCompet[]> = of([]);

  constructor(
    private joueurCompetService: JoueurCompetService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.joueursCompet$ = this.joueurCompetService.getJoueursCompet();
  }

  connectJoueur(joueur: JoueurCompet) {
    if (!joueur.connected) {
      this.joueurCompetService
        .connectJoueur(joueur.nomJoueur)
        .pipe(
          tap(() => {
            localStorage.setItem(RemoteStorageKey.NOM_JOUEUR, joueur.nomJoueur);
            localStorage.setItem(
              RemoteStorageKey.DATE_EXPIRATION,
              moment().add(1, 'days').startOf('day').toISOString(),
            );
            this.router.navigate(['play']);
          }),
        )
        .subscribe();
    }
  }
}
