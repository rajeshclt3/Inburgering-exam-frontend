import React, { useState } from "react";
/*import { cn } from "@/lib/utils";*/ // optional helper if you have one

// Example placeholder pages for now
import WritingExamPage from "../Exams/WritingExamPage";

const ReadingExamPage = () => (
  <div className="text-white text-center text-xl font-semibold mt-8">
    📖 Reading Exam – Coming Soon
  </div>
);
const ListeningExamPage = () => (
  <div className="text-white text-center text-xl font-semibold mt-8">
    🎧 Listening Exam – Coming Soon
  </div>
);
const SpeakingExamPage = () => (
  <div className="text-white text-center text-xl font-semibold mt-8">
    🗣️ Speaking Exam – Coming Soon
  </div>
);

const tabs = [
  { key: "writing", label: "✍️ Writing" },
  { key: "reading", label: "📖 Reading" },
  { key: "listening", label: "🎧 Listening" },
  { key: "speaking", label: "🗣️ Speaking" },
];

const ExamLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState("writing");

  const renderContent = () => {
    switch (activeTab) {
      case "writing":
        return <WritingExamPage />;
      case "reading":
        return <ReadingExamPage />;
      case "listening":
        return <ListeningExamPage />;
      case "speaking":
        return <SpeakingExamPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* --- Orange Banner --- */}
      <header className="w-full bg-[#FF6600] text-white shadow-sm py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="/logo_ilovenederland.png"
            alt="ILoveNederland Logo"
            className="w-14 h-14 rounded-full bg-white p-1 shadow-md"
          />
          <div>
            <h1 className="text-2xl font-extrabold leading-tight">
              Welcome to ILoveNederland
            </h1>
            <p className="text-sm text-white/90">
              🌷 Practice — Writing, Reading, Listening & Speaking
            </p>
          </div>
        </div>

        <div className="text-center sm:text-right">
          <a
            href="https://www.youtube.com/@ILoveNederland"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#FF6600] font-bold text-lg px-5 py-2 rounded-full shadow-md hover:bg-yellow-100 transition-all duration-200"
          >
            🎥 Subscribe ❤️
          </a>
          <button
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user_id");
                    window.location.reload(); // 👈 simple reload to return to login page
                }}
                className="inline-block bg-transparent border-2 border-white font-semibold text-white text-lg px-5 py-2 rounded-full hover:bg-white hover:text-[#FF6600] transition-all duration-200"
                >
                🚪 Logout
          </button>
        </div>
      </header>

      {/* --- Background section --- */}
      <main
        className="flex-1 bg-cover bg-center relative flex flex-col items-center"
        style={{
          backgroundImage: "url('/background_netherlands.jpg')",
        }}
      >


        {/* --- Tabs --- */}
        <div className="relative z-10 w-full max-w-4xl mt-6">
          <div className="flex justify-center bg-white/90 rounded-t-2xl backdrop-blur-md shadow-lg overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 font-semibold transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-[#FF6600] text-white"
                    : "text-[#FF6600] hover:bg-orange-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* --- Content Area --- */}
          <div className="relative z-10 bg-white/95 dark:bg-slate-800/95 rounded-b-2xl shadow-2xl backdrop-blur-sm p-6 mt-0 border border-slate-200 dark:border-slate-700">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamLayout;
