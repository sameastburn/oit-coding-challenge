import { useState, useEffect, useCallback } from 'react';
import type { TriviaCategory, TriviaQuestion, Difficulty } from '@/types/trivia';
import { triviaApi } from '@/services/triviaApi';

const CATEGORIES_CACHE_KEY = 'trivia_categories_cache';
const CACHE_DURATION = 1000 * 60 * 30;

export function useTriviaCategories() {
  const [categories, setCategories] = useState<TriviaCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const cached = sessionStorage.getItem(CATEGORIES_CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setCategories(data);
          setLoading(false);
          return data;
        }
      }
      
      const fetchedCategories = await triviaApi.getCategories();
      setCategories(fetchedCategories);
      sessionStorage.setItem(CATEGORIES_CACHE_KEY, JSON.stringify({
        data: fetchedCategories,
        timestamp: Date.now(),
      }));
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
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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

