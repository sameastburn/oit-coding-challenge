import type { TriviaAPIResponse, TriviaCategory, TriviaQuestion } from '@/types/trivia';

const BASE_URL = 'https://opentdb.com';

function decodeHTML(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export const triviaApi = {
  async getCategories(): Promise<TriviaCategory[]> {
    try {
      const response = await fetch(`${BASE_URL}/api_category.php`);
      
      if (response.status === 429) {
        throw new Error('Rate limit reached. The API only allows 1 request every 5 seconds. Please wait a moment and try again.');
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      return data.trivia_categories.map((category: TriviaCategory) => ({
        ...category,
        name: decodeHTML(category.name),
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      if (error instanceof Error && error.message.includes('Rate limit')) {
        throw error;
      }
      throw new Error('Unable to load categories. Please check your connection and try again.');
    }
  },

  async getQuestions(
    amount: number = 10,
    categoryId?: number,
    difficulty?: string
  ): Promise<TriviaAPIResponse> {
    try {
      const params = new URLSearchParams({
        amount: amount.toString(),
        type: 'multiple',
      });

      if (categoryId) {
        params.append('category', categoryId.toString());
      }

      if (difficulty) {
        params.append('difficulty', difficulty);
      }

      const response = await fetch(`${BASE_URL}/api.php?${params}`);
      
      if (response.status === 429) {
        throw new Error('Rate limit reached. The API only allows 1 request every 5 seconds. Please wait a moment and try again.');
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data: TriviaAPIResponse = await response.json();

      if (data.response_code !== 0) {
        if (data.response_code === 1) {
          throw new Error('No questions available for the selected criteria. Please try different settings.');
        } else if (data.response_code === 2) {
          throw new Error('Invalid parameter. Please try again.');
        } else {
          throw new Error('An error occurred while fetching questions.');
        }
      }

      return {
        ...data,
        results: data.results.map((question: TriviaQuestion) => ({
          ...question,
          category: decodeHTML(question.category),
          question: decodeHTML(question.question),
          correct_answer: decodeHTML(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map(decodeHTML),
        })),
      };
    } catch (error) {
      console.error('Error fetching questions:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unable to load questions. Please check your connection and try again.');
    }
  },
};

