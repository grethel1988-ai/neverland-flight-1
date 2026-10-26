# agent.md — 永無島的初次飛翔（第一部・低年級）

## 上次做到哪（2026-10-25）
- 完成日系 RPG 風格遊戲式測驗網站（index.html / css/style.css / js/*.js / assets/img/*.webp）
- 題庫：bank_mc.js 150 題（由兩份 docx 轉出，含 3 篇閱讀測驗 10 題）＋ bank_drag.js 26 題拖拉題
- 生命值：小熊軟糖 25→5、40→7、50→10；HUD 顯示姓名、難度、得分/100、第幾題
- 作答不顯示正確答案與解析；題目/選項/短文用標楷體
- 證書顯示得分；按鈕「列印證書」「重新闖關」
- 截圖與設計規範：`D:\永無島三部曲\畫面設計參考\`（給第二、三部統一風格）
- 目前資源版本號：`?v=7`（改 CSS/JS 後要遞增）

## 下一步
- 實機（平板／手機）試玩，確認不出現捲軸
- 建 GitHub repo 並部署 GitHub Pages（尚未初始化 git）
- 第二部（中年級）需中年級題庫，沿用「畫面設計參考」

## 踩坑
- PowerShell 背景執行時 `python` 指向 WindowsApps 假捷徑 → 用 `C:\Users\User\AppData\Local\Python\bin\python.exe`
- `npm` 被執行原則擋 → 用 `npm.cmd`
- docx 閱讀測驗標題與短文同段落，轉檔需以「】」切開
- 瀏覽器快取舊 JS → 在 index.html 加 `?v=N`
- 重新執行轉檔腳本會覆蓋手動修改的 bank_mc.js
