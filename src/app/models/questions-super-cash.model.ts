export interface CompetChampion {
  libelleTheme: string;
  questionsSuperCash: QuestionSuperCash[];
}

interface QuestionSuperCash {
  question: string;
  bonneReponse: string;
  ordre: number;
}
