import React, { useState } from "react";
import { loginUser } from "../api";
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
      if (err.message.includes("Captcha required")) {
        setCaptchaRequired(true);
    }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800">
      <h1 className="text-3xl font-bold mb-4">Inloggen</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80 space-y-3">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Wachtwoord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
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
          className="w-full py-2 bg-sky-600 text-white font-semibold rounded hover:bg-sky-700"
        >
          {loading ? "Bezig..." : "Inloggen"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

      <p className="mt-4 text-sm">
        Nog geen account?{" "}
        <button
          onClick={onSwitchToRegister}
          className="text-sky-600 hover:underline"
        >
          Registreren
        </button>
      </p>
    </div>
  );
};

export default LoginPage;
