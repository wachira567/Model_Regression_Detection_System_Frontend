---
sidebar_position: 1
---

# Product Manager's Guide to MRDS

Welcome to the **Model Regression Detection System (MRDS)**.

If you are a product manager, QA specialist, or business stakeholder, this guide is designed specifically for you. We will break down exactly what this system does, the ROI it brings to the company, and how you interact with it on a daily basis.

---

## 🎯 What is MRDS?

Imagine you have a smart AI assistant built into your company's mobile app. You want to make sure that when your engineering team updates the assistant's instructions (the "prompt") to make it friendlier, they don't accidentally make it worse at answering billing questions.

This system acts as an **Automated Quality Assurance Gatekeeper**.

Whenever an engineer attempts to update the AI's logic, this system automatically stops them, grabs a **Golden Dataset** (a carefully curated list of 100+ real-world user questions and the exact perfect answers we expect), and forces the new AI to take a test.

If the new AI performs worse than the old AI (a **Regression**), the system sounds the alarm and physically blocks the engineers from releasing the bad update to customers.

---

## 📈 The Business Value (ROI)

1. **Catch Mistakes Before Customers Do**  
   Traditionally, AI teams ship updates blindly and wait for support tickets to roll in to realize they broke something. MRDS catches these breaks in a safe, simulated environment.
   
2. **Objective Measurement**  
   Instead of subjective "it feels better", leadership gets hard, quantitative data (e.g., *"The new model is 94% accurate, up 2% from last week"*).
   
3. **Increased Shipping Velocity**  
   Engineers can push updates rapidly and confidently. They know the automated safety net will catch them if they fall, eliminating the "fear of deployment."

---

## 🔄 The Business Workflow

How does a Product Manager fit into this system?

1. **Identify Gaps:** You notice customers are asking a new type of question (e.g., about a new product line).
2. **Add to Golden Dataset:** You use the MRDS Dashboard to add this new question to the testing dataset.
3. **Engineers Update AI:** The engineering team tweaks the AI to answer the new question.
4. **MRDS Tests:** MRDS runs a test. It verifies the AI can now answer the new question *without forgetting how to answer the old ones*.
5. **Approve or Reject:** You review the MRDS generated report. If it passes, the engineers deploy!

:::tip
Think of MRDS as an automated QA tester that works 24/7, never gets tired, and reads 10,000 test cases in seconds.
:::
