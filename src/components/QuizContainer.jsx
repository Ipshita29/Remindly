import React from 'react';
import Question from './Question';
import Navigation from './Navigation';

const QuizContainer = ({ 
  question, 
  options, 
  currentQuestionIndex, 
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNextQuestion,
  onPreviousQuestion,
  onCompleteQuiz,
  allQuestionsAnswered
}) => {
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  
  return (
    <div className="w-full animate-fadeIn">
      <Question 
        question={question}
        options={options}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={onSelectAnswer}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
      />
      
      <Navigation 
        onPrevious={onPreviousQuestion}
        onNext={onNextQuestion}
        onComplete={onCompleteQuiz}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        isLastQuestion={isLastQuestion}
        allQuestionsAnswered={allQuestionsAnswered}
      />
    </div>
  );
};

export default QuizContainer;