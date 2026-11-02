from datetime import date
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class SubjectCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)


class SubjectOut(SubjectCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int


class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    priority: int = Field(default=2, ge=1, le=3)
    due_date: Optional[date] = None
    subject_id: int


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    priority: Optional[int] = Field(default=None, ge=1, le=3)
    due_date: Optional[date] = None
    done: Optional[bool] = None


class TaskOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    priority: int
    due_date: Optional[date]
    done: bool
    subject_id: int
