import { useState, useEffect, useCallback } from 'react';
import type { TriviaCategory, TriviaQuestion, Difficulty } from '@/types/trivia';
import { triviaApi } from '@/services/triviaApi';

export function useTriviaCategories() {
  const [categories, setCategories] = useState<TriviaCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const fetchedCategories = await triviaApi.getCategories();
      setCategories(fetchedCategories);
      return fetchedCategories;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load categories';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories,
  };
}

export function useTriviaQuestions(
  amount: number = 10,
  categoryId?: number,
  difficulty?: Difficulty,
  shouldFetch: boolean = true
) {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await triviaApi.getQuestions(amount, categoryId, difficulty);
      setQuestions(response.results);
      return response.results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load questions';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [amount, categoryId, difficulty]);

  useEffect(() => {
    if (shouldFetch) {
      fetchQuestions();
    }
  }, [shouldFetch, fetchQuestions]);

  return {
    questions,
    loading,
    error,
    refetch: fetchQuestions,
  };
}



