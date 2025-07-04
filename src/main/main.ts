// //項目	功能說明
// 建立視窗	建立 BrowserWindow，讓前端畫面出現
// 載入前端畫面	載入 React、HTML、Vite 頁面，例如 loadURL() 或 loadFile()
// 處理 IPC 請求	負責接收前端透過 ipcRenderer 發送的訊息，並進行處理回傳
// 控制應用生命週期	比如 app.whenReady()、app.quit()、macOS 獨有的 activate 邏輯
// tsconfig 編譯這些後端的部分，不會編譯react的前端部分
// viteconfig 負責編譯 react 的部分，把它變成靜態 html 檔案。 然後跟 electron 主程式搭配 ( 前後端搭配 )
// electron 只能透過 win.loadFile('dist/renderer/index.html') 載入一個靜態的 html + js 網站才能連上前端，
// 給後端.ts程式碼，後端是無法操作的

// main.js 好像是 electron 的啟動腳本。package.json的 script要填這個 

//打包階段	1.執行 vite build，把 React 編譯成純 JS + 靜態檔案	
// 2. loadFile('dist/index.html')	靜態資源，方便封裝和部署

import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.on('ready',() => {
const mainWindow = new BrowserWindow({
  width: 1280,
  height: 1000,
  webPreferences: {
    contextIsolation: true,
    nodeIntegration: false,
    preload: path.join(__dirname, 'preload.js'), 
  },
});
  mainWindow.loadURL('http://localhost:5173');
  // 正式版才是跑檔案 開發的時候跑url 可以即時更新畫面
  // mainWindow.loadFile(path.join(app.getAppPath()+'dist/renderer/index.html')) 
  //getAppPath,因為不知道使用者會把app放在下載還是哪個資料夾

});


ipcMain.handle('fill-formA', async (event, data:number[][]) => {
  console.log('main.ts 收到資料:', data);
    // 這裡你可以放 Playwright 邏輯，或其他處理
  });

