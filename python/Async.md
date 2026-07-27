## Async in Python (for the microservice phase)

**What:** `async`/`await`, same core idea as JS, different libraries under the hood.

**Why:** Needed when building an API with FastAPI, or making concurrent HTTP requests.

**How (with FastAPI):**
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/summary")
async def get_summary():
    # await some_async_db_call()
    return {"completed": 5, "pending": 3}
```

**Common mistake:** Assuming all Python I/O is automatically async like Node's — it isn't. You need async-aware libraries (`httpx` instead of `requests`, `motor` instead of `pymongo`) to actually get non-blocking behavior.