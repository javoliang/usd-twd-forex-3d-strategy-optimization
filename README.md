# USD/TWD Quantitative Strategy Dashboard 📈

[English](#english) | [繁體中文](#繁體中文)

---

<div id="english"></div>

## 🇺🇸 Technical Dashboard & Quant Strategy Analysis

An institutional-grade web application designed for real-time tracking, technical analysis, and quantitative algorithmic momentum tracking for the United States Dollar to New Taiwan Dollar (USD/TWD) currency pair.

### ✨ Key Features

*   **Live Price Engine**: Real-time ticker data parsing with immediate percent-change metrics and responsive sparkline charts.
*   **TradingView Advanced Charting**: Fully integrated interactive charting component featuring multiple timeframes and institutional volume analysis tools (locked to `USD/TWD`).
*   **Sentiment Gauge**: A dynamically computed context score based on Relative Strength Index (RSI), Average Directional Index (ADX), and the 200 Simple Moving Average (SMA).
*   **Rebalance Calculator**: An interactive wallet manager that actively computes the exact monetary swaps needed to reach your target percentage allocation between USD and TWD.
*   **AI Quant Suggestion Engine**: A strictly mathematically derived momentum model. Utilizing historic backtests and robust Dual SMA crossovers, the dashboard algorithmically evaluates current market physics to suggest protecting capital via specific currency swaps (independent of target allocation).
*   **3D Robust Parameter Optimization**: A computationally heavy backend matrix that runs thousands of SMA grid combinations, visualized dynamically in an interactive 3D Surface Plot to identify stable architectural "plateaus".
*   **i18n Localization**: Fully responsive localization supporting English, Spanish (Español), and Traditional Chinese (繁體中文).

### 🛠️ Tech Stack

*   **Frontend**: Next.js 14, React, Tailwind CSS, Zustand (State Management), Recharts, Plotly.js, Lucide Icons.
*   **Backend**: FastAPI (Python), Pandas, NumPy, yfinance.

---

### 🚀 Local Deployment Guide

This project is decoupled. You must run both the Python backend and the Next.js frontend simultaneously.

**Prerequisites:**
*   Node.js (v18+)
*   Python (3.9+)
*   Git

#### 1. Clone the Repository
Open your terminal or command prompt and run:
```bash
git clone https://github.com/javoliang/usd-twd-forex-3d-strategy-optimization.git
cd usd-twd-forex-3d-strategy-optimization
```

#### 2. Start the FastAPI Backend
The backend serves the statistical payload and cache to the frontend.

**For Mac / Linux:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn api.main:app --reload --port 8000
```

**For Windows:**
```cmd
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn api.main:app --reload --port 8000
```
*The API will be live at `http://localhost:8000`*

#### 3. Start the Next.js Frontend
Open a **new terminal tab/window** and run:

**For all OS (Mac, Linux, Windows):**
```bash
cd frontend
npm install
npm run dev
```
*The Dashboard will be live at `http://localhost:3000`*

---
---

<div id="繁體中文"></div>

## 🇹🇼 USD/TWD 專業級量化策略與外匯分析儀表板

這是一個專為追蹤「美元/新台幣（USD/TWD）」貨幣對而設計的機構級網路應用程式，提供即時報價、專業技術分析以及基於演算法動能的量化策略分析。

### ✨ 核心功能

*   **即時報價引擎**：即時解析市場數據，快速顯示漲跌幅指標與響應式微型走勢圖。
*   **TradingView 進階圖表**：完全整合的互動式圖表組件，具備多種時間範圍和機構級成交量分析工具（專注於 `USD/TWD` 交易對）。
*   **市場情緒儀表板**：根據相對強弱指數 (RSI)、平均趨向指數 (ADX) 和 200 日簡單移動平均線 (SMA) 動態計算的技術指標分數。
*   **資產再平衡計算機**：互動式的錢包管理工具，能精確計算出為達到您目標的 USD 與 TWD 分配比例，所需要進行的具體貨幣兌換金額。
*   **AI 量化策略建議引擎**：一個嚴格基於數學推導的動能模型。透過歷史回測數據與強健的雙均線 (Dual SMA) 交叉策略，演算法會評估當前的市場動能，並建議具體的貨幣兌換方向以保護資本（獨立於用戶的目標資產配置）。
*   **3D 參數穩健性最佳化**：後端採用高算力矩陣，運算數千種均線參數組合，並透過互動式 3D 曲面圖動態呈現，協助尋找穩定的策略「高原區」。
*   **i18n 多國語言支援**：全面支援英文、西班牙文 (Español) 與繁體中文。

### 🛠️ 技術架構

*   **前端**：Next.js 14, React, Tailwind CSS, Zustand (狀態管理), Recharts, Plotly.js, Lucide Icons.
*   **後端**：FastAPI (Python), Pandas, NumPy, yfinance.

---

### 🚀 本地部署指南

此專案採用前後端分離架構。您必須同時運行 Python 後端和 Next.js 前端才能正常使用。

**系統需求：**
*   Node.js (v18+)
*   Python (3.9+)
*   Git

#### 1. 複製儲存庫 (Clone Repository)
開啟您的終端機 (Terminal) 或命令提示字元 (Command Prompt) 並執行：
```bash
git clone https://github.com/javoliang/usd-twd-forex-3d-strategy-optimization.git
cd usd-twd-forex-3d-strategy-optimization
```

#### 2. 啟動 FastAPI 後端
後端負責處理統計數據並提供 API 緩存給前端。

**Mac / Linux 系統：**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn api.main:app --reload --port 8000
```

**Windows 系統：**
```cmd
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn api.main:app --reload --port 8000
```
*API 服務將運行於 `http://localhost:8000`*

#### 3. 啟動 Next.js 前端
請開啟一個**新的終端機分頁/視窗**，並執行以下指令：

**所有作業系統 (Mac, Linux, Windows) 適用：**
```bash
cd frontend
npm install
npm run dev
```
*儀表板網站將運行於 `http://localhost:3000`*

---
> *Disclaimer: Not Financial Advice. This software is for informational and technical demonstration purposes only.*
