import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models
from .database import Base, engine
from .routes import subjects, tasks

Base.metadata.create_all(bind=engine)

app = FastAPI(title="StudyFlow AI")

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(subjects.router)
app.include_router(tasks.router)


@app.get("/")
def health():
    return {"status": "ok", "app": "StudyFlow AI"}
