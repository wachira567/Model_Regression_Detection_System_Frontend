---
sidebar_position: 3
---

# Adding Test Cases

The system is only as smart as the "Golden Dataset" we give it. If customers start asking new types of questions, we need to add those to the dataset so the system knows how to test them.

## What makes a good test case?

A good test case is a real-world example of something a user might say, paired with exactly how you want the AI to handle it.

* **Input:** What the user says (e.g., "I lost my password").
* **Expected Output:** What the AI *should* do (e.g., "Category: Account Support, Summary: User requesting password reset").

## How to add one

Right now, you can add new test cases directly through the **Datasets Page** in the dashboard.

1. Navigate to the **Datasets** tab.
2. Select the dataset you want to update (e.g., `email_classifier_golden`).
3. Click **Add Case**.
4. Fill out the Input and Expected Output fields in plain English.
5. Click Save.

The next time the engineers try to update the AI, your new test case will automatically be included in the evaluation!
