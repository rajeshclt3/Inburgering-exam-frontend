import React, { useEffect, useState } from "react";
import PracticeCard from "../../components/PracticeCard";
import ChevronLeftIcon from "../../components/icons/ChevronLeftIcon";
import ChevronRightIcon from "../../components/icons/ChevronRightIcon";
import { fetchBalancedQuestions } from "../../api";

const WritingExamPage: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        const data = await fetchBalancedQuestions(5);
        setQuestions(data);
      } catch (e) {
        console.error("Failed to load questions", e);
        alert("Kon vragen niet laden (backend).");
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  if (loading && questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Vragen worden geladen...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Geen vragen beschikbaar.
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const goToNextQuestion = () =>
    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);

  const goToPreviousQuestion = () =>
    setCurrentQuestionIndex((prev) => (prev - 1 + questions.length) % questions.length);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <PracticeCard key={currentQuestion.id} question={currentQuestion} />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button onClick={goToPreviousQuestion} className="btn flex items-center gap-1">
          <ChevronLeftIcon className="w-5 h-5" /> Vorige
        </button>
        <span className="text-slate-500 dark:text-slate-400 font-medium">
          {currentQuestionIndex + 1} / {questions.length}
        </span>
        <button onClick={goToNextQuestion} className="btn flex items-center gap-1">
          Volgende <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default WritingExamPage;
