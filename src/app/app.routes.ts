import { Routes } from '@angular/router';
import { RemoteJoueurComponent } from './components/remote-joueur/remote-joueur.component';
import { championGuard, joueurGuard } from './guard/joueur.guard';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RemoteChampionComponent } from './components/remote-champion/remote-champion.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'play', component: RemoteJoueurComponent, canActivate: [joueurGuard] },
  {
    path: 'champion',
    component: RemoteChampionComponent,
    canActivate: [championGuard],
  },
];
