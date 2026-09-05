import { Routes } from '@angular/router';
import { RemoteJoueurComponent } from './components/remote-joueur/remote-joueur.component';
import { haveToConnectGuard, joueurGuard } from './guard/joueur.guard';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'play', component: RemoteJoueurComponent, canActivate: [joueurGuard] },
];
