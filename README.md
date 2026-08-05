# 🌌 Star Wars Galactic Directory & Character Cards

A production-grade, responsive Star Wars character exploration application built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **SWAPI (Star Wars API)**.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4.0-6E9F18?logo=vitest&logoColor=white)

---

## 📸 Application Screenshots & Visual Tour

| **Desktop Personnel Grid & Multi-Filter System** |
| :---: |
| ![Desktop Overview](starwars/public/docs/images/desktop-preview.png) |

| **Character Dossier Modal & Homeworld Intelligence** | **JWT Authentication & Silent Refresh Inspector** |
| :---: | :---: |
| ![Luke Dossier Modal](starwars/public/docs/images/character-modal.png) | ![JWT Auth Inspector](starwars/public/docs/images/jwt-auth-modal.png) |

---

## 🌟 Key Features

### 🔎 Core Requirements
* **SWAPI Integration & Endpoint Resilience**: Fetches character records from `/people` with multi-tier fallback architecture (`swapi.info` ➔ `swapi.py4e.com` ➔ `swapi.dev`).
* **Full Pagination System**: Next, Previous, direct page selection, and total record count indicators with automatic scroll-to-top on page change.
* **Species-Based Dynamic Themes**: Every character card features custom neon glow borders and badges tailored to their species (*Human*, *Droid*, *Wookiee*, *Rodian*, *Zabrak*, *Hutt*, *Yoda's species*, etc.) with 3D hover scale micro-animations.
* **Smart Character Image Engine & Modes**:
  * **Default (Official Character Portraits)**: High-definition character-accurate Star Wars portraits (`https://starwars-visualguide.com/assets/img/characters/{id}.jpg`) for optimal visual presentation.
  * **Picsum Photos Mode (Toggle)**: Toggle to "Picsum Photos" for the spec's random seeded stock photography mode (`https://picsum.photos/seed/{id}/400/500`); clicking "Refresh" rotates the seed for fresh random photos.
* **Detailed Character Dossier Modal**: Accessible modal window showing:
  * Character Name & Gender
  * Birth Year (`19BBY`)
  * Height in meters (`1.72 m`)
  * Mass in kg (`77 kg`)
  * Created date formatted as **`dd-MM-yyyy`** (`09-12-2014`) using UTC date methods
  * Number of film appearances (`4 films`)
  * **Homeworld Intelligence**: Asynchronous loading of planet details (**Name**, **Population** with localized comma formatting, **Terrain**, **Climate**, and **Residents** count).
* **Skeleton Loading & Error Resilience**: Pulse skeleton loaders during network operations, plus error cards with a **Re-establish Connection (Retry)** button.

### 🏆 Bonus Features ("Brownie Points")
* 🔍 **Multi-Criteria Search & Combined Filter System**:
  * Real-time search by character name.
  * Multi-select dropdown filters for **Homeworld**, **Species**, and **Films**.
  * Full dataset pre-filtering: combined search and filters are evaluated across all records before paginating, guaranteeing accurate `totalCount` and `totalPages`.
  * One-click filter reset button.
* 🔐 **JWT Authentication & Silent Refresh**:
  * Full login/logout modal with prefilled demo credentials (`jedi_master` / `force2026`).
  * Active JWT payload inspector with countdown timer.
  * **Silent Refresh Mechanism**: Background timer automatically renews the JWT token 30 seconds prior to expiration seamlessly.
* 🧪 **Automated Testing Suite**:
  * Comprehensive tests built with **Vitest**, **React Testing Library**, and **jsdom** covering character modals, formatters (`meters`, `kg`, UTC `dd-MM-yyyy`), and edge cases.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Core UI Component Library |
| **TypeScript** | Type Safety & Interfaces |
| **Vite** | Lightning-fast Build Tooling & Dev Server |
| **Tailwind CSS v4** | Utility-First Styling with Dark Mode Glassmorphism |
| **Lucide React** | Modern Icon System |
| **Vitest & React Testing Library** | Unit & Integration Testing |

---

## 📂 Project Structure

```text
starwars-cards/
├── starwars/                   # React Application Source Directory
│   ├── src/
│   │   ├── components/         # UI Components
│   │   │   ├── CharacterCard.tsx
│   │   │   ├── CharacterModal.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── LoadingSkeleton.tsx
│   │   │   ├── LoginModal.tsx
│   │   │   ├── Pagination.tsx
│   │   │   └── SearchAndFilter.tsx
│   │   ├── context/            # Global Auth Context & JWT Silent Refresh
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/              # Custom Data Fetching Hooks
│   │   │   ├── useHomeworld.ts
│   │   │   └── usePeople.ts
│   │   ├── services/           # SWAPI & Image Resolution Services
│   │   │   ├── characterImages.ts
│   │   │   └── swapi.ts
│   │   ├── tests/              # Vitest Integration Test Suite
│   │   │   └── CharacterModal.test.tsx
│   │   ├── types/              # TypeScript Type Definitions
│   │   │   └── starwars.ts
│   │   └── utils/              # Unit Formatters & Species Theme Helpers
│   │       ├── formatters.ts
│   │       └── speciesColors.ts
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sparshtub/tsx-mern-6aug2026.git
   cd starwars-cards/starwars
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## 🧪 Running Tests

To run the Vitest test suite once:
```bash
npm run test:run
```

To run Vitest in interactive watch mode:
```bash
npm run test
```

---

## 📦 Production Build

To build the application for production deployment:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
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

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

