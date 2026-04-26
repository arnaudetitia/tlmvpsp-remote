import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { CurrentQuestion } from '../../models/current-question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionCompetStore {
  currentQuestion$: Subject<CurrentQuestion> = new Subject();

  setCurrentQuestion(current: CurrentQuestion) {
    this.currentQuestion$.next(current);
  }
}
