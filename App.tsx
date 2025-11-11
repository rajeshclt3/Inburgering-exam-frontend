import React, { useState, useEffect } from 'react';
import PracticeCard from './components/PracticeCard';
import ChevronLeftIcon from './components/icons/ChevronLeftIcon';
import ChevronRightIcon from './components/icons/ChevronRightIcon';
import { evaluateAnswer, fetchBalancedQuestions } from "./api";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔐 Auth states
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);

  // ✅ 1. Check token at startup
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  // ✅ 2. Load questions ONLY after login
  useEffect(() => {
    const loadQuestions = async () => {
      if (!loggedIn) return; // skip until user logged in
      setLoading(true);
      try {
        const data = await fetchBalancedQuestions(5);
        setQuestions(data);
        setCurrentQuestionIndex(0);
        setUserAnswer("");
        setFeedback(null);
      } catch (e) {
        console.error("Failed to load questions", e);
        alert("Kon vragen niet laden (backend).");
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [loggedIn]); // 👈 re-run when login status changes

  const currentQuestion = questions[currentQuestionIndex];

  const goToNextQuestion = () => {
    if (!questions.length) return;
    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
    setUserAnswer("");
    setFeedback(null);
  };

  const goToPreviousQuestion = () => {
    if (!questions.length) return;
    setCurrentQuestionIndex((prev) => (prev - 1 + questions.length) % questions.length);
    setUserAnswer("");
    setFeedback(null);
  };

  const handleCheckAnswer = async () => {
    if (!userAnswer.trim()) {
      alert("Voer eerst je antwoord in.");
      return;
    }
    setLoading(true);
    setFeedback(null);
    // we'll later add submit logic here with token
  };

  // ✅ 3. If not logged in → show login/register page
 if (!loggedIn) {
  return showRegister ? (
    <RegisterPage onRegistered={() => setShowRegister(false)} />
  ) : (
    <LoginPage
      onLogin={() => setLoggedIn(true)}
      onSwitchToRegister={() => setShowRegister(true)}
    />
  );
}


  // ✅ 4. If logged in → show main exam UI
  if (loading && questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Vragen worden geladen...</div>;
  }

  if (questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Geen vragen beschikbaar.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Oefen Nederlands Schrijven
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          Bereid je voor op het inburgeringsexamen (A2)
        </p>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            setLoggedIn(false);
          }}
          className="mt-3 text-sm text-red-500 underline"
        >
          Uitloggen
        </button>
      </header>

      <main className="w-full max-w-3xl mx-auto">
        <div className="relative">
          <PracticeCard key={currentQuestion.id} question={currentQuestion} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button onClick={goToPreviousQuestion} className="btn">
            <ChevronLeftIcon className="w-5 h-5" /> Vorige
          </button>
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
          <button onClick={goToNextQuestion} className="btn">
            Volgende <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
};


export default App;
