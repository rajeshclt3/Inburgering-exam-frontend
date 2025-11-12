import React, { useState } from "react";
import { loginUser } from "../../api";
import ReCAPTCHA from "react-google-recaptcha";

interface Props {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaRequired, setCaptchaRequired] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user_id", String(data.user_id));
      onLogin();
    } catch (err: any) {
      if (err.message.includes("Captcha required")) setCaptchaRequired(true);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-800 dark:text-slate-100">
      {/* --- Dutch Orange Header --- */}
      <header className="w-full bg-[#FF6600] text-white shadow-sm py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left side - Logo + Title */}
        <div className="flex items-center gap-4">
          <img
            src="/logo_ilovenederland.png"
            alt="ILoveNederland Logo"
            className="w-20 h-20 rounded-full bg-white p-1 shadow-md"
          />
          <div>
            <h1 className="text-2xl font-extrabold leading-tight">
              Welcome to ILoveNederland
            </h1>
            <p className="text-sm text-white/90">
              Free Inburgering Practice — Writing, Reading, Listening & Speaking
            </p>
          </div>
        </div>

        {/* Right side - Subscribe CTA */}
        <div className="text-center sm:text-right">
          <a
            href="https://www.youtube.com/@ILoveNederland"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#FF6600] font-bold text-lg sm:text-xl px-5 py-2 rounded-full shadow-md hover:bg-yellow-100 transition-all duration-200"
          >
            🎥 Subscribe to our Channel ❤️
          </a>
        </div>
      </header>

      {/* --- Background with Centered Login --- */}
      <main
        className="flex flex-1 justify-center items-center px-4 py-12 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/background_netherlands.jpg')", // your image in public/
        }}
      >


        {/* Login form */}
        <form
          onSubmit={handleSubmit}
          className="relative z-10 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-sm space-y-4 border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-2xl font-bold text-center text-[#FF6600] dark:text-orange-400">
            Login to Continue
          </h2>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
          />

          <input
            type="password"
            placeholder="Wachtwoord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
          />

          {captchaRequired && (
            <div className="flex justify-center my-2">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#FF6600] hover:bg-[#e65c00] text-white font-semibold rounded transition duration-150"
          >
            {loading ? "Bezig..." : "Inloggen"}
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <p className="text-center text-sm mt-3">
            Nog geen account?{" "}
            <button
              onClick={onSwitchToRegister}
              className="text-[#FF6600] hover:underline"
            >
              Registreren
            </button>
          </p>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
