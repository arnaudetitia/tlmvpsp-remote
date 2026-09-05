import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectJoueurDialogComponent } from './connect-joueur/connect-joueur-dialog.component';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  connectJoueurDialog = inject(MatDialog);

  constructor(private router: Router) {}

  openConnectJoueurDialog() {
    const connectJoueurDialog = this.connectJoueurDialog.open(ConnectJoueurDialogComponent, {
      width: '90vw',
      disableClose: false,
    });

    connectJoueurDialog
      .afterClosed()
      .pipe(
        tap(() => {
          this.router.navigate(['/play']);
        }),
      )
      .subscribe();
  }
}
