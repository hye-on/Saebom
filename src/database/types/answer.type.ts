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

export type ProblemAnswer = BlankAnswer | DescriptiveAnswer;
