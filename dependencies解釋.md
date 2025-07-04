套件	            用途
electron	        建立桌面程式（.exe 的核心）
playwright	        控制真實瀏覽器，自動填表
react + react-dom	建立使用者介面（UI）


npm install -D typescript @types/node @types/react @types/react-dom vite electron-builder
套件	            用途
typescript	        使用 .ts / .tsx 寫程式
@types/...	        型別提示（讓你寫 TypeScript 時不會噴錯）
vite	            打包 UI（React）為靜態檔案給 Electron 用
electron-builder	將專案打包成 .exe / .app

npm install --save-dev @vitejs/plugin-react   react 要跟 vite 配合好像還需要這個，也有載入
寫成 npm install -D 也是可以的。  save dev 就是某些套件只需要在開發的時候使用，我們自己安裝就好。
實際給使用者的時候，使用者不需要載那些套件 ( package.json會有不同的登記方式 )


package.json 裡面的 main 欄位是electron doc 裡面有寫到 會從那邊讀 electron 的主程式 main.js的位置


script 欄位則是指 npm run + 我輸入的key的名稱。  冒號後面則是輸入這個指令會做什麼
比如 npm run dev:electron 就會執行 electron 