---
sidebar_position: 2
---

# CI/CD & Deployments

Our CI/CD pipeline is entirely managed by GitHub Actions. The goal is two-fold:
1. Ensure the code for the MRDS system itself is tested and linted.
2. Provide a webhook mechanism to block *other* repositories from merging bad prompts.

---

## 🛡 1. Backend CI (`backend-ci.yml`)

Every pull request to the MRDS repository must pass strict linting and testing.

```yaml
name: Backend CI
on:
  pull_request:
    paths:
      - 'backend/**'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install dependencies
        run: pip install -r backend/requirements-dev.txt
      - name: Lint with Ruff
        run: ruff check backend/
      - name: Run Pytest
        run: pytest backend/tests/
```
*Notice we use an in-memory SQLite database via `conftest.py` so we don't need to spin up a heavy Postgres container just to run unit tests.*

---

## 🚦 2. PR Evaluation Gating (`pr-eval.yml`)

This is the core value proposition of the system. This workflow lives in your **Product Repository** (the repo that actually houses your AI application). 

When an engineer edits a prompt file, this workflow triggers MRDS.

```yaml
name: Prompt Regression Check
on:
  pull_request:
    paths:
      - 'prompts/**'

jobs:
  evaluate:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger MRDS Webhook
        run: |
          RESPONSE=$(curl -s -X POST https://api.mrds.yourcompany.com/webhook/github \
            -H "Authorization: Bearer ${{ secrets.MRDS_API_KEY }}" \
            -d '{"pr_number": "${{ github.event.pull_request.number }}", "commit": "${{ github.sha }}"}')
          
          # Logic to parse response and fail the action if regressions > 3%
```

---

## 🚀 3. Deployments

We utilize **Google Cloud Run** for the backend due to its native scale-to-zero capabilities and robust concurrency handling. 

### Workload Identity Federation
Instead of storing long-lived GCP service account keys in GitHub Secrets (a massive security risk), we use Workload Identity Federation. GitHub authenticates to GCP via an OIDC token, receiving short-lived credentials to push the Docker container to the Artifact Registry and deploy to Cloud Run.

:::warning Security Notice
Never commit `.env` files. The FastAPI backend strictly validates configuration parameters using `Pydantic Settings`. If the `API_SECRET_KEY` is missing in production, the application will refuse to boot.
:::
