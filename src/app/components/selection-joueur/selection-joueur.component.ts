import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Observable, of, tap } from 'rxjs';
import { JoueurCompet } from '../../models/joueur-compet';
import { JoueurCompetService } from '../../service/joueurs-compet.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
          tap((res) => {
            localStorage.setItem('joueur', joueur.nomJoueur);
            this.router.navigate(['play']);
          }),
        )
        .subscribe();
    }
  }
}
