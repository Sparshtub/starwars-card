# Star Wars Character App (MERN + TypeScript Assignment)

A production-grade, highly responsive Star Wars character exploration application built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **SWAPI (Star Wars API)**.

---

## Features Implemented

### Core Assignment Requirements
- 🔎 **SWAPI Integration & Pagination**: Real-time fetching of characters from the `/people` endpoint with full pagination controls (Previous, Next, direct page buttons, total record indicator).
- 🎨 **Species-Based Dynamic Themes & Hover Micro-Animations**: Each character card is styled with a custom glow and badge according to their species (Human, Droid, Wookiee, Rodian, Zabrak, etc.) and features smooth 3D hover scaling effects.
- 🖼️ **Seeded Random Portraits**: Utilizes Picsum Photos with deterministic character seeds (`https://picsum.photos/seed/{id}-{name}/400/500`) for visual inspiration.
- 📜 **Character Details Modal**: Accessible dialog modal displaying:
  - Character Name header
  - Height in **meters** (`1.72 m`)
  - Mass in **kg** (`77 kg`)
  - Added date formatted in **`dd-MM-yyyy`** (`09-12-2014`)
  - Number of film appearances (`4 films`)
  - Birth Year (`19BBY`)
  - **Homeworld Intelligence**: Asynchronously fetches homeworld details showing **Name**, **Terrain**, **Climate**, and **Amount of Residents**.
- ⚠️ **Loader & Error Handling**: Pulse skeleton loaders during fetching/refetching data, plus error alerts with a **Re-establish Connection (Retry)** button.

### Optional "Brownie Points" Features
- 🔍 **Search & Filter System**:
  - Real-time character name search (partial or complete matching).
  - Multi-select dropdown filters for **Homeworld**, **Species**, and **Film**.
  - Combined search and filtration working seamlessly with pagination.
- 🔐 **JWT Authentication & Silent Refresh**:
  - Full JWT login/logout UI with prefilled demo credentials (`jedi_master` / `force2026`).
  - Active JWT token payload viewer and countdown timer.
  - **Silent Refresh Mechanism**: Background timer automatically renews the JWT token 30 seconds prior to expiration seamlessly without interrupting the user.
- 🧪 **Vitest Integration Test**:
  - Comprehensive integration test (`src/tests/CharacterModal.test.tsx`) verifying character details modal opening, height/mass formatting, `dd-MM-yyyy` date formatting, and homeworld data rendering.

---

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide Icons, Glassmorphism, Google Fonts (Orbitron + Inter)
- **State & Hooks**: React Context (`AuthContext`), Custom Hooks (`usePeople`, `useHomeworld`)
- **Build Tool**: Vite
- **Testing**: Vitest, React Testing Library, jsdom

---

## Getting Started

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```

### Running Tests
```bash
# Run Vitest test suite once
npm run test:run

# Run Vitest in watch mode
npm run test
```

### Production Build
```bash
npm run build
```

---

## Verification & Best Practices

- **Strict Type Safety**: Fully typed interfaces for Person, Planet, Species, Film, and AuthState.
- **Performance**: In-memory caching for SWAPI planet, species, and film lookups to eliminate waterfall requests.
- **Accessibility**: ARIA labels, keyboard focus management, ESC key modal dismissal.
