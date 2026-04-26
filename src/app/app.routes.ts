import { Routes } from '@angular/router';
import { SelectionJoueurComponent } from './components/selection-joueur/selection-joueur.component';
import { RemoteJoueurComponent } from './components/remote-joueur/remote-joueur.component';
import { haveToConnectGuard, joueurGuard } from './components/guard/joueur.guard';

export const routes: Routes = [
  { path: '', component: SelectionJoueurComponent, canActivate: [haveToConnectGuard] },
  { path: 'play', component: RemoteJoueurComponent, canActivate: [joueurGuard] },
];
