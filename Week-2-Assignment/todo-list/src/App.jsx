import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [myTodos, setMyTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState("all"); // all, completed, not_completed, az, za

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    const allTodos = localStorage.getItem("todos");
    setMyTodos(JSON.parse(allTodos) || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoInput.trim()) return;
    const getTodo = localStorage.getItem("todos");
    const allTodos = getTodo ? JSON.parse(getTodo) : [];
    allTodos.push({
      id: Date.now().toString(),
      todo: todoInput,
      isComplete: false,
    });
    localStorage.setItem("todos", JSON.stringify(allTodos));
    setTodoInput("");
    alert("ToDo Added");
    getTodos();
  };

  const handleEdit = (id) => {
    const todoToEdit = myTodos.find((t) => t.id === id);
    setEditId(id);
    setEditInput(todoToEdit.todo);
    setShowModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editInput.trim()) return;
    const updatedTodos = myTodos.map((t) =>
      t.id === editId ? { ...t, todo: editInput } : t
    );
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowModal(false);
    setEditId(null);
    setEditInput("");
    getTodos();
  };

  const handleDelete = (id) => {
    const updatedTodos = myTodos.filter((t) => t.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    getTodos();
  };

  const handleComplete = (id) => {
    const updatedTodos = myTodos.map((t) =>
      t.id === id ? { ...t, isComplete: !t.isComplete } : t
    );
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    getTodos();
  };

  // Filtering and Sorting Logic
  let filteredTodos = [...myTodos];
  if (filterType === "completed") {
    filteredTodos = filteredTodos.filter((t) => t.isComplete);
  } else if (filterType === "not_completed") {
    filteredTodos = filteredTodos.filter((t) => !t.isComplete);
  }
  if (filterType === "az") {
    filteredTodos.sort((a, b) => a.todo.localeCompare(b.todo));
  } else if (filterType === "za") {
    filteredTodos.sort((a, b) => b.todo.localeCompare(a.todo));
  }

  return (
    <>
      <h1>CSI - Celebal Technologies</h1>
      <p>Week 2 - Assignment | TODO List</p>

      <div className="container">
        <form className="formContainer" onSubmit={handleSubmit}>
          <input
            type="text"
            name="todo"
            id="todo"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder="Enter your todo..."
          />
          <button type="submit">Add Todo</button>
        </form>
        {/* Filter Icon and Dropdown */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
            position: "relative",
          }}
        >
          <button
            onClick={() => setFilterOpen((prev) => !prev)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.5rem",
              color: "#fff",
              padding: "4px 8px",
              borderRadius: "50%",
              transition: "background 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Filter"
            title="Filter & Sort"
          >
            <span
              style={{
                background: "#fff",
                borderRadius: "50%",
                padding: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/filter.png"
                alt="Filter"
                style={{
                  width: 28,
                  height: 28,
                  background: "#fff",
                  borderRadius: "50%",
                }}
              />
            </span>
          </button>
          {filterOpen && (
            <div
              style={{
                position: "absolute",
                top: "36px",
                right: 0,
                background: "#23233b",
                borderRadius: "8px",
                boxShadow: "0 2px 8px 0 rgba(31,38,135,0.25)",
                zIndex: 10,
                minWidth: "170px",
                padding: "8px 0",
              }}
            >
              <div
                style={{
                  padding: "8px 20px",
                  color: filterType === "completed" ? "#6a82fb" : "#fff",
                  cursor: "pointer",
                  fontWeight: filterType === "completed" ? 700 : 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                onClick={() => {
                  setFilterType("completed");
                  setFilterOpen(false);
                }}
              >
                <span
                  style={{
                    background: "#fff",
                    borderRadius: "50%",
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/complete.png"
                    alt="Completed"
                    style={{
                      width: 20,
                      height: 20,
                      background: "#fff",
                      borderRadius: "50%",
                    }}
                  />
                </span>
                Completed
              </div>
              <div
                style={{
                  padding: "8px 20px",
                  color: filterType === "not_completed" ? "#6a82fb" : "#fff",
                  cursor: "pointer",
                  fontWeight: filterType === "not_completed" ? 700 : 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                onClick={() => {
                  setFilterType("not_completed");
                  setFilterOpen(false);
                }}
              >
                <span
                  style={{
                    background: "#fff",
                    borderRadius: "50%",
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/incomplete.png"
                    alt="Not Completed"
                    style={{
                      width: 20,
                      height: 20,
                      background: "#fff",
                      borderRadius: "50%",
                    }}
                  />
                </span>
                Not Completed
              </div>
              <div
                style={{
                  padding: "8px 20px",
                  color: filterType === "az" ? "#6a82fb" : "#fff",
                  cursor: "pointer",
                  fontWeight: filterType === "az" ? 700 : 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                onClick={() => {
                  setFilterType("az");
                  setFilterOpen(false);
                }}
              >
                <span
                  style={{
                    background: "#fff",
                    borderRadius: "50%",
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/az.png"
                    alt="Sort by A-Z"
                    style={{
                      width: 20,
                      height: 20,
                      background: "#fff",
                      borderRadius: "50%",
                    }}
                  />
                </span>
                Sort by A-Z
              </div>
              <div
                style={{
                  padding: "8px 20px",
                  color: filterType === "za" ? "#6a82fb" : "#fff",
                  cursor: "pointer",
                  fontWeight: filterType === "za" ? 700 : 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                onClick={() => {
                  setFilterType("za");
                  setFilterOpen(false);
                }}
              >
                <span
                  style={{
                    background: "#fff",
                    borderRadius: "50%",
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/za.png"
                    alt="Sort by Z-A"
                    style={{
                      width: 20,
                      height: 20,
                      background: "#fff",
                      borderRadius: "50%",
                    }}
                  />
                </span>
                Sort by Z-A
              </div>
              <div
                style={{
                  padding: "8px 20px",
                  color: filterType === "all" ? "#6a82fb" : "#fff",
                  cursor: "pointer",
                  fontWeight: filterType === "all" ? 700 : 500,
                }}
                onClick={() => {
                  setFilterType("all");
                  setFilterOpen(false);
                }}
              >
                Show All
              </div>
            </div>
          )}
        </div>
        {filteredTodos.length > 0 ? (
          <div
            style={{
              overflowX: "hidden",
              overflowY: "auto",
              maxHeight: "300px",
              width: "100%",
            }}
          >
            {filteredTodos.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#23233b",
                  color: "#fff",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  opacity: item.isComplete ? 0.6 : 1,
                  textDecoration: item.isComplete ? "line-through" : "none",
                }}
              >
                <span>{item.todo}</span>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <button
                    className="completeTodo"
                    style={{
                      background: "#fff",
                      border: "none",
                      cursor: "pointer",
                      padding: 4,
                      outline: "none",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 1px 4px 0 rgba(0,0,0,0.10)",
                    }}
                    onClick={() => handleComplete(item.id)}
                    title={
                      item.isComplete
                        ? "Mark as Incomplete"
                        : "Mark as Complete"
                    }
                  >
                    <img
                      src={
                        item.isComplete ? "/complete.png" : "/incomplete.png"
                      }
                      alt={item.isComplete ? "Completed" : "Incomplete"}
                      style={{
                        width: 24,
                        height: 24,
                        background: "#fff",
                        borderRadius: "50%",
                      }}
                    />
                  </button>
                  <button
                    className="editTodo"
                    style={{
                      background: "#fff",
                      border: "none",
                      cursor: "pointer",
                      padding: 4,
                      outline: "none",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 1px 4px 0 rgba(0,0,0,0.10)",
                    }}
                    onClick={() => handleEdit(item.id)}
                    title="Edit"
                  >
                    <img
                      src="/edit.png"
                      alt="Edit"
                      style={{
                        width: 24,
                        height: 24,
                        background: "#fff",
                        borderRadius: "50%",
                      }}
                    />
                  </button>
                  <button
                    className="deleteTodo"
                    style={{
                      background: "#fff",
                      border: "none",
                      cursor: "pointer",
                      padding: 4,
                      outline: "none",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 1px 4px 0 rgba(0,0,0,0.10)",
                    }}
                    onClick={() => handleDelete(item.id)}
                    title="Delete"
                  >
                    <img
                      src="/delete.png"
                      alt="Delete"
                      style={{
                        width: 24,
                        height: 24,
                        background: "#fff",
                        borderRadius: "50%",
                      }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "red" }}>No Todos available</p>
        )}
      </div>

      {/* Modal for editing */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#23233b",
              padding: "32px 24px",
              borderRadius: "12px",
              minWidth: "320px",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 style={{ color: "#fff", marginBottom: "16px" }}>Edit Todo</h2>
            <form onSubmit={handleUpdate} style={{ width: "100%" }}>
              <input
                type="text"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #a3a3a3",
                  marginBottom: "16px",
                  fontSize: "1rem",
                }}
                autoFocus
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    background: "#ccc",
                    color: "#23233b",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background:
                      "linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
