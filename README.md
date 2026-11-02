# StudyFlow AI

A study planner: track subjects, tasks and study sessions, and generate a simple daily plan.

## Live demo
Frontend: https://studyflow2-frontend.onrender.com

Backend API docs: https://studyflow-2-221n.onrender.com/docs

## Structure
- `backend/` FastAPI + SQLAlchemy + SQLite
- `frontend/` React + Vite
- `.github/workflows/tests.yml` runs backend tests and frontend build on every push

## Run the backend
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate    Mac/Linux: source .venv/bin/activate
pip install -r requirements.txt
cp ../.env.example .env
uvicorn app.main:app --reload
```
API docs: http://localhost:8000/docs

## Run the frontend
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

## Tests
```bash
cd backend
pytest
```

## Feature plan
1. Subjects (CRUD)
2. Tasks per subject with due date, priority, done status
3. Daily plan generator (`/plan/today`) ordering tasks by priority and due date
4. Next: study timer, progress charts, AI study tips
