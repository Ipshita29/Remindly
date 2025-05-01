import React from 'react';
import Home from './components/Home';
import QuizContainer from './components/QuizContainer';
import Results from './components/Results';
import Loader from './components/Loader';
import { useQuiz } from './hooks/useQuiz';

function App() {
  const {
    topic,
    questions,
    resources,
    currentQuestionIndex,
    selectedAnswers,
    quizStarted,
    quizCompleted,
    isLoading,
    error,
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    completeQuiz,
    restartQuiz,
    getScore,
    getPerformanceMessage
  } = useQuiz();

  // Check if all questions have been answered
  const allQuestionsAnswered = questions.length > 0 && 
    questions.every(q => selectedAnswers[q.id] !== undefined);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-[-2]"></div>
      
      {/* Grid overlay effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMHoiIHN0cm9rZT0icmdiYSg2NCwgMjI0LCAyMDgsIDAuMDUpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTMwIDBIMHY2MGgzMHoiIHN0cm9rZT0icmdiYSg2NCwgMjI0LCAyMDgsIDAuMDUpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] 
           opacity-30 z-[-1]"></div>
      
      {/* Scanline effect */}
      <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] 
                      before:bg-size-[100%_4px] before:animate-scanline z-[1] pointer-events-none"></div>
      
      {/* Main content */}
      <div className="max-w-4xl mx-auto pt-8 relative z-0">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {!quizStarted ? (
              <Home onStartQuiz={startQuiz} isLoading={isLoading} error={error} />
            ) : quizCompleted ? (
              <Results 
                score={getScore()} 
                performanceMessage={getPerformanceMessage()}
                resources={resources}
                onRestart={restartQuiz}
                topic={topic}
              />
            ) : (
              <QuizContainer
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                selectedAnswer={selectedAnswers[questions[currentQuestionIndex].id]}
                onSelectAnswer={(answerIndex) => selectAnswer(questions[currentQuestionIndex].id, answerIndex)}
                onNextQuestion={nextQuestion}
                onPreviousQuestion={previousQuestion}
                onCompleteQuiz={completeQuiz}
                allQuestionsAnswered={allQuestionsAnswered}
              />
            )}
          </>
        )}
      </div>
      
      {/* Footer credit */}
      <div className="absolute bottom-2 right-2 text-gray-600 text-xs font-mono">
        Neural Quiz v1.0
      </div>
    </div>
  );
}

export default App;