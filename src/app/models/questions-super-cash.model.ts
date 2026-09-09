export interface CompetChampion {
  libelleTheme: string;
  questionsSuperCash: QuestionSuperCash[];
}

interface QuestionSuperCash {
  question: string;
  bonne_reponse: string;
  ordre: number;
}
