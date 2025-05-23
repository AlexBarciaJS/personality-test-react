import { useMemo } from "react";
import type { QuestionProps } from "../../types";
import "./Question.css";

// Utility para mezclar un array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function Question({
  questionsData,
  selectedAnswers,
  handleClick,
}: QuestionProps) {
  // Memoize all shuffled answers for each question
  const shuffledAnswersList = useMemo(
    () => questionsData.map((element) => shuffleArray(element.answers)),
    [questionsData]
  );

  return (
    <>
      {questionsData.map((element, questionIndex) => {
        const shuffledAnswers = shuffledAnswersList[questionIndex];

        return (
          <div className="question" key={questionIndex}>
            <h5 className="question-title">
              <span className="question-index">{questionIndex + 1}</span>
              <span>{element.question}</span>
            </h5>
            <div className="answer">
              {shuffledAnswers.map((ans, answerIndex) => (
                <button
                  key={answerIndex}
                  onClick={() => handleClick(questionIndex, ans.value - 1)}
                  type="button"
                  className={`btn btn-light ${
                    selectedAnswers[questionIndex] === ans.value - 1
                      ? "active"
                      : ""
                  }`}
                >
                  {ans.answer}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Question;
