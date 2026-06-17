import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

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
      navigate("/");
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      const res = await fetch("http://localhost:5000/api/tasks", {
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
    } catch (err) {
      console.log(err);
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updated = await res.json();

      setTasks((prev) =>
        prev.map((t) => (t._id === id ? updated : t))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/tasks/edit/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: editText,
          }),
        }
      );

      const updated = await res.json();

      setTasks((prev) =>
        prev.map((t) => (t._id === id ? updated : t))
      );

      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h2>Task Dashboard</h2>
          <p style={styles.sub}>
            Welcome back, {name} 👋
          </p>
        </div>

        <div style={styles.userBox}>
          <strong>{email}</strong>
        </div>

        <button
          onClick={logout}
          style={styles.logout}
        >
          Logout
        </button>
      </div>

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h2>{totalTasks}</h2>
          <p>Total</p>
        </div>

        <div style={styles.statCard}>
          <h2>{completedTasks}</h2>
          <p>Completed</p>
        </div>

        <div style={styles.statCard}>
          <h2>{pendingTasks}</h2>
          <p>Pending</p>
        </div>
      </div>

      <div style={styles.card}>
        <input
          value={task}
          onChange={(e) =>
            setTask(e.target.value)
          }
          placeholder="Write your task..."
          style={styles.input}
        />

        <button
          onClick={addTask}
          style={styles.addBtn}
        >
          + Add Task
        </button>
      </div>

      <input
        type="text"
        placeholder="🔍 Search Tasks..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          ...styles.input,
          marginTop: "15px",
          width: "100%",
        }}
      />

      <div style={styles.list}>
        {tasks.length === 0 && (
          <p style={styles.empty}>
            No tasks yet ✨
          </p>
        )}

        {tasks
          .filter((t) =>
            t.text
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((t) => (
            <div
              key={t._id}
              style={styles.taskCard}
            >
              <div style={{ flex: 1 }}>
                {editingId === t._id ? (
                  <input
                    value={editText}
                    onChange={(e) =>
                      setEditText(
                        e.target.value
                      )
                    }
                    style={styles.editInput}
                  />
                ) : (
                  <span
                    style={{
                      textDecoration: t.done
                        ? "line-through"
                        : "none",
                      opacity: t.done
                        ? 0.6
                        : 1,
                      fontWeight: "500",
                    }}
                  >
                    {t.text}
                  </span>
                )}
              </div>

              <div style={styles.actions}>
                {editingId === t._id ? (
                  <button
                    onClick={() =>
                      saveEdit(t._id)
                    }
                    style={styles.save}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(t._id);
                      setEditText(t.text);
                    }}
                    style={styles.edit}
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() =>
                    toggleTask(t._id)
                  }
                  style={styles.done}
                >
                  {t.done
                    ? "Undo"
                    : "Done"}
                </button>

                <button
                  onClick={() =>
                    deleteTask(t._id)
                  }
                  style={styles.del}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;

const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
    background:
      "linear-gradient(-45deg,#0f172a,#1e293b,#6366f1,#9333ea)",
    padding: "20px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    background:
      "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    color: "white",
  },

  sub: {
    opacity: 0.8,
  },

  userBox: {
    color: "white",
  },

  logout: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  stats: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
  },

  statCard: {
    flex: 1,
    background:
      "rgba(255,255,255,0.1)",
    color: "white",
    borderRadius: "15px",
    textAlign: "center",
    padding: "20px",
    backdropFilter: "blur(10px)",
  },

  card: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
  },

  editInput: {
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
    border: "none",
  },

  addBtn: {
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "12px 15px",
    cursor: "pointer",
  },

  list: {
    marginTop: "20px",
  },

  empty: {
    textAlign: "center",
    color: "white",
  },

  taskCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
    padding: "15px",
    borderRadius: "12px",
    background:
      "rgba(255,255,255,0.1)",
    color: "white",
  },

  actions: {
    display: "flex",
    gap: "8px",
  },

  edit: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
  },

  save: {
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
  },

  done: {
    background: "#10b981",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
  },

  del: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "8px",
  },
};