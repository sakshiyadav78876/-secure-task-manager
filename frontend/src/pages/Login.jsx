import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
  "https://secure-task-manager-backend-ooxa.onrender.com/api/auth/login",
  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (!res.ok || !data.token) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ ALWAYS CLEAR FIRST
      localStorage.clear();

      // ✅ STORE PROPERLY (IMPORTANT FIX)
    localStorage.setItem("token", data.token);

// IMPORTANT FIX 👇
localStorage.setItem("name", data.user.name);
localStorage.setItem("email", data.user.email);

      console.log(
        "STORED:",
        localStorage.getItem("name"),
        localStorage.getItem("email")
      );

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      setError("Server not working");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Login to continue your tasks</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
          />

          <button style={styles.button}>Login</button>

          {error && <p style={styles.error}>{error}</p>}

        </form>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
  <button
    onClick={() => navigate("/forgot-password")}
    style={{ background: "none", border: "none", color: "#3b82f6", cursor: "pointer" }}
  >
    Forgot Password?
  </button>
</div>
        
      </div>
    </div>
  );
};

export default Login;

// ===== UI (UNCHANGED) =====
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial",
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    width: "320px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
  },

  title: {
    marginBottom: "5px",
  },

  subtitle: {
    fontSize: "12px",
    color: "gray",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
  },

  button: {
    padding: "12px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  error: {
    color: "red",
    fontSize: "12px",
  },
};