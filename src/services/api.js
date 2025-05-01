import axios from 'axios';

const API_URL = 'https://the-trivia-api.com/api/questions';

export const fetchQuizQuestions = async (topic) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        limit: 5,
        categories: getCategoryName(topic)
      }
    });

    return response.data.map((question, index) => ({
      id: index + 1,
      question: question.question,
      options: shuffleArray([...question.incorrectAnswers, question.correctAnswer]),
      correctAnswer: question.correctAnswer
    }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch questions');
  }
};

export const fetchLearningResources = async (topic) => {
  // Simulated fast response
  return [
    {
      id: 1,
      title: `${topic} Fundamentals`,
      type: 'course',
      url: 'https://www.coursera.org',
      description: `Learn ${topic} from scratch with hands-on exercises.`
    },
    {
      id: 2,
      title: `Advanced ${topic} Concepts`,
      type: 'video',
      url: 'https://www.youtube.com',
      description: `Deep dive into advanced ${topic} topics.`
    },
    {
      id: 3,
      title: `${topic} Best Practices`,
      type: 'article',
      url: 'https://medium.com',
      description: `Industry-standard ${topic} practices and tips.`
    }
  ];
};

// Helper to map topic to Trivia API category names
const getCategoryName = (topic) => {
  const categories = {
    'computers': 'science:computers',
    'science': 'science',
    'history': 'history',
    'geography': 'geography',
    'art': 'arts_and_literature',
    'sports': 'sport_and_leisure',
    'entertainment': 'film_and_tv',
    'general': 'general_knowledge',
    'music': 'music'
  };

  const topicLower = topic.toLowerCase();
  return categories[topicLower] || 'general_knowledge';
};

// Shuffle options
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
