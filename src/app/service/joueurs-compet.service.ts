import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { JoueurCompet } from '../models/joueur-compet';
import { Observable, ObservedValueOf, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JoueurCompetService {
  constructor(private httpService: HttpClient) {}

  getJoueursCompet(): Observable<JoueurCompet[]> {
    return this.httpService.get<JoueurCompet[]>(environment.apiUrl + '/compet/joueurs');
  }

  connectJoueur(nomJoueur: any): Observable<any> {
    return this.httpService.put(environment.apiUrl + '/compet/joueurs', {
      nomJoueur,
    });
  }

  envoyerReponseJoueur(joueur: string, reponse: string): Observable<any> {
    return this.httpService.put(environment.apiUrl + '/compet/joueur/reponse', {
      joueur,
      reponse,
    });
  }

  checkCodeChampion(appCodeChampion: string): Observable<any> {
    return this.httpService.put(environment.apiUrl + '/compet/champion/check', { appCodeChampion });
  }
}
