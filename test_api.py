def test_health(client):
    r = client.get("/")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_subject_and_task_flow(client):
    s = client.post("/subjects", json={"name": "Python"})
    assert s.status_code == 201
    sid = s.json()["id"]

    t = client.post("/tasks", json={"title": "Finish loops", "priority": 1, "subject_id": sid})
    assert t.status_code == 201
    tid = t.json()["id"]

    done = client.patch(f"/tasks/{tid}", json={"done": True})
    assert done.json()["done"] is True


def test_duplicate_subject(client):
    client.post("/subjects", json={"name": "DBMS"})
    r = client.post("/subjects", json={"name": "DBMS"})
    assert r.status_code == 409


def test_daily_plan_orders_by_priority(client):
    sid = client.post("/subjects", json={"name": "DS"}).json()["id"]
    client.post("/tasks", json={"title": "low", "priority": 3, "subject_id": sid})
    client.post("/tasks", json={"title": "high", "priority": 1, "subject_id": sid})
    plan = client.get("/plan/today").json()
    assert [t["title"] for t in plan] == ["high", "low"]
