import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { VotesStore } from '../store/votes.store';
import { QuestionCompetStore } from '../store/question-compet.store';

@Injectable({ providedIn: 'root' })
export class SocketService {
  public socket: Socket | undefined;

  constructor(
    private questionCompetStore: QuestionCompetStore,
    private votesStore: VotesStore,
  ) {
    this.socket = io(environment.socketUrl, {
      transports: ['websocket'],
      upgrade: false,
    });

    this.socket.on('nouvelle-question', (data) => {
      this.questionCompetStore.setCurrentQuestion({
        question: data.question,
        reponsesDisplay: data.reponsesDisplay,
      });
    });

    this.socket.on('afficher-reponses-remote', () => {
      this.votesStore.openVotes();
    });

    this.socket.on('close-votes', () => {
      this.votesStore.closeVotes();
    });

    this.socket.on('freeze-votes', () => {
      this.votesStore.freezeVote();
    });
  }
}
