import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

const sendOTP = async () => {

  if (!email) {
    alert("Please enter your email");
    return;
  }

  try {

    const res = await fetch(
      "https://secure-task-manager-backend-ooxa.onrender.com/api/auth/send-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      }
    );


    const data = await res.json();


    console.log("Send OTP Response:", data);


    if (res.ok) {

      alert("OTP sent to email ✅");

      localStorage.setItem(
        "resetEmail",
        email.trim()
      );

      navigate("/verify-otp");

    } else {

      alert(data.message || "Failed to send OTP");

    }


  } catch(error) {

    console.log("SEND OTP ERROR:", error);

    alert("Server error");

  }

};


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password 🔐</h2>

        <p style={styles.subtitle}>
          Enter your email to receive OTP
        </p>

        <div style={styles.form}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <button onClick={sendOTP} style={styles.button}>
            Send OTP
          </button>
        </div>
      </div>
    </div>
  );
};

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
    fontWeight: "bold",
  },
};

export default ForgotPassword;