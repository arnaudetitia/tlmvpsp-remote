import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VotesStore {
  votesOpen$: Subject<boolean> = new Subject();
  votesFrozen$: Subject<void> = new Subject();
  superCash$: Subject<boolean> = new Subject();

  openVotes() {
    this.votesOpen$.next(true);
  }

  closeVotes() {
    this.votesOpen$.next(false);
  }

  freezeVote() {
    this.votesFrozen$.next();
  }

  switchToDebutSuperCash() {
    this.superCash$.next(true);
  }
}
