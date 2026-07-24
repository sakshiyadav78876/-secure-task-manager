import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LogOut, 
  Plus, 
  Search, 
  CheckCircle, 
  Circle, 
  Trash2, 
  Edit3, 
  Save,  
  LayoutDashboard, 
  CheckSquare, 
  Clock, 
  User,
  ShieldCheck
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // --- EXISTING LOGIC (UNCHANGED) ---
  const name = localStorage.getItem("name") || "User";
  const email = localStorage.getItem("email") || "";
  const token = localStorage.getItem("token");

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.done).length;
  const pendingTasks = tasks.filter((t) => !t.done).length;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await fetch("https://secure-task-manager-backend-ooxa.onrender.com/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, [token, navigate]);

  const addTask = async () => {
    if (!task.trim()) return;
    try {
      const res = await fetch("https://secure-task-manager-backend-ooxa.onrender.com/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: task }),
      });
      const data = await res.json();
      setTasks((prev) => [...prev, data]);
      setTask("");
    } catch (err) { console.log(err); }
  };

  const toggleTask = async (id) => {
    try {
      const res = await fetch(`https://secure-task-manager-backend-ooxa.onrender.com/api/tasks/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) { console.log(err); }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`https://secure-task-manager-backend-ooxa.onrender.com/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) { console.log(err); }
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    try {
      const res = await fetch(`https://secure-task-manager-backend-ooxa.onrender.com/api/tasks/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: editText }),
      });
      const updated = await res.json();
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
      setEditingId(null);
      setEditText("");
    } catch (err) { console.log(err); }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // --- NEW PREMIUM UI RETURN ---
  return (
    <div style={styles.dashboardWrapper}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarBrand}>
          <ShieldCheck color="#22d3ee" size={28} />
          <span style={styles.brandName}>SecureTask</span>
        </div>
        
        <nav style={styles.nav}>
          <div style={{...styles.navItem, ...styles.activeNav}}>
            <LayoutDashboard size={20} /> <span>Overview</span>
          </div>
          <div style={styles.navItem}>
            <CheckSquare size={20} /> <span>All Tasks</span>
          </div>
        </nav>

        <div style={styles.profileSection}>
          <div style={styles.avatarBox}>
            <User size={20} />
          </div>
          <div style={styles.userInfo}>
            <p style={styles.userName}>{name}</p>
            <p style={styles.userEmail}>{email.split('@')[0]}...</p>
          </div>
          <button onClick={logout} style={styles.iconBtnLogout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.mainContent}>
        {/* HEADER */}
        <header style={styles.topHeader}>
          <div>
            <h1 style={styles.greeting}>Welcome back, {name.split(' ')[0]} 👋</h1>
            <p style={styles.dateText}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div style={styles.searchWrapper}>
            <Search size={18} style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput} 
            />
          </div>
        </header>

        {/* STATS GRID */}
        <div style={styles.statsGrid}>
          <div style={{...styles.statCard, borderBottom: '3px solid #7c3aed'}}>
            <div style={styles.statInfo}>
              <p style={styles.statLabel}>Total Tasks</p>
              <h3 style={styles.statValue}>{totalTasks}</h3>
            </div>
            <LayoutDashboard size={24} color="#7c3aed" opacity={0.5} />
          </div>
          <div style={{...styles.statCard, borderBottom: '3px solid #10b981'}}>
            <div style={styles.statInfo}>
              <p style={styles.statLabel}>Completed</p>
              <h3 style={styles.statValue}>{completedTasks}</h3>
            </div>
            <CheckCircle size={24} color="#10b981" opacity={0.5} />
          </div>
          <div style={{...styles.statCard, borderBottom: '3px solid #f59e0b'}}>
            <div style={styles.statInfo}>
              <p style={styles.statLabel}>Pending</p>
              <h3 style={styles.statValue}>{pendingTasks}</h3>
            </div>
            <Clock size={24} color="#f59e0b" opacity={0.5} />
          </div>
        </div>

        {/* ADD TASK BOX */}
        <div style={styles.addTaskContainer}>
          <div style={styles.inputWrapper}>
            <input 
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="What needs to be done?" 
              style={styles.taskInput}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <button onClick={addTask} style={styles.addBtn}>
              <Plus size={20} /> Add Task
            </button>
          </div>
        </div>

        {/* TASK LIST */}
        <div style={styles.taskListContainer}>
          {tasks.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}><CheckSquare size={48} opacity={0.2} /></div>
              <p>No tasks found. Time to relax! ✨</p>
            </div>
          ) : (
            <div style={styles.gridList}>
              {tasks
                .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()))
                .map((t) => (
                  <div key={t._id} style={t.done ? {...styles.taskCard, ...styles.taskDone} : styles.taskCard}>
                    <div style={styles.taskMain}>
                      <button onClick={() => toggleTask(t._id)} style={styles.checkBtn}>
                        {t.done ? <CheckCircle size={22} color="#10b981" /> : <Circle size={22} color="#475569" />}
                      </button>
                      
                      {editingId === t._id ? (
                        <input 
                          autoFocus
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          style={styles.editingInput}
                          onKeyPress={(e) => e.key === 'Enter' && saveEdit(t._id)}
                        />
                      ) : (
                        <span style={t.done ? styles.taskTextDone : styles.taskText}>
                          {t.text}
                        </span>
                      )}
                    </div>

                    <div style={styles.taskActions}>
                      {editingId === t._id ? (
                        <button onClick={() => saveEdit(t._id)} style={styles.actionBtnSave}>
                          <Save size={18} />
                        </button>
                      ) : (
                        <button onClick={() => { setEditingId(t._id); setEditText(t.text); }} style={styles.actionBtn}>
                          <Edit3 size={18} />
                        </button>
                      )}
                      <button onClick={() => deleteTask(t._id)} style={styles.actionBtnDel}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- STYLES OBJECT (PRODUCTION UI) ---
const styles = {
  dashboardWrapper: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    background: "#030712",
    color: "#f8fafc",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden",
  },
  sidebar: {
    width: "260px",
    background: "#090e1a",
    borderRight: "1px solid rgba(255,255,255,0.05)",
    display: "flex",
    flexDirection: "column",
    padding: "32px 20px",
  },
  sidebarBrand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "48px",
    paddingLeft: "10px",
  },
  brandName: {
    fontSize: "20px",
    fontWeight: "800",
    letterSpacing: "-0.5px",
  },
  nav: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "12px",
    color: "#94a3b8",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  activeNav: {
    background: "rgba(124, 58, 237, 0.1)",
    color: "#a855f7",
    fontWeight: "600",
  },
  profileSection: {
    marginTop: "auto",
    background: "rgba(255,255,255,0.03)",
    padding: "16px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatarBox: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    flex: 1,
    overflow: "hidden",
  },
  userName: {
    fontSize: "14px",
    fontWeight: "600",
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  userEmail: {
    fontSize: "12px",
    color: "#64748b",
    margin: 0,
  },
  iconBtnLogout: {
    background: "none",
    border: "none",
    color: "#ef4444",
    cursor: "pointer",
    padding: "4px",
  },

  mainContent: {
    flex: 1,
    padding: "40px 60px",
    overflowY: "auto",
  },
  topHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },
  greeting: {
    fontSize: "28px",
    fontWeight: "700",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  dateText: {
    color: "#64748b",
    margin: "4px 0 0 0",
  },
  searchWrapper: {
    position: "relative",
    width: "300px",
  },
  searchIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#475569",
  },
  searchInput: {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "12px 12px 12px 42px",
    borderRadius: "12px",
    color: "#fff",
    outline: "none",
  },

  statsGrid: {
    display: "flex",
    gap: "24px",
    marginBottom: "40px",
  },
  statCard: {
    flex: 1,
    background: "rgba(255,255,255,0.02)",
    padding: "24px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.05)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statLabel: {
    fontSize: "14px",
    color: "#94a3b8",
    margin: "0 0 8px 0",
  },
  statValue: {
    fontSize: "32px",
    fontWeight: "700",
    margin: 0,
  },

  addTaskContainer: {
    marginBottom: "32px",
  },
  inputWrapper: {
    display: "flex",
    gap: "12px",
    background: "rgba(255,255,255,0.02)",
    padding: "8px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.05)",
  },
  taskInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    padding: "12px 16px",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
  },
  addBtn: {
    background: "#7c3aed",
    color: "#fff",
    border: "none",
    padding: "0 24px",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "background 0.2s",
  },

  taskListContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  taskCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 24px",
    background: "rgba(255,255,255,0.02)",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.05)",
    transition: "transform 0.2s ease, background 0.2s ease",
  },
  taskDone: {
    background: "rgba(255,255,255,0.01)",
    opacity: 0.7,
  },
  taskMain: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flex: 1,
  },
  checkBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
  },
  taskText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#e2e8f0",
  },
  taskTextDone: {
    fontSize: "16px",
    color: "#64748b",
    textDecoration: "line-through",
  },
  editingInput: {
    flex: 1,
    background: "rgba(0,0,0,0.2)",
    border: "1px solid #7c3aed",
    borderRadius: "8px",
    padding: "4px 12px",
    color: "#fff",
    fontSize: "16px",
    outline: "none",
  },
  taskActions: {
    display: "flex",
    gap: "10px",
  },
  actionBtn: {
    background: "none",
    border: "none",
    color: "#64748b",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
    transition: "all 0.2s",
  },
  actionBtnSave: {
    background: "rgba(245, 158, 11, 0.1)",
    border: "none",
    color: "#f59e0b",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
  },
  actionBtnDel: {
    background: "rgba(239, 68, 68, 0.1)",
    border: "none",
    color: "#ef4444",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 0",
    color: "#64748b",
  },
  emptyIcon: {
    marginBottom: "16px",
  }
};

export default Dashboard;