import { useEffect, useState } from "react";
import { api } from "../services/api.js";
import TaskList from "../components/TaskList.jsx";
import TaskForm from "../components/TaskForm.jsx";

export default function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [plan, setPlan] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const [s, t, p] = await Promise.all([api.getSubjects(), api.getTasks(), api.getPlan()]);
      setSubjects(s); setTasks(t); setPlan(p); setError("");
    } catch (e) {
      setError("Cannot reach the backend. Is it running on port 8000?");
    }
  };

  useEffect(() => { load(); }, []);

  const toggle = async (t) => { await api.updateTask(t.id, { done: !t.done }); load(); };
  const remove = async (id) => { await api.deleteTask(id); load(); };

  const addSubject = async (e) => {
    e.preventDefault();
    if (!subjectName.trim()) return;
    await api.addSubject(subjectName);
    setSubjectName("");
    load();
  };

  return (
    <>
      {error && <div className="card">{error}</div>}

      <div className="card">
        <h3>Subjects</h3>
        <form onSubmit={addSubject}>
          <input value={subjectName} onChange={(e) => setSubjectName(e.target.value)} placeholder="New subject" />
          <button type="submit">Add</button>
        </form>
        <p>{subjects.map((s) => s.name).join(", ") || "No subjects yet."}</p>
      </div>

      <div className="card">
        <h3>Today's plan</h3>
        <TaskList tasks={plan} onToggle={toggle} onDelete={remove} />
      </div>

      <div className="card">
        <h3>All tasks</h3>
        <TaskForm subjects={subjects} onAdd={async (t) => { await api.addTask(t); load(); }} />
        <TaskList tasks={tasks} onToggle={toggle} onDelete={remove} />
      </div>
    </>
  );
}
