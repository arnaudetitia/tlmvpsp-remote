import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { CompetChampion } from '../models/questions-super-cash.model';

@Injectable({
  providedIn: 'root',
})
export class CompetChampionStore {
  questionsSuperCash$: Subject<CompetChampion> = new ReplaySubject();

  setCompetChampion(competChampion: CompetChampion) {
    this.questionsSuperCash$.next(competChampion);
  }
}
