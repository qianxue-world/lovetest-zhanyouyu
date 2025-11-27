import React from 'react';
import { questions } from '../data/questions';
import './QuestionScreen.css';

interface QuestionScreenProps {
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (score: number) => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  currentQuestion,
  totalQuestions,
  onAnswer,
}) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const questionData = questions[currentQuestion];
  
  if (!questionData) {
    return <div>题目未找到</div>;
  }

  return (
    <div className="question-screen">
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-text">
          {currentQuestion + 1} / {totalQuestions}
        </div>
      </div>
      <div className="question-container">
        <h2>{questionData.question}</h2>
        <div className="options">
          {questionData.options.map((option, index) => (
            <div
              key={index}
              className="option-btn"
              onClick={() => onAnswer(option.score)}
            >
              {option.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
