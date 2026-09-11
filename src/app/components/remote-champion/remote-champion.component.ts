import { Component, computed, OnInit, signal } from '@angular/core';
import { CompetChampionStore } from '../../store/compet-champion.store';
import { combineLatest, of, tap } from 'rxjs';
import { CompetChampion } from '../../models/questions-super-cash.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RemoteStorageKey } from '../../models/enums/remote-storage-keys.enum';

@Component({
  selector: 'app-remote-champion.component',
  imports: [CommonModule, MatIconModule],
  templateUrl: './remote-champion.component.html',
  styleUrl: './remote-champion.component.scss',
})
export class RemoteChampionComponent implements OnInit {
  competChampion = signal<CompetChampion>({
    libelleTheme: '',
    questionsSuperCash: [],
  } as CompetChampion);
  currentOrdreQuestion = signal<number>(1);

  currentQuestion = computed(() => {
    return this.competChampion().questionsSuperCash.find(
      (qsc) => qsc.ordre === this.currentOrdreQuestion(),
    );
  });

  constructor(private competChampionStore: CompetChampionStore) {}

  ngOnInit() {
    this.competChampionStore.initCompetChampionStore();
    this.competChampionStore.questionsSuperCash$
      .pipe(
        tap((cc) => {
          this.competChampion.set(cc);
        }),
      )
      .subscribe();
  }

  changerIndex(increment: number) {
    this.currentOrdreQuestion.update((value) => {
      if (value + increment < 5 && value + increment > 0) {
        return value + increment;
      } else {
        return value;
      }
    });
  }
}
