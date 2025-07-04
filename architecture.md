🧱 Auto Form Filler – Full Architecture Guide
A desktop app (.exe檔案) where users upload structured data and map it to form slots. The app then uses Playwright to auto-fill online forms accordingly.

📁 Folder + File Structure

auto-form-filler/
├── package.json
├── tsconfig.json
├── electron-builder.json             # Build config for .exe
│
├── /public/                          # Static assets for UI
│   └── index.html                    # 內容只有 <div id = root> </div> 
                                        div裡面的內容會由 index.tsx 決定。它會判斷使用者在這個狀態時，應該渲染什麼畫面。 比如
                                            const data =ReactDOM.createRoot(document.getElementById('root')!)
                                             data.render(<App />)
                                      # 然後renderer 裡面就會有一個 App.tsx 內容是:
                                            const App = () => {
                                            return <h1>Hello World</h1>
                                            }
                                        這樣最後，畫面就會有 Hello World。  所以一個畫面，就由一個 tsx 負責管理。
                                        讓程式模組化。
                                        註解:雖然這是一個 .exe。 對使用者來說是個需要下載，可以離線打開的軟體。 但在開發端，它確實是一個看起來很像網頁的東西: 

                                        - 背景跑一個 Node.js 主程序（可以存檔、開啟檔案、跑 Playwright）
                                        - 視窗 UI 是 Chromium 瀏覽器
                                        - 顯示的畫面是一個本地的 HTML + JS + CSS 檔案（像網頁）
                                        - UI 和背景程式靠 IPC（訊息通道）溝通
                                        discord spotify notion 都是這樣開發的。
│
├── /src/
│   ├── main/                         # Electron Main Process
│   │   ├── main.ts                   # App entry, creates window & manages Playwright
│   │   ├── ipc.ts                    # IPC handlers (UI ↔︎ main process)
│   │   ├── services/
│   │   │   ├── formFiller.ts         # Main logic: uses Playwright to fill forms
│   │   │   └── stateManager.ts       # Read/write config & user data (JSON file or store)
│   │   └── preload.ts                # Secure bridge: exposes safe APIs to renderer
│
│   ├── renderer/                     # Frontend (Electron renderer)
│   │   ├── App.tsx                   # Main UI component
│   │   ├── components/               # UI Components
│   │   │   ├── DataTable.tsx         # Upload & show structured data
│   │   │   ├── FieldMapping.tsx      # Map fields (e.g. "date" → Slot A)  (這個介面是不需要的，因為我這軟體只能
                                        針對優先採購網工作，所以我會提前定義好甚麼資料要對應哪個格子，要按什麼按鈕之類的。)  
│   │   │   └── ControlPanel.tsx      # Start, stop, and status logs
│   │   ├── hooks/
│   │   │   └── useAppState.ts        # UI-side state (React Context)
│   │   ├── types/                    # Shared types for data/schema
│   │   └── index.tsx                 # React DOM entry
│
├── /scripts/
│   └── generateConfig.ts             # Optional CLI tool to generate config or debug
│
└── /build/                           # Output from `electron-builder`

⚙️ What Each Part Does
/main/ (Electron 主程序)
File	Responsibility
main.ts	Creates the Electron app, window, and registers global shortcuts
ipc.ts	Manages IPC channels between UI (renderer) and background logic
formFiller.ts	Calls Playwright to fill the form based on user input data
stateManager.ts	Reads/writes persistent user data (field mapping, config, input dataset)
preload.ts	Bridges safe APIs (like window.api.send(...)) to the frontend

/renderer/ (UI)
File/Folder	Responsibility
App.tsx	Root UI layout; displays all modules
components/	Modular UI: upload data, map fields, control buttons
useAppState.ts	Stores app state in React (what data is loaded, current step)
types/	Shared interface: FormDataRow, FieldMapping, etc.
index.tsx	Renders React to DOM (public/index.html)