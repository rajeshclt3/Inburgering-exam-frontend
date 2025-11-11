
import React from 'react';
import { Feedback } from '../types';

interface FeedbackDisplayProps {
  feedback: Feedback;
}

const getEvaluationStyling = (evaluation: Feedback['evaluation']) => {
  switch (evaluation) {
    case 'correct':
      return {
        borderColor: 'border-green-500',
        textColor: 'text-green-700 dark:text-green-400',
        bgColor: 'bg-green-50 dark:bg-green-900/50',
        title: 'Goed gedaan!'
      };
    case 'minor_errors':
      return {
        borderColor: 'border-yellow-500',
        textColor: 'text-yellow-700 dark:text-yellow-400',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/50',
        title: 'Bijna perfect!'
      };
    case 'major_errors':
      return {
        borderColor: 'border-red-500',
        textColor: 'text-red-700 dark:text-red-400',
        bgColor: 'bg-red-50 dark:bg-red-900/50',
        title: 'Even kijken naar de details'
      };
    default:
      return {
        borderColor: 'border-slate-500',
        textColor: 'text-slate-700 dark:text-slate-400',
        bgColor: 'bg-slate-100 dark:bg-slate-800',
        title: 'Feedback'
      };
  }
};

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback }) => {
  const { borderColor, textColor, bgColor, title } = getEvaluationStyling(feedback.evaluation);

  return (
    <div className={`mt-6 border-l-4 ${borderColor} ${bgColor} p-4 rounded-r-lg`}>
      <h3 className={`text-lg font-semibold ${textColor} mb-2`}>{title}</h3>
      <p className="mb-4">{feedback.explanation}</p>
      
      {feedback.corrections.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Correcties:</h4>
          <ul className="space-y-3">
            {feedback.corrections.map((corr, index) => (
              <li key={index} className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="text-red-500 line-through break-words">{corr.original}</span>
                  <span className="text-2xl font-sans text-slate-400 dark:text-slate-500 hidden md:inline break-words">→</span>
                  <span className="text-green-600 dark:text-green-500 font-medium break-words">{corr.corrected}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 pl-1">{corr.reason}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Improved answer:</h4>
        <p className="p-3 bg-sky-50 dark:bg-sky-900/50 rounded-md border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 italic">
          {feedback.correctedAnswer}
        </p>
      </div>

      <div  className="mt-4">
        <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Sample Answer:</h4>
        <p className="p-3 bg-sky-50 dark:bg-sky-900/50 rounded-md border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 italic">
          {feedback.idealAnswer}
        </p>
      </div>
    </div>
  );
};

export default FeedbackDisplay;
