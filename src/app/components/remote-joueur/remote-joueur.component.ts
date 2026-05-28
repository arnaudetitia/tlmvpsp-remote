import { ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { JoueurCompetService } from '../../service/joueurs-compet.service';
import { QuestionCompetService } from '../../service/question-compet.service';
import { take, tap } from 'rxjs';
import { SocketService } from '../../service/socket.service';
import { VotesStore } from '../../store/votes.store';
import { QuestionCompetStore } from '../../store/question-compet.store';
import { RemoteStorageKey } from '../../models/enums/remote-storage-keys.enum';

@Component({
  selector: 'app-remote-joueur',
  imports: [FormsModule, MatButtonModule],
  templateUrl: './remote-joueur.component.html',
  styleUrls: ['./remote-joueur.component.scss'],
})
export class RemoteJoueurComponent implements OnInit, OnDestroy {
  joueur: string | null = '';
  reponseCashJoueur = '';
  question = signal<string>('');
  showQuestion = signal<boolean>(false);
  reponsesDisplay = signal<string[]>([]);
  reponseAEnvoyer = signal<string>('');
  showReponses = signal<boolean>(false);
  reponseSelected = signal<boolean>(false);
  votesFrozen = signal<boolean>(false);

  constructor(
    private socketService: SocketService,
    private joueurCompetService: JoueurCompetService,
    private questionCompetService: QuestionCompetService,
    private questionCompetStore: QuestionCompetStore,
    private votesStore: VotesStore,
  ) {}

  ngOnInit(): void {
    this.joueur = localStorage.getItem(RemoteStorageKey.NOM_JOUEUR);

    this.questionCompetStore.currentQuestion$
      .pipe(
        tap((questionCompet) => {
          this.question.set(questionCompet.question);
          this.reponsesDisplay.set(questionCompet.reponsesDisplay);
          this.showQuestion.set(false);
          this.showReponses.set(false);
          this.votesFrozen.set(false);
          this.reponseCashJoueur = '';
          this.reponseAEnvoyer.set('');
        }),
      )
      .subscribe();

    this.votesStore.votesOpen$
      .pipe(
        tap((statusVotes) => {
          this.showQuestion.set(statusVotes);
          this.showReponses.set(statusVotes);
          this.votesFrozen.set(false);
          this.reponseSelected.set(false);
        }),
      )
      .subscribe();

    this.votesStore.votesFrozen$
      .pipe(
        tap(() => {
          this.votesFrozen.set(true);
        }),
      )
      .subscribe();

    this.questionCompetService
      .getCurrentQuestionCompet()
      .pipe(
        take(1),
        tap((currentQuestion: any) => {
          this.question.set(currentQuestion[0].question);
          this.reponsesDisplay.set(currentQuestion[0].reponsesDisplay);
          this.reponseAEnvoyer.set('');
        }),
      )
      .subscribe();
  }

  envoyerReponse(reponse?: string) {
    if (this.joueur && !this.reponseSelected() && !this.votesFrozen()) {
      this.reponseAEnvoyer.set(reponse || this.reponseCashJoueur);
      this.joueurCompetService
        .envoyerReponseJoueur(this.joueur, this.reponseAEnvoyer())
        .subscribe();
      this.reponseSelected.set(true);
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('joueur');
  }
}
