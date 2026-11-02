import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  return (
    <div className="container">
      <h1>StudyFlow AI</h1>
      <p>Plan your study, one task at a time.</p>
      <Dashboard />
      <footer style={{ marginTop: 24, fontSize: 14 }}>
        <a href="https://github.com/smiling-coder/StudyFlow" target="_blank" rel="noreferrer">GitHub</a>
        {" · "}
        <a href="https://studyflow-2-221n.onrender.com/docs" target="_blank" rel="noreferrer">API Docs</a>
      </footer>
    </div>
  );
}
