import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionCompetService {
  constructor(private httpService: HttpClient) {}

  getCurrentQuestionCompet(): Observable<any> {
    return this.httpService.get(environment.apiUrl + '/compet/question/current');
  }
}
