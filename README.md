# Model Regression Detection System (MRDS) - Frontend

**The Human-in-the-Loop (HITL) Dashboard for AI Automation Workflows**

This is the React frontend for the Model Regression Detection System (MRDS). It serves as the command center for your organization's AI operations, empowering Automation Specialists and Engineers to manage AI workflows securely.

**Business Value & Capabilities:**
- **Human-in-the-Loop (HITL):** A dedicated interface for reviewing flagged, low-confidence agent executions and approving/rejecting them before business processes are impacted.
- **Workflow Orchestration Visibility:** Visualize trace runs and multi-agent operations natively through the Trace Explorer.
- **Cost & Feature Management:** Dashboards for tracking the LLM Cost Autopilot and gradually rolling out new AI Feature Flags.

## Tech Stack
- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** TailwindCSS (Corporate Slate & Indigo themes)
- **Routing:** React Router v6
- **Data Visualization:** Recharts
- **Icons:** Lucide React
- **Product Tour:** React Joyride
- **Authentication:** Google OAuth (`@react-oauth/google`) + Email OTP (Resend Fallback)

## Key Features

### 1. Enterprise Dashboards
- **Eval Runs:** Monitor LLM evaluation runs dynamically. Features server-side pagination and real-time text filtering.
- **Analytics:** Visualize rolling accuracy and latency trends dynamically loaded from the PostgreSQL analytics engine.
- **Golden Datasets:** Manage JSON-based test cases for your regressions tests.
- **Prompt Configurations:** View active and archived prompt configurations.

### 2. Super Admin & RBAC
- Built-in multi-tenant organization support.
- Secure, protected `/admin` route exclusively for users with the `is_superadmin` database flag.
- Manage users and elevate roles natively from the UI.

### 3. Server-Side Pagination
All tables across the application utilize a global `<Pagination />` component that communicates directly with the FastAPI backend, utilizing SQL `OFFSET` and `LIMIT` clauses rather than client-side rendering.

### 4. Interactive Product Tour
First-time users are greeted with an interactive product tour built on `react-joyride` that walks them through the core functionalities.

## Local Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root of the `frontend` directory:
   ```env
   VITE_API_BASE_URL="http://localhost:8000/api/v1"
   VITE_GOOGLE_CLIENT_ID="your-google-oauth-client-id"
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

4. **Build for Production**
   ```bash
   npm run build
   ```
