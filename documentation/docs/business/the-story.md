---
sidebar_position: 2
---

# How It Works (The Story)

To truly understand how this platform fits into your company's daily operations, let's walk through a complete, start-to-finish story of a team using the system. 

We'll pretend your app is deployed and live at **regression.com**.

---

### Step 1: The Sign-Up (The Empty Room)
Sarah is a Product Manager at a company called *TravelBuddy*, which uses AI to book flights. She is tired of her engineers accidentally breaking the AI, so she visits **regression.com** and clicks "Sign Up".

She creates an account using her Google email. Under the hood, our system creates a secure, invisible "Room" (Workspace) that belongs *only* to TravelBuddy. Right now, the room is completely empty.

### Step 2: Teaching the System (The Answer Key)
Sarah logs into her beautiful dashboard on regression.com. She goes to the "Datasets" tab and starts teaching the system how her AI *should* behave.

She types in 50 test questions like: *"I need a flight to Paris under $500."*
She then types in the exact perfect answers she expects the AI to give. 

She has just created TravelBuddy's **Golden Dataset**. Because of our multi-tenant architecture, absolutely nobody else on regression.com can see this data.

### Step 3: Getting the Secret Key (The ID Badge)
For her engineers to actually use this, regression.com needs a way to recognize them automatically. 

Sarah goes to the "Settings" tab and clicks **"Generate API Key"**. The system gives her a long, random password (e.g., `sk_travelbuddy_987654321`). She copies this password and hands it to her lead engineer, David.

### Step 4: Connecting the Wires (The Automation)
David (the engineer) doesn't even need to visit regression.com! He just takes that Secret Key and pastes it into TravelBuddy's GitHub settings. 

He adds a tiny script to their code that says: *"Hey GitHub, before you let me release any new code to our customers, take this Secret Key, knock on the door at regression.com, and ask for a test."*

### Step 5: The Magic (The Daily Workflow)
A week later, David tries to update their AI to make it sound more polite. He clicks "Submit" on his code.

1. David's code automatically knocks on **regression.com** and hands over the Secret Key.
2. Our backend looks at the key and says, *"Ah, you are from TravelBuddy! Let me unlock Sarah's specific Workspace."*
3. Our backend grabs Sarah's 50 flight questions and throws them at David's new polite AI.
4. Our backend grades the results. It notices that while the AI is more polite, it forgot how to search for flights under $500!
5. Our backend sends a big red **FAILED** message straight back to David's screen, physically blocking him from releasing the broken AI to their customers.

Sarah gets an email saying *"Regression Prevented"*, and she didn't have to lift a finger.

---

### Summary
The non-tech savvy people (like Sarah) use the **Dashboard** to write the test questions and view the beautiful reports. The tech-savvy people (like David) just plug the **Secret Key** into their code, and let the automation do the rest!
