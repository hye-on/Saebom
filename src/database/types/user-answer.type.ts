interface BlankUserAnswer {
  blanks: string[];
}

interface DescriptiveUserAnswer {
  text: string;
}

export type UserAnswer = BlankUserAnswer | DescriptiveUserAnswer;
