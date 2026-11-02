import { useState } from "react";

export default function TaskForm({ subjects, onAdd }) {
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [priority, setPriority] = useState(2);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !subjectId) return;
    onAdd({ title, priority: Number(priority), subject_id: Number(subjectId) });
    setTitle("");
  };

  return (
    <form onSubmit={submit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task" />
      <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
        <option value="">Subject</option>
        {subjects.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value={1}>High</option>
        <option value={2}>Medium</option>
        <option value={3}>Low</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}
