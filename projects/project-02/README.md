# 🍋 Lime World

**A Web-Based 2D RPG Adventure**

> **🚨 LOOKING FOR THE CODE?**
>
> This repository serves as the landing page. The full source code, assets, and playable versions (MVP & Full) are hosted in the main repository:
>
> ### [👉 Go to the Main Lime World Repository](https://github.com/Enrikkk/Lime_World_WebGame)

---

## 🌍 What is Lime World?

**Lime World** is a browser-based RPG where the world has been overrun by sentient, bouncing citrus fruits. Inspired by the iconic Slimes of *Dragon Quest*, these enemies are cute but deadly.

Your goal is to explore this vibrant world, battle the lime menace, and collect their drops to save humanity (or at least yourself).

### ⚔️ The Enemy: The Lime Monsters
These aren't your average grocery store limes. They are aggressive, territorial, and surprisingly bouncy.
* **The Drop:** Defeating them yields **Lime-Blobs**.
* **The Purpose:** These blobs contain miraculous curative properties. Collecting them is the ultimate goal to "cure" the world and complete the game.

### 💀 High-Stakes Gameplay
Lime World features a semi-permadeath system driven by its economy:
* **Lime Coins:** Found in the world or dropped by enemies. You need **1 Lime Coin** to pay for a respawn.
* **The Risk:** If you die with **0 Lime Coins** in your inventory, your save file is wiped. You lose everything. *Greed is dangerous.*

---

## 🤖 AI-Powered NPCs
The game features a unique **Sage** character whose wisdom is not hard-coded.
* **Google Gemini API:** We used Generative AI to create 100 unique phrases of wisdom for the Sage.
* **Dynamic Caching:** These phrases are stored in a **JsonBin** database. To simulate a "Time-To-Live" (TTL) cache, the Sage only refreshes his dialogue every few minutes, making him feel like a living, breathing entity rather than a static script.

---

## 💾 Save System & Sessions
Lime World is designed to be accessible anywhere.
* **Username Sessions:** There are no passwords. Just type your username to load your save. (Note: All sessions are public!).
* **Hybrid Saving:**
    * **Auto-Save:** Progress is saved automatically to your browser's **Local Storage**.
    * **Cloud Save:** You can push your save to the cloud (**JsonBin**) via the Pause Menu (ESC key) to move your session between devices.

---

## 📦 Game Versions
The main repository contains two distinct playable versions:

### 1. The MVP (Minimum Viable Product)
The proof of concept. Contains:
* The Tutorial Zone (WASD movement / Combat basics).
* The Village (NPC interaction).

### 2. The Full Version
The complete open-world experience.
* **Two New Zones:** The "Left" and "Right" wilderness areas.
* **Full Economy:** Farm coins to survive the harsher environments.
* **Complete Map:** No invisible walls—explore the entire Lime World.

---

## 🚀 How to Play
To play the game, you must download the source code from the main repository and run it using a local server (to handle asset loading and security policies).

1.  **Clone the Main Repo:** [https://github.com/Enrikkk/Lime_World_WebGame](https://github.com/Enrikkk/Lime_World_WebGame)
2.  **Install http-server:** `npm install --global http-server`
3.  **Run:** Open the terminal in the game folder and type `http-server`.
4.  **Play:** Open your browser to `http://127.0.0.1:8080`.

---

*Project developed by Enrique Hernández*