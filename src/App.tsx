import Question from "./components/Question";
import type { selectedAnswerType } from "./types/index.ts";
import questionsEsp from "./data/questions_personality.json";
import Result from "./components/Result";
import { useState } from "react";

function App() {
  const questionsList = questionsEsp;

  const [selectedAnswers, setSelectedAnswers] = useState<selectedAnswerType>(
    {}
  );

  const selectQuestion = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  return (
    <div className="row container">
      <div className="col-md-6">
        <Question
          questionsData={questionsList}
          handleClick={selectQuestion}
          selectedAnswers={selectedAnswers}
        />
      </div>
      <div className="col-md-6">
        <Result
          selectedAnswers={selectedAnswers}
          totalQuestions={questionsList.length}
        ></Result>
      </div>
    </div>
  );
}

export default App;
