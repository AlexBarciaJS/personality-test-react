export interface QuestionProps {
  questionsData: {
    question: string;
    answers: {
      answer: string;
      value: number;
    }[];
  }[];
  selectedAnswers: selectedAnswerType;
  handleClick: (questionIdx: number, answerIdx: number) => void;
}

export type selectedAnswerType = Record<number, number>;

export interface ResultProps {
  selectedAnswers: selectedAnswerType;
  totalQuestions: number;
}

export type AnswerColor = "red" | "yellow" | "blue" | "green" | "white";
export const answersColors: Record<number, AnswerColor> = {
  1: "red",
  2: "yellow",
  3: "blue",
  4: "green",
};

export interface Personality {
  percent: number;
  color: "red" | "yellow" | "blue" | "green" | "white";
}

export interface answerFrecuencyType {
  count: number;
  value: number;
}
