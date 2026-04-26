import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { JoueurCompetService } from '../../service/joueurs-compet.service';
import { io, Socket } from 'socket.io-client';
import { QuestionCompetService } from '../../service/question-compet.service';
import { take, tap } from 'rxjs';
import { SocketService } from '../../service/socket.service';
import { QuestionCompetStore } from '../store/question-compet.store';
import { VotesStore } from '../store/votes.store';

@Component({
  selector: 'app-remote-joueur',
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './remote-joueur.component.html',
  styleUrls: ['./remote-joueur.component.scss'],
})
export class RemoteJoueurComponent implements OnInit, OnDestroy {
  joueur: string | null = '';
  reponseCashJoueur = '';
  question: string = '';
  showQuestion = false;
  reponsesDisplay: string[] = [];
  reponseAEnvoyer: string = '';
  showReponses: boolean = false;
  reponseSelected: boolean = false;
  votesFrozen: boolean = false;

  constructor(
    private socketService: SocketService,
    private joueurCompetService: JoueurCompetService,
    private questionCompetService: QuestionCompetService,
    private questionCompetStore: QuestionCompetStore,
    private votesStore: VotesStore,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.joueur = localStorage.getItem('joueur');

    this.questionCompetStore.currentQuestion$
      .pipe(
        tap((questionCompet) => {
          this.question = questionCompet.question;
          this.reponsesDisplay = questionCompet.reponsesDisplay;
          this.showReponses = false;
          this.votesFrozen = false;
          this.reponseCashJoueur = '';
          this.reponseAEnvoyer = '';
          this.cdr.detectChanges();
        }),
      )
      .subscribe();

    this.votesStore.votesOpen$
      .pipe(
        tap((statusVotes) => {
          this.showQuestion = statusVotes;
          this.showReponses = statusVotes;
          this.reponseSelected = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe();

    this.votesStore.votesFrozen$
      .pipe(
        tap(() => {
          this.votesFrozen = true;
          this.cdr.detectChanges();
        }),
      )
      .subscribe();

    this.questionCompetService
      .getCurrentQuestionCompet()
      .pipe(
        take(1),
        tap((currentQuestion: any) => {
          this.question = currentQuestion[0].question;
          this.reponsesDisplay = currentQuestion[0].reponsesDisplay;
          this.reponseAEnvoyer = '';
        }),
      )
      .subscribe();
  }

  envoyerReponse(reponse?: string) {
    if (this.joueur && !this.reponseSelected && !this.votesFrozen) {
      this.reponseAEnvoyer = reponse || this.reponseCashJoueur;
      this.joueurCompetService.envoyerReponseJoueur(this.joueur, this.reponseAEnvoyer).subscribe();
      this.reponseSelected = true;
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('joueur');
  }
}
