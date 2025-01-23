interface KeywordAnswer {
  keywords: {
    requiredKeyword: string;
    acceptableKeywords?: string[];
  }[];
  requiredCount: number;
  exampleAnswer: string;
}

interface BlankAnswer {
  blanks: {
    correctAnswer: string;
    acceptableKeywords?: string[];
  }[];
  exampleAnswer: string;
}

interface DescriptiveAnswer {
  exampleAnswer: string;
  keyPoints: string[];
  similarityThreshold: number;
}

export type ProblemAnswer = KeywordAnswer | BlankAnswer | DescriptiveAnswer;
