interface KeywordAnswerDetails {
  matchedKeywords: {
    requiredKeyword: string;
    matchedWith: string; // NOTE: 유저가 실제 입력한 단어
  }[];
  missedKeywords: string[];
  matchCount: number;
  requiredCount: number;
  scorePercentage: number;
}

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

export type AnswerDetails = KeywordAnswerDetails | BlankAnswerDetails | DescriptiveAnswerDetails;
