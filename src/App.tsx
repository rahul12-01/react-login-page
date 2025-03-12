import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import "./style.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isRegister, setIsRegister] = useState(false); // Toggle between login and register

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isRegister ? "http://localhost:5000/register" : "http://localhost:5000/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        alert(isRegister ? "✅ Registration Successful!" : "✅ Login Successful!");
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      alert("❌ Something went wrong. Try again.");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <div className="header">
          <h1>{isRegister ? "Create an Account" : "Welcome Back"}</h1>
          <p>{isRegister ? "Sign up to get started" : "Please sign in to continue"}</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail className="icon" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="icon" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
              </button>
            </div>
          </div>
          <button type="submit" className="submit-btn">
            {isRegister ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="toggle-auth">
          <p>
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button className="login" onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? "Login here" : "Register here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
