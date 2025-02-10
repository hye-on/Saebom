interface BlankAnswerDetails {
  results: {
    blankIndex: number;
    userInput: string;
    isCorrect: boolean;
    matchedAcceptableKeywords?: string;
  }[];
  allCorrect: boolean;
}

interface DescriptiveAnswerDetails {
  similarityScore: number;
  matchedKeyPoints: string[];
  missedKeyPoints: string[];
  feedback: string;
}

export type AnswerDetails = BlankAnswerDetails | DescriptiveAnswerDetails;
