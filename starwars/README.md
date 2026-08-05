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
* **Smart Character Image Engine & Modes**:
  * **Default (Picsum Photos)**: Default image source is Picsum per the spec (`https://picsum.photos/seed/{id}/400/500`) generating unique, deterministic photos per character SWAPI ID; clicking "Refresh Pics" rotates the seed for fresh random photos.
  * **Visual Guide Mode (Toggle)**: Toggle to "Visual Guide" for character-accurate high-definition Star Wars portraits (`https://starwars-visualguide.com/assets/img/characters/{id}.jpg`) with Akabab fallbacks.
* **Detailed Character Dossier Modal**: Accessible modal displaying:
  * Height in meters (`1.72 m`)
  * Mass in kg (`77 kg`)
  * Created date formatted as **`dd-MM-yyyy`** (`09-12-2014`) using UTC date methods
  * Number of film appearances (`4 films`)
  * Birth year & gender
  * **Homeworld Intelligence**: Asynchronously fetches homeworld details showing **Name**, **Population** (with commas), **Terrain**, **Climate**, and **Residents**.
* **Loader & Error Handling**: Pulse skeleton loaders during network requests, plus error alerts with a **Retry** button.

### 🏆 Bonus Features ("Brownie Points")
* 🔍 **Search & Combined Multi-Filter Bar**: Real-time search and multi-select filtering for **Homeworld**, **Species**, and **Films**, pre-filtering across the entire dataset before calculating pagination.
* 🔐 **JWT Authentication & Silent Refresh**: Login/logout UI with prefilled demo credentials (`jedi_master` / `force2026`) and automatic 30s pre-expiration silent token renewal.
* 🧪 **Vitest Test Suite**: Comprehensive integration and unit tests (`CharacterModal.test.tsx`, `formatters.test.ts`) testing modal opening, `meters`, `kg`, UTC `dd-MM-yyyy` date formatting, and homeworld integration.

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
npm run test:run

# Run Vitest test runner in watch mode
npm run test

# Production build check
npm run build
```

---

## 📋 Assignment Compliance Checklist

| Requirement | Spec Requirement | Status | Implementation Details |
| :--- | :--- | :---: | :--- |
| **API Integration** | SWAPI `/people` endpoint with multi-tier fallback | ✅ | Primary `swapi.info`, fallbacks to `swapi.py4e.com` & `swapi.dev` |
| **Pagination** | Paging controls with Next, Prev, Page numbers | ✅ | Auto scroll-to-top, total count & page count indicators |
| **Loader & Error State** | Loading pulse & error retry UI | ✅ | `LoadingSkeleton.tsx` & `ErrorMessage.tsx` with Retry button |
| **Character Cards** | Card per character with Picsum photo integration | ✅ | Seeded Picsum photos (`https://picsum.photos/seed/{id}/400/500`) |
| **Species Color & Hover** | Color per species + hover animation | ✅ | Species neon color tokens + framer-motion/CSS 3D scale hover |
| **Character Modal** | Name, height (m), mass (kg), date (dd-MM-yyyy), films, birth year | ✅ | UTC formatted date, `formatHeight` in m, `formatMass` in kg |
| **Homeworld Intelligence** | Async homeworld name, terrain, climate, population | ✅ | Asynchronous `useHomeworld` hook with comma population formatting |
| **Search Filter** *(Brownie)* | Real-time name search & multi-select combined filtering | ✅ | Search + Homeworld + Species + Film evaluated across full dataset |
| **JWT Auth** *(Brownie)* | Login/logout UI & 30s pre-expiration silent refresh | ✅ | `AuthContext.tsx` with prefilled credentials (`jedi_master`/`force2026`) |
| **Integration Test** *(Brownie)*| Automated modal & formatting test suite | ✅ | Vitest + React Testing Library (`CharacterModal.test.tsx`, `formatters.test.ts`) |
