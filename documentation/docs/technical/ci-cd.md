---
sidebar_position: 2
---

# CI/CD Pipeline

The system utilizes GitHub Actions to ensure code quality, automated testing, and seamless deployments to GCP and Cloudflare.

## Workflows

1. **Backend CI (`backend-ci.yml`)**
   - Triggers on push to `main` and PRs.
   - Runs `ruff` for linting.
   - Runs `pytest` against an in-memory SQLite database (`conftest.py`).

2. **PR Evaluation Gating (`pr-eval.yml`)**
   - Triggers when files in `prompts/` or `golden-dataset/` are modified.
   - Calls the deployed FastAPI webhook to trigger an evaluation run.
   - Blocks the PR from merging if the DiffEngine reports a `CRITICAL` severity regression.

3. **Deployments**
   - **Backend (`deploy-backend.yml`):** Deploys the FastAPI Docker container to GCP Cloud Run using Workload Identity Federation.
   - **Frontend (`deploy-frontend.yml`):** Builds the Vite React app and deploys it to Cloudflare Pages.
