import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Mail, 
  ShieldQuestion, 
  ArrowRight, 
  ArrowLeft, 
  Fingerprint, 
  LifeBuoy 
} from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Added for UX
  const navigate = useNavigate();

  // --- KEEPING YOUR ORIGINAL BACKEND LOGIC ---
  const sendOTP = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://secure-task-manager-backend-ooxa.onrender.com/api/auth/send-otp/",
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

      if (res.ok) {
        alert("OTP sent to email ✅");
        localStorage.setItem("resetEmail", email.trim());
        navigate("/verify-otp");
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.log("SEND OTP ERROR:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT SIDE: BRANDING & VISUALS */}
      <div style={styles.leftSection}>
        <div style={styles.blob1}></div>
        <div style={styles.blob2}></div>
        
        <div style={styles.brandContent}>
          <div style={styles.logoWrapper}>
            <ShieldQuestion size={54} color="#a855f7" style={styles.mainIcon} />
            <div style={styles.iconGlow}></div>
          </div>

          <h1 style={styles.brandTitle}>Account Recovery</h1>
          <p style={styles.brandText}>
            Don't worry, it happens to the best of us. Enter your registered email and we'll help you get back into your secure workspace.
          </p>

          <div style={styles.featureList}>
            <div style={styles.featureItem}>
              <div style={styles.iconBox}><Fingerprint size={20} /></div>
              <div>
                <div style={styles.featureTitle}>Secure Verification</div>
                <div style={styles.featureDesc}>Multi-factor checks to ensure only you access your account.</div>
              </div>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.iconBox}><LifeBuoy size={20} /></div>
              <div>
                <div style={styles.featureTitle}>Priority Support</div>
                <div style={styles.featureDesc}>Our team is ready to help you recover your encrypted data.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: FORGOT PASSWORD FORM */}
      <div style={styles.rightSection}>
        <div style={styles.card}>
          <button onClick={() => navigate("/login")} style={styles.backBtn}>
            <ArrowLeft size={16} /> Back to Login
          </button>

          <div style={styles.headerArea}>
            <h2 style={styles.title}>Forgot Password? </h2>
            <p style={styles.subtitle}>Enter your email to receive a secure OTP code.</p>
          </div>

          <div style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Registered Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail size={18} color="#64748b" style={styles.fieldIcon} />
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <button 
                onClick={sendOTP} 
                style={styles.button} 
                disabled={loading}
            >
              <span>{loading ? "Sending OTP..." : "Send OTP"}</span>
              {!loading && <ArrowRight size={18} />}
            </button>
          </div>

          <div style={styles.cardFooter}>
            <p style={styles.footerText}>
              Still having trouble? <span style={styles.linkText}>Contact Support</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PREMIUM SaaS STYLES ---
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
    background: "rgba(168, 85, 247, 0.15)",
    filter: "blur(80px)",
    borderRadius: "50%",
  },
  blob2: {
    position: "absolute",
    bottom: "15%", right: "10%",
    width: "250px", height: "250px",
    background: "rgba(6, 182, 212, 0.1)",
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
    filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))",
  },
  iconGlow: {
    position: "absolute",
    top: 0, left: 0,
    width: "54px", height: "54px",
    background: "rgba(168, 85, 247, 0.3)",
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
  backBtn: {
    background: "none",
    border: "none",
    color: "#94a3b8",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    fontSize: "14px",
    marginBottom: "24px",
    padding: 0,
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
    gap: "20px",
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
  button: {
    marginTop: "10px",
    padding: "16px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.4)",
    transition: "opacity 0.2s",
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

export default ForgotPassword;