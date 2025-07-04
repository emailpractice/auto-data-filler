Here's a granular, testable, step-by-step MVP build plan using the architecture we defined (TypeScript + Node.js + Playwright + Electron), designed specifically for sequential task execution by an engineering LLM.

Each task:

Is small and atomic

Has a clear input/output

Can be run/tested in isolation

Moves us toward a working .exe that auto-fills a known webpage form

🛠️ MVP Build Plan (Granular Tasks)
📦 Project Setup
Task 1: Initialize project structure
Goal: Create project folder + minimal file layout

Create root folder: auto-form-filler/

Create subfolders: src/main, src/renderer, public, scripts
✅ Done when folders + empty index files are created

Task 2: Init package.json and install dependencies
Goal: Prepare package.json with basic dependencies

Run: npm init -y

Install:

npm install electron playwright react react-dom
npm install -D typescript @types/node @types/react @types/react-dom vite electron-builder
✅ Done when node_modules + package.json includes key dependencies

Task 3: Add tsconfig.json and base vite config
Goal: Enable TypeScript support

Create tsconfig.json for main and renderer

Add vite.config.ts for renderer build
✅ Done when TypeScript compiles both folders with tsc --noEmit

🖼️ UI: Renderer Process
Task 4: Set up minimal React app
Goal: Render “Hello World” in Electron window

Create public/index.html with <div id="root" />

Add src/renderer/index.tsx → Renders <App />
✅ Done when "Hello World" appears in Electron window

Task 5: Create App.tsx and basic layout
Goal: Add empty shells for three sections:

Upload data

Field mapping

Submit control
✅ Done when all three sections render as empty divs

Task 6: Implement file upload 

Expected format:

[[11511,112],[12,315]]


⚙️ Electron: Main Process
Task 9: Build minimal Electron main process
Goal: Create main.ts that opens window loading UI
✅ Done when npm start opens your React window

Task 10: Add preload.ts and bridge API
Goal: Use contextBridge to expose IPC methods like runFiller()
✅ Done when window.api.runFiller() is callable from renderer

Task 11: Set up IPC channel for form-filling request
Goal: Send data from UI → main process over IPC

Renderer: window.api.runFiller(data, mapping)

Main: ipcMain.handle(...) receives and logs params
✅ Done when data logs correctly in main process

🤖 Automation: Playwright
Task 12: Add simple formFiller.ts function
Goal: Given one {date, cost} and mapping, fill a known webpage

Hardcode URL (e.g., test form)

Use page.fill(...) and page.click(...)
✅ Done when script correctly fills & submits 1 form

Task 13: Loop through all rows
Goal: Support multiple rows

Add a for-loop in fillForms() to fill each row one by one
✅ Done when multiple rows are filled and submitted sequentially

🧪 Control + Status Feedback
Task 14: Connect renderer UI to Playwright trigger
Goal: Press "Run" button to launch form filling

Button triggers window.api.runFiller(...)
✅ Done when button triggers real browser automation

Task 15: Display logs in UI
Goal: Show progress like:

sql

Filling row 1/2...
Submitted ✔
Main process sends updates via ipcMain.emit(...)

Renderer listens via ipcRenderer.on(...)
✅ Done when logs appear in real-time during automation

📦 Packaging
Task 16: Configure electron-builder
Goal: Bundle everything into .exe

Add build section to package.json

Run: npx electron-builder
✅ Done when /dist/*.exe is created

✅ MVP Completion Criteria
✔ User can upload a .json file like:

json

[
  { "date": "2025.05.06", "cost": 500 },
  { "date": "2025.06.02", "cost": 600 }
]
✔ User can map fields like:

json

{
  "date": "#slotA",
  "cost": "#slotB",
  "submit": "#submit-btn"
}
✔ Pressing "Run" opens browser, fills and submits both forms
✔ User sees progress logs
✔ Whole app runs as a desktop .exe

