# CatchUp Frontend — React + TypeScript
Moderne, modulær og automatiseret webklient til CatchUp-projektet (Team 7, 4. semester Datamatiker 2025).

CatchUp frontend er den officielle webklient for platformen. Den er bygget til at levere en hurtig, responsiv og enkel brugeroplevelse — understøttet af en moderne teknologistak og et gennemarbejdet udviklingsflow.

Projektets fokusområder for frontenden:
- Moderne React-udvikling med TypeScript  
- Konsistent UI med Tailwind  
- Automatisering (ESLint, Prettier, Husky, Vitest, CodeRabbit)  
- En skalérbar, feature-baseret arkitektur

## Teknologistak

### Core
- React 18  
- TypeScript  
- Vite  

### Styling
- Tailwind CSS  

### Kvalitet & Automatisering
- ESLint  
- Prettier  
- Husky (pre-commit lint + test)  
- Vitest  
- CodeRabbit (AI-assisteret code review)

### Test & Mocking
- Vitest  
- MSW (mocked API responses)

## Projektstruktur

```bash
/src
├── app/ # Global layout, routing, providers
├── assets/ # Billeder, ikoner og statiske filer
├── components/ # Genanvendelige UI-komponenter
├── features/ # Funktionelle områder (feed, posts, profil mv.)
├── hooks/ # Custom hooks
├── lib/ # Utils, helpers, konstanter
├── services/ # API-lag (i øjeblikket mock med MSW)
├── styles/ # Tailwind + global CSS
└── tests/ # Vitest testfiler
```

## Installation og lokal udvikling

```bash
git clone https://github.com/4-sem-CatchUp/CatchUp.git

cd CatchUp/frontend

npm install

npm run dev
```

# Scripts
```bash
npm run dev       # Start udviklingsserver
npm run build     # Production build
npm run lint      # ESLint
npm run format    # Prettier format
npm run test      # Vitest test suite
```

# Automatisering og kvalitetssikring
### Pre-commit pipeline (Husky)

Hver commit kører automatisk:

- ESLint
- Prettier check
- Vitest

Commit afbrydes ved fejl.

### CodeRabbit

På pull requests leverer CodeRabbit:

- Automatiske code reviews
- Forslag til forbedringer
- Forslag til tests
- Oversigter og sekvensdiagrammer
- Gen-review på hvert nye commit i samme PR

### Enhedstestning

Vitest bruges til test af komponenter og logik. Fokus: få, præcise tests der fanger reelle fejl.

# Frontendens rolle i CatchUp-projektet

Frontenden håndterer:

- Feed og posts
- Kommentarflow
- Profilvisning
- UI-rammer til senere integration med Unity-hub
- Søgefunktioner (mocked for nu)
- Brugerinteraktioner og layout

Målet har været at skabe:

- Simpel og støjfri UI
- Let vægt på performance
- Et design der kan udvides med backend og gamification

# Udviklingsfokus (4. semester)
### Arkitektur

- Feature-baseret struktur
- Klar separation af concerns
- Forberedt på backendens ActivityPub-inspirerede API

### Styling & UI

- Tailwind setup
- Genbrugelige UI-komponenter
- Konsistent spacing og typografi

### Automatisering

- Ensartet formattering
- Linting og tidlig fejlfangst
- AI-assisteret code review
- Meningsfulde tests

### TypeScript

- Komplet TS-migrering
- Strengere typning i hooks, services og features
- Bedre udvikleroplevelse og færre runtime-fejl