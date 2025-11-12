import React, { useState, useEffect } from "react";
import ExamLayout from "./pages/Layout/ExamTabsLayout";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
  }, []);

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

  return <ExamLayout />;
};

export default App;
