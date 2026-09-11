import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { CompetChampion } from '../models/questions-super-cash.model';
import { RemoteStorageKey } from '../models/enums/remote-storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class CompetChampionStore {
  questionsSuperCash$: Subject<CompetChampion> = new ReplaySubject<CompetChampion>(1);

  initCompetChampionStore() {
    const competChampionFromStore = localStorage.getItem(RemoteStorageKey.COMPET_CHAMPION);
    if (!competChampionFromStore) {
      return;
    }

    try {
      this.setCompetChampion(JSON.parse(competChampionFromStore));
    } catch (error) {
      localStorage.removeItem(RemoteStorageKey.COMPET_CHAMPION);
    }
  }

  setCompetChampion(competChampion: CompetChampion) {
    this.questionsSuperCash$.next(competChampion);
  }
}
