
import React, { useState, useEffect } from 'react';
import { PracticeQuestion, Feedback } from '../types';
import { evaluateAnswer } from "../api";

import LoadingSpinner from './LoadingSpinner';
import FeedbackDisplay from './FeedbackDisplay';

interface PracticeCardProps {
  question: PracticeQuestion;
}

const PracticeCard: React.FC<PracticeCardProps> = ({ question }) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Reset state when question changes
    setAnswer('');
    setFeedback(null);
    setError(null);
    setIsLoading(false);
  }, [question]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) {
      setError('Vul alsjeblieft een antwoord in.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setFeedback(null);
    
    try {
      const result = await evaluateAnswer(question.id, question.prompt, answer);
      setFeedback(result);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    setIsLoading(false);
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6 md:p-8 w-full">
      <div className="mb-4">
        <span className="text-sm font-medium text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/50 px-3 py-1 rounded-full">
          Vraag {question.id}
        </span>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{question.prompt}</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-6">{question.context}</p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Schrijf hier je antwoord..."
          className="w-full h-40 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-150"
          disabled={isLoading}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !answer.trim()}
            className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition duration-150 flex items-center"
          >
            {isLoading ? <LoadingSpinner /> : 'Controleer mijn antwoord'}
          </button>
        </div>
      </form>
      
      {feedback && <FeedbackDisplay feedback={feedback} />}

      {feedback && question.sampleAnswer && (
        <div className="mt-6 bg-sky-50 dark:bg-sky-900/40 p-4 rounded-lg border border-sky-200 dark:border-sky-800">
          <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
            Sample antwoord:
          </h4>
          <p className="text-sky-800 dark:text-sky-200 italic">
            {question.sampleAnswer}
          </p>
        </div>
        )}

    </div>
  );
};

export default PracticeCard;
