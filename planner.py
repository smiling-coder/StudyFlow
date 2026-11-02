from datetime import date
from typing import List
from ..models import Task


def build_daily_plan(tasks: List[Task], limit: int = 5) -> List[Task]:
    """Pick pending tasks, ordered by priority then earliest due date."""
    pending = [t for t in tasks if not t.done]
    pending.sort(key=lambda t: (t.priority, t.due_date or date.max))
    return pending[:limit]
