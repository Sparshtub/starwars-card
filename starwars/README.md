# 🌌 Star Wars Galactic Directory & Character Cards

A production-grade, responsive Star Wars character exploration application built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **SWAPI (Star Wars API)**.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4.0-6E9F18?logo=vitest&logoColor=white)

---

## 🌟 Features Implemented

### 🔎 Core Requirements
* **SWAPI Integration & Endpoint Resilience**: Real-time fetching from `/people` with fallback architecture (`swapi.info` ➔ `swapi.py4e.com` ➔ `swapi.dev`).
* **Pagination System**: Previous, Next, direct page buttons, total record count, and auto scroll-to-top.
* **Species-Based Dynamic Themes**: Dynamic visual theme & badge for each species (*Human*, *Droid*, *Wookiee*, *Rodian*, *Zabrak*, *Hutt*, *Yoda's species*, etc.) with hover micro-animations.
* **Smart Character Image Engine & Fallback**:
  * **Primary**: Official Star Wars Visual Guide character portraits (`https://starwars-visualguide.com/assets/img/characters/{id}.jpg`).
  * **Alternate & Fallback**: Automatically falls back to Akabab Wookieepedia character portraits or Star Wars character image pools on error (`onError`).
* **Detailed Character Dossier Modal**: Accessible modal displaying:
  * Height in meters (`1.72 m`)
  * Mass in kg (`77 kg`)
  * Created date formatted as **`dd-MM-yyyy`** (`09-12-2014`)
  * Number of film appearances (`4 films`)
  * Birth year & gender
  * **Homeworld Intelligence**: Asynchronously fetches homeworld details showing **Name**, **Population** (with commas), **Terrain**, **Climate**, and **Residents**.
* **Loader & Error Handling**: Pulse skeleton loaders during network requests, plus error alerts with a **Retry** button.

### 🏆 Bonus Features ("Brownie Points")
* 🔍 **Search & Multi-Filter Bar**: Real-time search and multi-select filtering for **Homeworld**, **Species**, and **Films**.
* 🔐 **JWT Authentication & Silent Refresh**: Login/logout UI with prefilled demo credentials (`jedi_master` / `force2026`) and automatic 30s pre-expiration silent token renewal.
* 🧪 **Vitest Integration Tests**: Comprehensive test suite (`src/tests/CharacterModal.test.tsx`) testing modal opening, `meters`, `kg`, `dd-MM-yyyy` date formatting, and homeworld integration.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide Icons, Glassmorphism, Google Fonts
- **State Management**: React Context (`AuthContext`), Custom Hooks (`usePeople`, `useHomeworld`)
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library, jsdom

---

## 🚀 Commands

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Run Vitest tests once
npx vitest run

# Run Vitest test runner in watch mode
npm run test

# Production build check
npm run build
```
