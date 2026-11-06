import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartieService {
  constructor(private httpService: HttpClient) {}

  checkIfPartieEnCours(): Observable<any> {
    return this.httpService.get<any>(environment.apiUrl + '/compet/is-partie-en-cours');
  }
}
