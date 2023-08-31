export type Question = {
  id: number;
  question: string;
  choices: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
};

export type Answer = {
  question: Question;
  answer: number;
  time: number;
};
