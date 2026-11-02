from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/subjects", tags=["subjects"])


@router.post("", response_model=schemas.SubjectOut, status_code=201)
def create_subject(data: schemas.SubjectCreate, db: Session = Depends(get_db)):
    if db.query(models.Subject).filter_by(name=data.name).first():
        raise HTTPException(409, "Subject already exists")
    subject = models.Subject(name=data.name)
    db.add(subject)
    db.commit()
    db.refresh(subject)
    return subject


@router.get("", response_model=List[schemas.SubjectOut])
def list_subjects(db: Session = Depends(get_db)):
    return db.query(models.Subject).all()


@router.delete("/{subject_id}", status_code=204)
def delete_subject(subject_id: int, db: Session = Depends(get_db)):
    subject = db.get(models.Subject, subject_id)
    if not subject:
        raise HTTPException(404, "Subject not found")
    db.delete(subject)
    db.commit()
