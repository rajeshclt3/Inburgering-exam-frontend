
import React, { useState } from 'react';
import { PRACTICE_QUESTIONS } from './constants';
import PracticeCard from './components/PracticeCard';
import ChevronLeftIcon from './components/icons/ChevronLeftIcon';
import ChevronRightIcon from './components/icons/ChevronRightIcon';

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % PRACTICE_QUESTIONS.length);
  };

  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex - 1 + PRACTICE_QUESTIONS.length) % PRACTICE_QUESTIONS.length);
  };

  const currentQuestion = PRACTICE_QUESTIONS[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Oefen Nederlands Schrijven
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          Bereid je voor op het inburgeringsexamen (A2)
        </p>
      </header>

      <main className="w-full max-w-3xl mx-auto">
        <div className="relative">
          <PracticeCard key={currentQuestion.id} question={currentQuestion} />
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={goToPreviousQuestion}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg shadow-md hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            Vorige
          </button>
          
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            {currentQuestionIndex + 1} / {PRACTICE_QUESTIONS.length}
          </span>

          <button
            onClick={goToNextQuestion}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg shadow-md hover:bg-slate-100 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150"
          >
            Volgende
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </main>
      
      <footer className="text-center mt-12 text-slate-500 dark:text-slate-400 text-sm">
        <p>Mogelijk gemaakt door Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
