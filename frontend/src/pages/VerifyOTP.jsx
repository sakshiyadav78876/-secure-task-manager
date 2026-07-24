import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  Timer, 
  Smartphone 
} from "lucide-react";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  // Check if email exists, otherwise redirect
  useEffect(() => {
    if (!email) {
      alert("Email missing. Restart forgot password.");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  // --- KEEPING YOUR ORIGINAL BACKEND LOGIC ---
  const verifyOTP = async () => {
    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://secure-task-manager-backend-ooxa.onrender.com/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("OTP Verified ✅");
        navigate("/reset-password");
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.log("VERIFY OTP ERROR:", error);
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
            <ShieldCheck size={54} color="#10b981" style={styles.mainIcon} />
            <div style={styles.iconGlow}></div>
          </div>

          <h1 style={styles.brandTitle}>Identity Verification</h1>
          <p style={styles.brandText}>
            We've sent a 6-digit security code to <strong>{email}</strong>. Enter it below to verify your ownership and continue.
          </p>

          <div style={styles.featureList}>
            <div style={styles.featureItem}>
              <div style={styles.iconBox}><Smartphone size={20} /></div>
              <div>
                <div style={styles.featureTitle}>Instant Delivery</div>
                <div style={styles.featureDesc}>Secure OTP delivered straight to your inbox.</div>
              </div>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.iconBox}><Timer size={20} /></div>
              <div>
                <div style={styles.featureTitle}>Time-Sensitive</div>
                <div style={styles.featureDesc}>For your security, these codes expire after 10 minutes.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: OTP FORM */}
      <div style={styles.rightSection}>
        <div style={styles.card}>
          <button onClick={() => navigate("/forgot-password")} style={styles.backBtn}>
            <ArrowLeft size={16} /> Change Email
          </button>

          <div style={styles.headerArea}>
            <h2 style={styles.title}>Enter Code 📧</h2>
            <p style={styles.subtitle}>Check your email for the 6-digit verification code.</p>
          </div>

          <div style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>6-Digit Security Code</label>
              <div style={styles.inputWrapper}>
                <Lock size={18} color="#64748b" style={styles.fieldIcon} />
                <input
                  placeholder="0 0 0 0 0 0"
                  value={otp}
                  maxLength="6"
                  onChange={(e) => setOtp(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <button 
                onClick={verifyOTP} 
                style={styles.button} 
                disabled={loading}
            >
              <span>{loading ? "Verifying..." : "Verify OTP"}</span>
              {!loading && <ArrowRight size={18} />}
            </button>
          </div>

          <div style={styles.cardFooter}>
            <p style={styles.footerText}>
              Didn't get the code? <span style={styles.linkText} onClick={() => navigate("/forgot-password")}>Resend Code</span>
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
    background: "rgba(16, 185, 129, 0.15)", // Greenish for verification
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
    filter: "drop-shadow(0 0 20px rgba(16, 185, 129, 0.4))",
  },
  iconGlow: {
    position: "absolute",
    top: 0, left: 0,
    width: "54px", height: "54px",
    background: "rgba(16, 185, 129, 0.3)",
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
    color: "#10b981",
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
    fontSize: "22px", // Larger for OTP
    fontWeight: "600",
    letterSpacing: "4px", // Spaced for OTP
    textAlign: "center",
    outline: "none",
    transition: "all 0.2s ease",
  },
  button: {
    marginTop: "10px",
    padding: "16px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)",
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

export default VerifyOTP;