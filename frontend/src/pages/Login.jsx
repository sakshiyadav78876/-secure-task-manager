import { 
  Mail, 
  Lock, 
  ShieldCheck, 
  KeyRound, 
  Users, 
  CloudLightning, 
  ArrowRight, 
  Eye, 
  EyeOff 
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // --- KEEPING YOUR ORIGINAL BACKEND LOGIC ---
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // UI toggle

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error on new attempt

    try {
      const res = await fetch(
        "https://secure-task-manager-backend-ooxa.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.token) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.clear();
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("email", data.user.email);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Server not working");
    }
  };

  // --- NEW PREMIUM UI RETURN ---
  return (
    <div style={styles.container}>
      {/* LEFT SIDE: BRANDING & VISUALS */}
      <div style={styles.leftSection}>
        {/* Animated Background Blobs */}
        <div style={styles.blob1}></div>
        <div style={styles.blob2}></div>
        
        <div style={styles.brandContent}>
          <div style={styles.logoWrapper}>
            <ShieldCheck size={54} color="#22d3ee" style={styles.mainIcon} />
            <div style={styles.iconGlow}></div>
          </div>

          <h1 style={styles.brandTitle}>Secure Task Manager</h1>
          <p style={styles.brandText}>
            The enterprise-grade platform to manage your tasks with military-grade security and real-time collaboration.
          </p>

          <div style={styles.featureList}>
            <div style={styles.featureItem}>
              <div style={styles.iconBox}><KeyRound size={20} /></div>
              <div>
                <div style={styles.featureTitle}>JWT Authentication</div>
                <div style={styles.featureDesc}>Secure session management with encrypted tokens.</div>
              </div>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.iconBox}><Users size={20} /></div>
              <div>
                <div style={styles.featureTitle}>Role Based Access</div>
                <div style={styles.featureDesc}>Control exactly who sees what in your workspace.</div>
              </div>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.iconBox}><CloudLightning size={20} /></div>
              <div>
                <div style={styles.featureTitle}>Secure Cloud Sync</div>
                <div style={styles.featureDesc}>Your data is encrypted end-to-end in real-time.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN FORM */}
      <div style={styles.rightSection}>
        <div style={styles.card}>
          <div style={styles.headerArea}>
            <h2 style={styles.title}>Welcome Back 👋</h2>
            <p style={styles.subtitle}>Login to continue your productivity journey</p>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail size={18} color="#64748b" style={styles.fieldIcon} />
                <input
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={styles.label}>Password</label>
                <button 
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  style={styles.forgotInline}
                >
                  Forgot Password?
                </button>
              </div>
              <div style={styles.inputWrapper}>
                <Lock size={18} color="#64748b" style={styles.fieldIcon} />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" style={styles.button}>
              <span>Login to Dashboard</span>
              <ArrowRight size={18} />
            </button>

            {error && <div style={styles.errorContainer}>{error}</div>}
          </form>

          <div style={styles.cardFooter}>
            <p style={styles.footerText}>
     Don't have an account? 
<span 
  style={styles.linkText} 
  onClick={() => navigate("/")}
>
  Sign up for free
</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PREMIUM STYLES OBJECT ---
const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    background: "#030712",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    overflow: "hidden",
  },

  // LEFT SECTION (BRANDING)
  leftSection: {
    flex: 1.3,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(145deg, #0f172a 0%, #020617 100%)",
    padding: "60px",
    borderRight: "1px solid rgba(255,255,255,0.05)",
  },
  blob1: {
    position: "absolute",
    top: "10%",
    left: "10%",
    width: "300px",
    height: "300px",
    background: "rgba(124, 58, 237, 0.2)",
    filter: "blur(80px)",
    borderRadius: "50%",
  },
  blob2: {
    position: "absolute",
    bottom: "15%",
    right: "10%",
    width: "250px",
    height: "250px",
    background: "rgba(6, 182, 212, 0.15)",
    filter: "blur(80px)",
    borderRadius: "50%",
  },
  brandContent: {
    position: "relative",
    zIndex: 10,
    maxWidth: "500px",
  },
  logoWrapper: {
    position: "relative",
    marginBottom: "32px",
  },
  mainIcon: {
    filter: "drop-shadow(0 0 20px rgba(34, 211, 238, 0.4))",
  },
  iconGlow: {
    position: "absolute",
    top: 0, left: 0,
    width: "54px", height: "54px",
    background: "rgba(34, 211, 238, 0.3)",
    filter: "blur(25px)",
  },
  brandTitle: {
    fontSize: "52px",
    fontWeight: "800",
    color: "#fff",
    letterSpacing: "-1.5px",
    lineHeight: "1.1",
    marginBottom: "20px",
  },
  brandText: {
    fontSize: "18px",
    color: "#94a3b8",
    lineHeight: "1.6",
    marginBottom: "48px",
  },
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  featureItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "18px",
  },
  iconBox: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#a855f7",
    flexShrink: 0,
  },
  featureTitle: {
    fontSize: "17px",
    fontWeight: "600",
    color: "#f8fafc",
    marginBottom: "4px",
  },
  featureDesc: {
    fontSize: "14px",
    color: "#64748b",
  },

  // RIGHT SECTION (FORM)
  rightSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#030712",
    padding: "40px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "48px",
    borderRadius: "32px",
    background: "rgba(255, 255, 255, 0.02)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
  },
  headerArea: {
    marginBottom: "36px",
  },
  title: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "10px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "15px",
    color: "#94a3b8",
    lineHeight: "1.4",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "22px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#cbd5e1",
    marginLeft: "4px",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  fieldIcon: {
    position: "absolute",
    left: "16px",
    opacity: 0.8,
  },
  input: {
    width: "100%",
    background: "rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "14px 16px 14px 48px",
    borderRadius: "14px",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s ease",
  },
  eyeBtn: {
    position: "absolute",
    right: "14px",
    background: "none",
    border: "none",
    color: "#64748b",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  button: {
    marginTop: "10px",
    padding: "16px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)",
  },
  forgotInline: {
    background: "none",
    border: "none",
    color: "#a855f7",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    padding: 0,
  },
  errorContainer: {
    background: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    color: "#f87171",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "14px",
    textAlign: "center",
  },
  cardFooter: {
    marginTop: "36px",
    textAlign: "center",
  },
  footerText: {
    color: "#64748b",
    fontSize: "14px",
  },
  linkText: {
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    marginLeft: "6px",
    textDecoration: "underline",
    textUnderlineOffset: "4px",
  }
};

export default Login;