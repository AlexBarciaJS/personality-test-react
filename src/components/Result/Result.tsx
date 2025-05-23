import person from "../../assets/person.svg";
import "./Result.css";
import personalities from "../../data/personalityEsp.json";
import type { AnswerColor, ResultProps } from "../../types/index.ts";
import { answersColors } from "../../constants/index.ts";

interface Personality {
  percent: number;
  color: "red" | "yellow" | "blue" | "green" | "white";
}

interface answerFrecuencyType {
  count: number;
  value: number;
}

function getPersonality(
  answerFrecuency: answerFrecuencyType | undefined,
  totalAnswers: number
): Personality {
  if (!answerFrecuency) {
    return { percent: 0, color: "white" };
  }

  const percent = Math.round((answerFrecuency.count * 100) / totalAnswers);

  const color = (answersColors[answerFrecuency.value] ??
    "white") as AnswerColor;

  return { percent, color };
}

const Result: React.FC<ResultProps> = ({ selectedAnswers, totalQuestions }) => {
  const totalAnswers = Object.values(selectedAnswers).length;
  const showResult = totalAnswers === totalQuestions;
  const resultPercent = (totalAnswers * 100) / totalQuestions;
  const frequencyMap: Record<number, number> = {};

  Object.values(selectedAnswers).forEach((value) => {
    frequencyMap[value] = (frequencyMap[value] || 0) + 1;
  });

  const sortedFrequencies = Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => ({ value: Number(key), count }));

  const personalityA: Personality = getPersonality(
    sortedFrequencies[0],
    totalAnswers
  );
  const personalityB: Personality = getPersonality(
    sortedFrequencies[1],
    totalAnswers
  );
  const percentFlagStyle = {
    background: `linear-gradient(to top, 
    ${personalityB.color} ${personalityB.percent}%, 
    ${personalityA.color} ${personalityA.percent}%)`,
  };

  const firstResult =
    personalityA.color !== "white" ? personalities[personalityA.color] : "";
  const secondResult =
    personalityB.color !== "white" ? personalities[personalityB.color] : "";

  return (
    <div className="row result-content">
      <div className="row person-container" style={percentFlagStyle}>
        {Object.values(selectedAnswers).length !== 0 && (
          <span className="result-percent">Answered: {resultPercent}%</span>
        )}
        <img className="person" src={person} alt="" />
      </div>
      {showResult && (
        <div>
          <h4>{`Felicidades! eres ${personalityA.percent}% ${personalityA.color} y ${personalityB.percent}% ${personalityB.color}`}</h4>
          <div>
            <h5>{personalityA.color}</h5>
            <div className="row result">
              <p>{firstResult}</p>
            </div>
            <h5>{personalityB.color}</h5>
            <div className="row result">
              <p>{secondResult}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
