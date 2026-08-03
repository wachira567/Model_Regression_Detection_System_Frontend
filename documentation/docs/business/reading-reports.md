---
sidebar_position: 2
---

# How to Read the Reports

When an evaluation finishes running, you can view the results on the main **Eval Runs** Dashboard. Understanding how to read these metrics is critical to making go/no-go decisions on product releases.

---

## 📊 The Core Metrics

Every single evaluation run produces three primary metrics.

### 1. Accuracy (Percentage)
This is the hardest, most objective metric. It measures exactly how many test cases the AI got 100% correct based on your strict expectations.
- **Example:** If 95 out of 100 test cases matched the exact expected JSON schema and data, the Accuracy is **95%**.
- **When to worry:** If Accuracy drops by more than 3% (the standard Warning Threshold), a recent update likely broke a core feature.

### 2. Relevance (Score out of 5)
Sometimes the AI gets the formatting wrong, but the *answer* was still fundamentally correct and helpful to the user. Relevance is scored contextually by a superior AI Judge (like GPT-4o).
- **Example:** The AI was supposed to return `{"category": "refund"}` but it returned `{"category": "returns"}`. The Accuracy score fails, but the Relevance score might still be a **4/5** because it was very close.
- **When to worry:** If Relevance drops below a 4.0 average, the AI is hallucinating or providing useless answers to users.

### 3. Latency (Milliseconds)
This measures how long the AI took to generate the response.
- **Example:** The average response took **1200ms** (1.2 seconds).
- **When to worry:** If you switch to a heavier, smarter model, Latency might spike. If the AI takes 5+ seconds to reply, users will abandon your app, regardless of how smart the answer is.

---

## 🚨 Understanding Regressions

If a run is marked with a red **Failed** badge, it means a regression was detected. 

A regression simply means the AI performed worse than the established baseline. 

When you click into a failed run, MRDS will show you exactly which test cases failed, and an "AI Judge" will provide a plain-English explanation of *why* it failed.

:::warning Example of a Regression
**Test Case:** "I want to return this shirt, it's too small."  
**Old AI Answer:** "I can help with that! Here is a link to our 30-day return policy."  
**New AI Answer:** "I cannot process returns for food items."  

**Judge's Verdict:** *The new model hallucinated the item type (food instead of clothing) and provided a negative user experience.*
:::

## 📉 Drift Detection

On the **Analytics** page, you will see rolling 7-day averages. This is called **Drift Detection**. 
Sometimes, an AI provider (like OpenAI) silently updates their models in the background. Your code didn't change, but suddenly the AI is acting worse. Drift Detection catches this slow degradation over time.
