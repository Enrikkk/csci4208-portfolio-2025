# 🛡️ Defend the Lab

**A Computational Cybersecurity Challenge**

> **🚨 LOOKING FOR THE SOURCE CODE?**
>
> This repository serves as a showcase and landing page. The full source code, AI models, and game logic are hosted in the main repository:
>
> ### [👉 Go to the Main Defend the Lab Repository](https://github.com/LeTanPhuc-01/computer-math)

---

## 🔒 Mission Briefing

**Defend the Lab** is an interactive educational game that blends arcade-style action with computational thinking. You play as a cybersecurity administrator protecting a high-security facility holding critical national secrets.

Your firewall is under attack. Digital viruses are swarming the system, masked in different number systems. You are the last line of defense.

---

## 🧮 Gameplay Mechanics

To neutralize the threats, you must rely on your mental math and quick reflexes.
* **The Threat:** Viruses approach the center of the screen encoded in **Binary (Base-2)**, **Octal (Base-8)**, or **Hexadecimal**.
* **The Defense:** You must mentally convert these values into **Decimal (Base-10)**.
* **The Action:** Write the correct answer on your physical controller to blast the virus before it breaches the firewall.

---

## 📱 Unique Feature: AI Mobile Controller

This isn't played with a keyboard and mouse. **Defend the Lab** turns your smartphone into a dedicated writing tablet.

1.  **Dual-Screen Setup:** The game runs on your desktop/kiosk screen.
2.  **QR Connection:** Scan the on-screen QR code to instantly connect your mobile device via local Wi-Fi.
3.  **Handwriting Recognition:** The game utilizes a **Python backend** equipped with AI (MobileNET) to recognize the numbers you draw on your phone screen in real-time.

---

## ⚙️ The Tech Stack

This project utilizes a "Thick-Server" architecture to handle game logic, real-time communication, and AI processing simultaneously.

### 🎮 Frontend & Game Engine
* **Phaser 3:** Powers the visual rendering, physics, and game loop on the main display.
* **WebTouch SDK:** Manages the low-latency communication between the desktop kiosk and the mobile controller.

### 🧠 Backend & AI
* **Node.js & Express:** Acts as the central Game Hub, managing client connections and game state.
* **Python Flask:** Runs a dedicated server for the OCR (Optical Character Recognition) logic.
* **MobileNET:** The AI model used to process and predict the handwritten digits from the mobile controller.

### 💾 Data Persistence
* **MongoDB Atlas:** Stores player data and powers the **Global Leaderboard**, allowing defenders to compete for the high score.

---

## 🚀 How It Works

To play the game (from the main repository), a dual-server setup is required:

1.  **The Game Hub:** A Node.js server running on port 3000 serves the game client.
2.  **The AI Brain:** A Python Flask server running on port 5000 processes the handwriting input.

Once both are active, the user scans the QR code, and the phone and computer sync up for the defense mission!

---

## 📥 Get the Game

Ready to test your binary conversion skills? Download the full source code and follow the installation guide in the main repository.

[**Download Source Code Here**](https://github.com/LeTanPhuc-01/computer-math)

---

*Project developed by Enrique Hernández (Enrikkk) & LeTanPhuc*