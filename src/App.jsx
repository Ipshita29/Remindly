import React, { useState } from 'react';
import { BrainCircuit, ArrowLeft, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { fetchQuizQuestions, fetchLearningResources } from './services/api';

function App() {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [resources, setResources] = useState([]);

  const startQuiz = async (searchTopic) => {
    try {
      setIsLoading(true);
      setError('');
      setTopic(searchTopic);
      const quizQuestions = await fetchQuizQuestions(searchTopic);
      setQuestions(quizQuestions);
      setQuizStarted(true);
      setCurrentIndex(0);
      setAnswers({});
      setQuizCompleted(false);
    } catch (err) {
      setError('Failed to fetch questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const completeQuiz = async () => {
    try {
      setIsLoading(true);
      const learningResources = await fetchLearningResources(topic);
      setResources(learningResources);
      setQuizCompleted(true);
    } catch (err) {
      setError('Failed to fetch resources');
    } finally {
      setIsLoading(false);
    }
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-2xl mx-auto text-center pt-20">
          <BrainCircuit size={60} className="mx-auto text-cyan-400 mb-4" />
          <h1 className="text-4xl font-bold mb-4">Neural Quiz</h1>
          <p className="text-gray-400 mb-8">Test your knowledge on any topic</p>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Enter a topic (e.g., Computers, Science, History)"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded mb-4"
              onKeyPress={(e) => e.key === 'Enter' && startQuiz(e.target.value)}
            />
            <button
              onClick={() => startQuiz(document.querySelector('input').value)}
              className="bg-cyan-500 text-black px-6 py-2 rounded hover:bg-cyan-400"
            >
              Start Quiz
            </button>
            {error && <p className="text-red-400 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const score = getScore();
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Quiz Results</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <p className="text-2xl mb-4">Score: {score.percentage}%</p>
            <p className="text-gray-400 mb-6">
              You got {score.correct} out of {score.total} questions correct
            </p>
            
            <h3 className="text-xl font-bold mb-4">Recommended Resources</h3>
            <div className="space-y-4">
              {resources.map(resource => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-700 p-4 rounded hover:bg-gray-600"
                >
                  <h4 className="font-bold">{resource.title}</h4>
                  <p className="text-gray-400">{resource.description}</p>
                  <span className="text-cyan-400 text-sm">{resource.type}</span>
                </a>
              ))}
            </div>
          </div>
          <button
            onClick={() => setQuizStarted(false)}
            className="bg-cyan-500 text-black px-6 py-2 rounded hover:bg-cyan-400 mx-auto block"
          >
            Try Another Topic
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const allQuestionsAnswered = questions.every(q => answers[q.id] !== undefined);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <span className="text-cyan-400">Question {currentIndex + 1}/{questions.length}</span>
          <div className="w-1/2 h-2 bg-gray-800 rounded-full">
            <div
              className="h-full bg-cyan-500 rounded-full"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl mb-6">{currentQuestion.question}</h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(currentQuestion.id, idx)}
                className={`w-full p-4 rounded flex items-center ${
                  answers[currentQuestion.id] === idx
                    ? 'bg-cyan-500 text-black'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {answers[currentQuestion.id] === idx ? (
                  <CheckCircle2 className="mr-2" size={20} />
                ) : (
                  <Circle className="mr-2" size={20} />
                )}
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentIndex(prev => prev - 1)}
            disabled={currentIndex === 0}
            className="flex items-center px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          >
            <ArrowLeft className="mr-2" size={20} />
            Previous
          </button>
          
          {currentIndex === questions.length - 1 ? (
            <button
              onClick={completeQuiz}
              disabled={!allQuestionsAnswered}
              className="flex items-center px-4 py-2 bg-cyan-500 text-black rounded disabled:opacity-50"
            >
              Complete Quiz
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="flex items-center px-4 py-2 bg-gray-700 rounded"
            >
              Next
              <ArrowRight className="ml-2" size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;