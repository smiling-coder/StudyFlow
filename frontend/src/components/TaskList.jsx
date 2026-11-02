export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) return <p>No tasks yet.</p>;
  return (
    <ul>
      {tasks.map((t) => (
        <li key={t.id} className={t.done ? "done" : ""}>
          <input type="checkbox" checked={t.done} onChange={() => onToggle(t)} />
          <span>{t.title}</span>
          <button onClick={() => onDelete(t.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
