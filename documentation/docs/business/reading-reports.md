---
sidebar_position: 2
---

# Reading the Reports

When an evaluation finishes, you will be able to see the results on the main Dashboard. Here is how to understand what you are looking at.

## The Dashboard Trends

At the top of the dashboard, you will see two main charts:

1. **Accuracy Trend:** This shows how accurate the AI has been over the last 7 days. You want this line to stay high and flat, or slowly climb. If it drops suddenly, it means a recent update broke something.
2. **Latency Trend:** This shows how fast the AI responds (measured in milliseconds). Lower is better. If the line spikes, the AI is taking too long to think.

## Understanding a "Run"

A "Run" is a single test of the AI against our golden dataset. When you click into a specific run, you will see three key metrics:

* **Accuracy:** The percentage of test cases the AI got completely right.
* **Relevance:** A score out of 5. Even if the AI got the answer slightly wrong, was the response still relevant and helpful?
* **Latency:** How many milliseconds it took on average to answer.

## Regressions

If a run is marked as **Failed**, it means a regression was detected. A regression simply means the AI performed worse than the established baseline. The system will highlight exactly which test cases it failed, and an "AI Judge" will provide a plain-English explanation of *why* it failed (e.g., "The new model forgot to mention the 30-day return policy").
