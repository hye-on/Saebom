interface KeywordUserAnswer {
  keywords: string[];
}

interface BlankUserAnswer {
  blanks: string[];
}

interface DescriptiveUserAnswer {
  text: string;
}

export type UserAnswer = KeywordUserAnswer | BlankUserAnswer | DescriptiveUserAnswer;
