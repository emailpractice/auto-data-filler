// 大概是把後端的程式碼掛到瀏覽器的 window 物件，讓前端可以透過呼叫 window.fillform 來執行後端的東西
//**ipc.ts** 好像是 preload 更複雜之後才要加

// 應該要用cjs 就是common js 這樣才不會被vite編譯成一整個html。  
// @todo 但我已經把 preload 放在main 裡面了，應該不會被 vite 編譯到啊?  

// 變成 html 就變成前端的一部份了。 但它好像是要在 html 被後端載入之前，先行載入的額外文件( 總之跟前端不能混在一起 )
// 在 electron builder0json 

const { ipcRenderer, contextBridge } = require('electron');


// import { contextBridge, ipcRenderer } from 'electron';


// 建立一座橋叫 electronAPI
//把函式掛到 window.electronAPI 上
contextBridge.exposeInMainWorld('electronAPI', {   
    //當前端呼叫 fillForm(data)，就把資料傳到後端的 ipcMain.handle('fill-form')
  fillFormA: (data: [string,number][]) => ipcRenderer.invoke('fill-formA', data) 
  // 前面的fillform 是前端可以呼叫的函數名稱  後面的字串fill-form 是跟後端通訊用的 這裡寫啥 main.ts 就要.handle啥

// [[string,number]] 這樣的資料型別，會只允許陣列裡面有一項 tuple ，但我們會有很多組 string number

});
