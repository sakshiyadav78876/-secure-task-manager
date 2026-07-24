import { useState } from "react";
import { useNavigate, } from "react-router-dom";

import { 
  User, 
  Mail, 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  EyeOff,
  Sparkles,
  CheckCircle2,

} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  // --- KEEPING YOUR ORIGINAL BACKEND LOGIC ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      setLoading(true);
      const response = await fetch(
        "https://secure-task-manager-backend-ooxa.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

if (response.ok) {
  setSuccess("Registration successful! Redirecting to login...");

  setTimeout(() => {
    navigate("/login");
  }, 1500);
} else {
        setError(data.message || "Registration Failed");
      }
    } catch (error) {
      console.error("Register Error:", error);
      setError("Failed to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT SIDE: BRANDING (Visual consistency with Login) */}
      <div style={styles.leftSection}>
        <div style={styles.blob1}></div>
        <div style={styles.blob2}></div>
        
        <div style={styles.brandContent}>
          <div style={styles.logoWrapper}>
            <ShieldCheck size={54} color="#22d3ee" style={styles.mainIcon} />
            <div style={styles.iconGlow}></div>
          </div>

          <h1 style={styles.brandTitle}>Join the Future of Productivity</h1>
          <p style={styles.brandText}>
            Create your account in seconds and start managing your tasks with enterprise-grade security and seamless cloud sync.
          </p>

          <div style={styles.featureList}>
            <div style={styles.featureItem}>
              <div style={styles.iconBox}><Sparkles size={20} /></div>
              <div>
                <div style={styles.featureTitle}>Secure by Design</div>
                <div style={styles.featureDesc}>End-to-end encryption for all your sensitive tasks.</div>
              </div>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.iconBox}><CheckCircle2 size={20} /></div>
              <div>
                <div style={styles.featureTitle}>Role-Based Control</div>
                <div style={styles.featureDesc}>Full transparency over team permissions and access.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: REGISTER FORM */}
      <div style={styles.rightSection}>
        <div style={styles.card}>
          <div style={styles.headerArea}>
            <h2 style={styles.title}>Create Account 🚀</h2>
            <p style={styles.subtitle}>Start your organized journey today.</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Full Name Input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <div style={styles.inputWrapper}>
                <User size={18} color="#64748b" style={styles.fieldIcon} />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            {/* Email Input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail size={18} color="#64748b" style={styles.fieldIcon} />
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            {/* Password Input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <Lock size={18} color="#64748b" style={styles.fieldIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
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

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Get Started Now</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {error && <div style={styles.errorContainer}>{error}</div>}
            {success && (
  <div
    style={{
      background: "rgba(34,197,94,0.1)",
      border: "1px solid rgba(34,197,94,0.3)",
      color: "#4ade80",
      padding: "12px",
      borderRadius: "12px",
      textAlign: "center",
      fontSize: "14px",
    }}
  >
    {success}
  </div>
)}
          </form>

          <div style={styles.cardFooter}>
            <p style={styles.footerText}>
              Already have an account? <span style={styles.linkText} onClick={() => navigate("/login")}>Login Here</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SHARED PREMIUM STYLES ---
const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    background: "#030712",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    overflow: "hidden",
  },
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
    top: "10%", left: "10%",
    width: "300px", height: "300px",
    background: "rgba(124, 58, 237, 0.2)",
    filter: "blur(80px)",
    borderRadius: "50%",
  },
  blob2: {
    position: "absolute",
    bottom: "15%", right: "10%",
    width: "250px", height: "250px",
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
    fontSize: "48px",
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
    padding: "40px",
    borderRadius: "32px",
    background: "rgba(255, 255, 255, 0.02)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
  },
  headerArea: {
    marginBottom: "30px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "15px",
    color: "#94a3b8",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
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
    boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)",
    transition: "opacity 0.2s",
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
    marginTop: "24px",
    textAlign: "center",
  },
  footerText: {
    color: "#64748b",
    fontSize: "14px",
  },
  linkText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: "6px",
    textDecoration: "underline",
    textUnderlineOffset: "4px",
    cursor: "pointer"
  }
};


export default Register;