const API_BASE = "http://localhost:8000";

export async function evaluateAnswer(id: number, question: string, answer: string) {
  const token = localStorage.getItem("access_token"); // stored at login
  const payload = {
    question_id: id,
    question_text: question,
    user_answer: answer
  };

  const res = await fetch(`${API_BASE}/writing/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    // Try to extract backend message
    let message = `Server error: ${res.status}`;
    try {
      const data = await res.json();
      if (data.detail) message = data.detail; // <-- show your backend's message
    } catch (e) {
      // ignore JSON parsing errors
    }
    throw new Error(message);
  }


  return await res.json();
}

export async function fetchBalancedQuestions(count: number = 5) {
  const response = await fetch(`${API_BASE}/writing/balanced?count=${count}`);
  if (!response.ok) throw new Error("Failed to fetch balanced questions");
  return response.json();
}

export async function registerUser(
  email: string,
  password: string,
  username?: string,
  captchaToken?: string
) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  // ✅ add the captcha token to header if available
  if (captchaToken) headers["X-Captcha-Token"] = captchaToken;

  const res = await fetch(`${API_BASE}/user/register`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password, username }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Registration failed");
  return data;
}


export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("user_id", data.user_id); // optional, if you need it
  }
  else {
    throw new Error(data.detail || "Login failed");
  }
  return data;
}

