---
sidebar_position: 1
---

# Architecture

The Model Regression Detection System is a decoupled, async-native pipeline designed for high concurrency and robust failure handling.

## Component Overview

1. **Trigger Layer:**
   - **GitHub Webhooks:** Listens for `pull_request` events targeting specific paths (e.g., `prompts/`).
   - **Manual Triggers:** Executed via the React frontend.
2. **FastAPI Backend (Core):**
   - **API Routers:** Input validation via Pydantic.
   - **EvalEngine:** Orchestrates the evaluation pipeline.
   - **LLMRunner:** Highly concurrent `asyncio.Semaphore` based runner for executing against external LLMs without hitting rate limits.
   - **JudgeScorer:** Uses a powerful model (e.g., GPT-4o) to evaluate the outputs of a weaker/cheaper model (e.g., GPT-4o-mini).
   - **DiffEngine:** Compares current run metrics against baseline runs to calculate deltas.
3. **Data Layer (PostgreSQL):**
   - Uses `asyncpg` for non-blocking I/O.
   - Leverages `JSONB` to store flexible input/output schemas while maintaining strict relational integrity via UUID primary keys.

## Sequence Diagram

```mermaid
sequenceDiagram
    participant PR as GitHub PR
    participant API as FastAPI
    participant EE as EvalEngine
    participant LLM as External LLM
    participant DB as PostgreSQL

    PR->>API: Webhook (push to prompts/)
    API->>EE: trigger_eval_run()
    EE->>DB: create_run(status=pending)
    EE->>DB: fetch_golden_dataset()
    EE->>LLM: Concurrent evaluation (Semaphore limit: 10)
    LLM-->>EE: Results
    EE->>EE: JudgeScorer scoring
    EE->>DB: update_run(status=completed, metrics)
    API-->>PR: Post GitHub Comment with Results
```
