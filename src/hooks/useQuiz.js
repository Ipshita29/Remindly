import { useState } from 'react';
import { fetchQuizQuestions, fetchLearningResources } from '../services/api';

export const useQuiz = () => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState([]);
  const [resources, setResources] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const startQuiz = async (searchTopic) => {
    if (!searchTopic.trim()) {
      setError('Please enter a topic');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      setTopic(searchTopic);
      setQuizStarted(false);
      setQuizCompleted(false);
      setSelectedAnswers({});
      setCurrentQuestionIndex(0);
      
      const quizQuestions = await fetchQuizQuestions(searchTopic);
      
      if (quizQuestions.length === 0) {
        setError('No questions found for this topic');
        setIsLoading(false);
        return;
      }
      
      setQuestions(quizQuestions);
      setQuizStarted(true);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch questions. Please try again.');
      setIsLoading(false);
    }
  };
  
  const selectAnswer = (questionId, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const completeQuiz = async () => {
    try {
      setIsLoading(true);
      const learningResources = await fetchLearningResources(topic);
      setResources(learningResources);
      setQuizCompleted(true);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch learning resources');
      setIsLoading(false);
    }
  };
  
  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setResources([]);
    setTopic('');
  };
  
  const getScore = () => {
    let correctCount = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    return {
      correct: correctCount,
      total: questions.length,
      percentage: Math.round((correctCount / questions.length) * 100)
    };
  };
  
  const getPerformanceMessage = () => {
    const { percentage } = getScore();
    
    if (percentage >= 90) {
      return "Legendary! You've mastered this topic!";
    } else if (percentage >= 70) {
      return "Impressive skills! You know your stuff!";
    } else if (percentage >= 50) {
      return "Good effort! Keep practicing to improve!";
    } else {
      return "Keep exploring this topic. Practice makes perfect!";
    }
  };
  
  return {
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
  };
};