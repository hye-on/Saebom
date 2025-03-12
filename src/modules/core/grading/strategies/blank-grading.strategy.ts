import { Injectable } from '@nestjs/common';
import { GradingStrategy } from '../grading-strategy.interface';
import { ProblemAnswer, UserAnswer, AnswerDetails } from '@src/database/types';

@Injectable()
export class BlankGradingStrategy implements GradingStrategy {
  grade(problemAnswer: ProblemAnswer, userAnswer: UserAnswer): AnswerDetails {
    if (!('blanks' in userAnswer) || !('blanks' in problemAnswer)) {
      throw new Error('Invalid answer format for blank grading');
    }

    const results = problemAnswer.blanks.map((blank, index) => {
      const userInput = userAnswer.blanks[index] || '';
      const isExactMatch = userInput === blank.correctAnswer;

      let matchedAcceptableKeywords: string | undefined = undefined;
      let isCorrect = isExactMatch;

      if (!isExactMatch && blank.acceptableKeywords) {
        matchedAcceptableKeywords = blank.acceptableKeywords.find(keyword => userInput.includes(keyword));
        isCorrect = matchedAcceptableKeywords !== undefined;
      }

      return {
        blankIndex: index,
        userInput,
        isCorrect,
        matchedAcceptableKeywords,
      };
    });

    const allCorrect = results.every(result => result.isCorrect);

    const result: AnswerDetails = {
      results,
      allCorrect,
    };

    return result;
  }
}
