// 大概是把後端的程式碼掛到瀏覽器的 window 物件，讓前端可以透過呼叫 window.fillform 來執行後端的東西
//**ipc.ts** 好像是 preload 更複雜之後才要加

// src/main/preload.ts
import { contextBridge, ipcRenderer } from 'electron';


// 建立一座橋叫 electronAPI
//把函式掛到 window.electronAPI 上
contextBridge.exposeInMainWorld('electronAPI', {   
    //當前端呼叫 fillForm(data)，就把資料傳到後端的 ipcMain.handle('fill-form')
  fillForm: (data: number[][]) => ipcRenderer.invoke('fill-form', data) 
});
