import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VotesStore {
  votesOpen$: Subject<boolean> = new Subject();
  votesFrozen$: Subject<void> = new Subject();

  openVotes() {
    this.votesOpen$.next(true);
  }

  closeVotes() {
    this.votesOpen$.next(false);
  }

  freezeVote() {
    this.votesFrozen$.next();
  }
}
